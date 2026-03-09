require "rails_helper"

RSpec.describe "WebhookPayments", type: :request do
  let(:confirmed_parameters) { { "event" => "PAYMENT_CONFIRMED", "payment" => { "id" => "123456" } }.to_json }
  let(:cancelled_parameters) { { "event" => "PAYMENT_OVERDUE", "payment" => { "id" => "123456" } }.to_json }
  let(:invalid_parameters) { { "event" => "PAYMENT_CREATED", "payment" => { "id" => "123456" } }.to_json }
  let(:token) { "123456" }
  let(:default_headers) do
    { "asaas-access-token" => token, "Content-Type" => "application/json", "Accept" => "application/json" }
  end

  before do
    allow(ENV).to receive(:fetch).and_call_original
    allow(ENV).to receive(:fetch).with("PAYMENT_API_AUTH_TOKEN", nil).and_return(token)
  end

  describe "POST /webhooks/transactions" do
    let(:doctor) { create(:doctor) }
    let(:clinic) { create(:clinic, users: [doctor.user]) }

    before { create(:doctor_availability, doctor: doctor) }

    context "when the payment works properly" do
      it "changes the payment payment_status to processing" do
        appointment = create(:appointment, external_payment_id: "123456", clinic: clinic, doctor: doctor)
        expect do
          post "/webhooks/transactions", params: confirmed_parameters, headers: default_headers
        end.to change(InboundWebhook, :count).by(1)
        expect(response).to have_http_status(:ok)
        perform_enqueued_jobs
        appointment.reload
        expect(appointment.payment_status).to eq("processing")
      end
    end

    context "when cancelled event is correctly sent" do
      it "changes the payment payment_status to CANCELLED" do
        appointment = create(:appointment, external_payment_id: "123456", clinic: clinic, doctor: doctor)
        expect do
          post "/webhooks/transactions", params: cancelled_parameters, headers: default_headers
        end.to change(InboundWebhook, :count).by(1)
        expect(response).to have_http_status(:ok)
        perform_enqueued_jobs
        appointment.reload
        expect(appointment.status).to eq("cancelled")
      end
    end

    context "when a different event is sent" do
      it "does not change the payment payment_status" do
        appointment = create(
          :appointment,
          external_payment_id: "123456",
          clinic: clinic,
          doctor: doctor,
          status: :scheduled,
        )
        post "/webhooks/transactions", params: invalid_parameters, headers: default_headers
        appointment.reload
        expect(appointment.status).to eq("scheduled")
        expect(response).to have_http_status(:ok)
      end
    end

    context "when the appointment is not found" do
      it "creates a InboundWebhook" do
        expect do
          post "/webhooks/transactions", params: confirmed_parameters, headers: default_headers
        end.to change(InboundWebhook, :count).by(1)
        expect(response).to have_http_status(:ok)
      end
    end

    context "when the autheticity token is not sent" do
      it "returns unauthorized" do
        post "/webhooks/transactions", params: confirmed_parameters
        expect(response).to have_http_status(:unauthorized)
      end
    end
  end
end
