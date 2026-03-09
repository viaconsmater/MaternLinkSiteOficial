# require "rails_helper"

RSpec.describe Payments do
  describe ".create_client" do
    let(:user) { create(:user, cpf: CPF.generate) }

    before do
      stub_request(:post, "https://sandbox.asaas.com/api/v3/customers")
        .to_return(status: 200,
          body: {
            "object": "customer",
            "id": "123456",
          }.to_json,
          headers: {})
    end

    context "when the payment API does not return success" do
      it "raises an error" do
        stub_request(:post, "https://sandbox.asaas.com/api/v3/customers")
          .to_return(status: 404,
            body: {
              "object": "customer",
              "id": "123456",
            }.to_json,
            headers: {})
        expect { described_class.create_client!(user) }.to raise_error(StandardError)
      end
    end

    context "when user has no cpf" do
      let(:user) { create(:user, cpf: nil) }

      it "raises an error" do
        expect { described_class.create_client!(user) }.to raise_error(StandardError)
      end
    end
  end

  describe ".create_pix_transaction" do
    let(:user) { create(:user, cpf: CPF.generate) }

    before do
      stub_request(:post, "#{Payments::DEFAULT_PAYMENT_URL}/v3/customers")
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

    context "when the user does not have an external_payment_id" do
      it "creates one for it" do
        described_class.create_pix_transaction!(user, 5000)
        expect(user.external_payment_id).to eq("123456")
      end
    end

    context "when the user does already have an external payment id" do
      it "does not create one for it" do
        user.update!(external_payment_id: "1111111")
        user.reload
        expect do
          described_class.create_pix_transaction!(user, 5000)
        end.not_to change(user, :external_payment_id)
      end
    end

    context "when the payment API does not return success" do
      it "raises an error" do
        stub_request(:post, "#{Payments::DEFAULT_PAYMENT_URL}/v3/payments")
          .to_return(status: 404,
            body: {
              "errors": [{ descrition: "Error" }],
            }.to_json,
            headers: {})
        expect { described_class.create_pix_transaction!(user, 5000) }.to raise_error(StandardError)
      end
    end
  end

  describe ".create_credit_card_transaction" do
    let(:user) { create(:user, cpf: CPF.generate) }
    let(:credit_card_info) do
      {
        holderName: "Josef",
        number: "1234123412341234",
        expiryMonth: "05",
        expiryYear: "2025",
        ccv: "123",
      }
    end

    before do
      stub_request(:post, "#{Payments::DEFAULT_PAYMENT_URL}/v3/customers")
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

    context "when the user does not have an external_payment_id" do
      it "creates one for it" do
        described_class.create_credit_card_transaction!(user, 5000)
        expect(user.external_payment_id).to eq("123456")
      end
    end

    context "when the user does already have an external payment id" do
      it "does not create one for it" do
        user.update!(external_payment_id: "1111111")
        user.reload
        expect do
          described_class.create_credit_card_transaction!(user, 5000)
        end.not_to change(user, :external_payment_id)
      end
    end

    context "when the payment API does not return success" do
      it "raises an error" do
        stub_request(:post, "#{Payments::DEFAULT_PAYMENT_URL}/v3/payments")
          .to_return(status: 404,
            body: {
              "errors": [{ descrition: "Error" }],
            }.to_json,
            headers: {})
        expect do
          described_class.create_credit_card_transaction!(user, 5000)
        end.to raise_error(StandardError)
      end
    end
  end

  describe ".pay_clinic" do
    let(:clinic) { create(:clinic) }
    let(:doctor) { create(:user_doctor) }

    before { create(:doctor_availability, doctor: doctor.doctor) }

    context "when the transfer works well" do
      before do
        stub_request(:post, "#{Payments::DEFAULT_PAYMENT_URL}/v3/transfers")
          .to_return(status: 200,
            body: {
              "object": "customer",
              "id": "123456",
            }.to_json,
            headers: {})
      end

      it "changes payment status to paid and transfer status to success" do
        appointment = create(:appointment, doctor: doctor.doctor, clinic: clinic)
        described_class.pay_clinic(appointment)
        appointment.reload
        expect(appointment.transfer_status).to eq("success")
        expect(appointment.payment_status).to eq("paid")
      end
    end

    context "when the transfer fails" do
      before do
        stub_request(:post, "#{Payments::DEFAULT_PAYMENT_URL}/v3/transfers")
          .to_return(status: 422,
            body: {
              "object": "customer",
              "id": "123456",
            }.to_json,
            headers: {})
      end

      it "keeps payment status as processing and transfer status to failure" do
        appointment = create(:appointment, doctor: doctor.doctor, clinic: clinic, payment_status: :processing)
        expect do
          described_class.pay_clinic(appointment)
        end.to raise_error(StandardError)
        appointment.reload
        expect(appointment.transfer_status).to eq("failure")
        expect(appointment.payment_status).to eq("processing")
      end
    end
  end
end
