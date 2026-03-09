require "rails_helper"

RSpec.describe ClinicTransferPaymentJob, type: :job do
  describe "#perform" do
    include ActiveJob::TestHelper
    include ActiveSupport::Testing::TimeHelpers

    let(:doctor) { create(:doctor, price_cents: 10000, doctor_availabilities: [build(:doctor_availability)]) }

    context "when user paid the consult and clinic does not receive" do
      before do
        stub_request(:post, "#{Payments::DEFAULT_PAYMENT_URL}/v3/transfers")
          .to_return(status: 200,
            body: {
              "object": "customer",
              "id": "123456",
            }.to_json,
            headers: {})
      end

      it "transfers the payment to the clinic with the right value" do
        appointment = create(
          :appointment,
          price_cents: doctor.price_cents,
          doctor: doctor,
          date: 3.hours.from_now,
          payment_status: :processing,
          transfer_status: :waiting,
        )
        described_class.perform_now(appointment.id)

        appointment.reload

        expect(appointment.transfer_status).to eq("success")
        expect(appointment.payment_status).to eq("paid")
        expect(appointment.transfer_value_cents).to eq(9000) # Valor da consulta - taxa da clínica (10%)
      end
    end

    context "when user paid the consult and clinic already received" do
      it "raises an error" do
        appointment = create(
          :appointment,
          doctor: doctor,
          date: 3.hours.from_now,
          status: :completed,
          payment_status: :paid,
          transfer_status: :success,
        )
        expect { described_class.perform_now(appointment.id) }.to raise_error("Appoint already transferred to clinic")
      end
    end
  end
end
