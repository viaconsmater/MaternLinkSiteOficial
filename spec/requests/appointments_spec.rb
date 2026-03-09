require "rails_helper"

RSpec.describe "AppointmentsController", type: :request do
  describe "POST /consultas/pix" do
    let(:patient_user) { create(:user_patient) }
    let(:doctor) { create(:doctor) }
    let(:clinic) { create(:clinic) }
    let(:valid_params) do
      {
        date: 5.hours.from_now,
        doctor_user_id: doctor.user.id,
        clinic_id: clinic.id,
        price_cents: 10000,
        aditional_info: "Some additional information",
      }
    end

    before do
      user_login(patient_user)
      create(
        :doctor_availability,
        day_of_week: Time.zone.now.wday - 1 >= 0 ? Time.zone.now.wday - 1 : 6,
        doctor: doctor,
      )
      stub_request(:post, "https://sandbox.asaas.com/api/v3/customers")
        .to_return(status: 200,
          body: {
            "object": "customer",
            "id": "123456",
          }.to_json,
          headers: {})

      stub_request(:post, "#{Payments::DEFAULT_PAYMENT_URL}/v3/payments")
        .to_return(status: 200,
          body: {
            "object": "transaction",
            "id": "654321",
            "status": "PENDING",
          }.to_json,
          headers: {})

      stub_request(:get, "#{Payments::DEFAULT_PAYMENT_URL}/v3/payments/654321/pixQrCode")
        .to_return(status: 200,
          body: {
            "success": true,
            "encodedImage": "XXXX",
            "payload": "pix",
          }.to_json,
          headers: {})
    end

    context "with valid params" do
      it "creates a new appointment" do
        expect { post "/consultas/pix", params: valid_params }.to change(Appointment, :count).by(1)
      end
    end

    context "when the day has no availability" do
      let(:wrong_day_params) do
        {
          date: "2024-06-26T11:00:00.843Z",
          doctor_user_id: doctor.user.id,
          clinic_id: clinic.id,
          price_cents: 10000,
          aditional_info: "Some additional information",
        }
      end

      it "does not create a new appointment" do
        expect { post "/consultas/pix", params: wrong_day_params }.not_to change(Appointment, :count)
      end
    end

    context "when there's already an appointment in the same date" do
      before { create(:appointment, date: 5.hours.from_now, doctor: doctor) }

      it "does not create a new appointment" do
        expect { post "/consultas/pix", params: valid_params }.not_to change(Appointment, :count)
      end
    end
  end

  describe "POST /consultas/credit_card" do
    let(:patient_user) { create(:user_patient) }
    let(:doctor) { create(:doctor) }
    let(:clinic) { create(:clinic) }
    let(:credit_card) { create(:credit_card, user: patient_user) }
    let(:saved_card_params) do
      {
        date: 5.hours.from_now,
        doctor_user_id: doctor.user.id,
        clinic_id: clinic.id,
        price_cents: 10000,
        aditional_info: "Some additional information",
        payment_info: {
          cardId: credit_card.id,
        },
      }
    end

    let(:new_card_params) do
      {
        date: 5.hours.from_now,
        doctor_user_id: doctor.user.id,
        clinic_id: clinic.id,
        price_cents: 10000,
        aditional_info: "Some additional information",
        payment_info: {
          creditCard: {
            holderName: patient_user.name,
            number: "4444 4444 4444 4444",
            expiryMonth: "12",
            expiryYear: "2030",
            ccv: "123",
          },
          creditCardHolderInfo: {
            name: patient_user.name,
            email: patient_user.email,
            cpfCnpj: patient_user.cpf,
            postalCode: patient_user.address.cep,
            addressNumber: patient_user.address.number && "0",
            phone: patient_user.phone,
          },
        },
      }
    end

    before do
      user_login(patient_user)
      create(
        :doctor_availability,
        day_of_week: Time.zone.now.wday - 1 >= 0 ? Time.zone.now.wday - 1 : 6,
        doctor: doctor,
      )
      stub_request(:post, "https://sandbox.asaas.com/api/v3/customers")
        .to_return(status: 200,
          body: {
            "object": "customer",
            "id": "123456",
          }.to_json,
          headers: {})

      stub_request(:post, "#{Payments::DEFAULT_PAYMENT_URL}/v3/payments")
        .to_return(status: 200,
          body: {
            "object": "transaction",
            "id": "654321",
            "status": "PENDING",
          }.to_json,
          headers: {})

      stub_request(:post, "#{Payments::DEFAULT_PAYMENT_URL}/v3/payments/654321/payWithCreditCard")
        .to_return(status: 200,
          body: {
            "object": "transaction",
            "id": "654321",
            "status": "CONFIRMED",
          }.to_json,
          headers: {})

      stub_request(:post, "#{Payments::DEFAULT_PAYMENT_URL}/v3/creditCard/tokenize")
        .to_return(status: 200,
          body: {
            "creditCardNumber": "4444",
            "creditCardBrand": "VISA",
            "creditCardToken": "token",
          }.to_json,
          headers: {})
    end

    context "with saved card" do
      it "creates a new appointment" do
        expect { post "/consultas/credit_card", params: saved_card_params }.to change(Appointment, :count).by(1)
      end
    end

    context "with new card" do
      it "creates a new appointment" do
        expect { post "/consultas/credit_card", params: new_card_params }.to change(Appointment, :count).by(1)
      end
    end

    context "when the day has no availability" do
      let(:wrong_day_params) do
        {
          date: "2024-06-26T11:00:00.843Z",
          doctor_user_id: doctor.user.id,
          clinic_id: clinic.id,
          price_cents: 10000,
          aditional_info: "Some additional information",
        }
      end

      it "does not create a new appointment" do
        expect { post "/consultas/credit_card", params: wrong_day_params }.not_to change(Appointment, :count)
      end
    end

    context "when there's already an appointment in the same date" do
      before { create(:appointment, date: 5.hours.from_now, doctor: doctor) }

      it "does not create a new appointment" do
        expect { post "/consultas/credit_card", params: saved_card_params }.not_to change(Appointment, :count)
      end
    end
  end
end
