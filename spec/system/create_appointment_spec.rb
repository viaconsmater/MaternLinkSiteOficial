# require "system_helper"

# describe "Create an appointment", type: :system do
#   include ActiveJob::TestHelper

#   before do
#     # Create a clinic
#     user_doctor = create(:user_doctor, name: "Doutor", doctor: build(:doctor, price_cents: 10000))
#     clinic = create(:clinic, name: "Clínica")
#     create(:clinic_user, clinic: clinic, user: user_doctor)

#     # Setup doctor availability
#     create(
#       :doctor_availability,
#       doctor: user_doctor.doctor,
#       day_of_week: :monday,
#       start_time: "06:00",
#       end_time: "12:00",
#     )

#     # Stub ASAAS request
#     stub_request(:post, "#{Payments::DEFAULT_PAYMENT_URL}/v3/payments")
#       .to_return(status: 200,
#         body: {
#           "object": "transaction",
#           "id": "654321",
#           "status": "PENDING",
#         }.to_json,
#         headers: {})

#     stub_request(:get, "#{Payments::DEFAULT_PAYMENT_URL}/v3/payments/654321/pixQrCode")
#       .to_return(status: 200,
#         body: {
#           "success": true,
#           "encodedImage": "XXXX",
#           "payload": "pix",
#         }.to_json,
#         headers: {})
#   end

#   let(:user_patient) { create(:user_patient, name: "Paciente", external_payment_id: "token-asaas") }

#   it "creates an appointment" do
#     login_user(user_patient)

#     visit "/profissionais#resultado-pesquisa"

#     sleep(1) # Wait async load for professionals
#     find("div.bg-secondary-25 > p", text: "06:00").click

#     click_button "continuar"

#     find("p", text: "Pix").click

#     click_button "Concluir pagamento"

#     # Expect to see Escaneie o QR Code ou copie o código PIX
#     expect(page).to have_content("Escaneie o QR Code ou copie o código PIX")

#     simulate_pay_pix

#     expect(Appointment.last.payment_status).to eq("processing")
#   end

#   def simulate_pay_pix
#     allow(ENV).to receive(:fetch).and_call_original
#     allow(ENV).to receive(:fetch).with("PAYMENT_API_AUTH_TOKEN", nil).and_return("token-de-seguranca")
#     post "/webhooks/transactions",
#       params: {
#         event: "PAYMENT_CONFIRMED",
#         payment: {
#           id: "654321",
#         },
#       }.to_json,
#       headers: { "asaas-access-token": "token-de-seguranca", "Content-Type": "application/json" }

#     perform_enqueued_jobs(only: Webhooks::ExternalPaymentJob)
#   end
# end
