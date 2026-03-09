require "rails_helper"

RSpec.describe ClinicsController, type: :request do
  let(:work_specialty) { create(:work_specialty) }
  let(:clinic) { create(:clinic) }
  let(:manager_user) { create(:user_manager, :owns_clinic) }
  let(:new_doctor_params) do
    {
      name: "Jorge",
      email: "teste@teste.com",
      password: "123456",
      phone: "99999999",
      role: "doctor",
      cpf: "99428027030",
      gender: "male",
      birthdate: Time.zone.today,
      address_attributes: {
        cep: "1234567",
        city: "Teste",
        state: "Teste",
        neighborhood: "teste",
        street: "teste",
      },
      doctor_attributes: {
        council: "String", work_area_id: work_specialty.work_area.id,
        work_specialty_id: work_specialty.id,
      },
      clinic_ids: [clinic.id],
    }
  end

  before { user_login(manager_user) }

  describe "GET /clinica/new_doctor" do
    it "returns ok status" do
      get "/clinica/new_doctor"
      expect(response).to have_http_status(:ok)
    end
  end

  describe "POST /clinica/new_doctor" do
    context "when the params are valid" do
      it "returns created status" do
        post "/clinica/new_doctor", params: new_doctor_params
        expect(response).to have_http_status(:created)
      end

      it "creates a new user" do
        expect do
          post "/clinica/new_doctor", params: new_doctor_params
        end.to change(User, :count).by(1)
      end
    end

    context "when some required params are absent" do
      it "returns unprocessable entity" do
        post "/clinica/new_doctor", params: new_doctor_params.except(:name, :email)
        expect(response).to have_http_status(:unprocessable_entity)
      end

      it "does not create a new user" do
        expect do
          post "/clinica/new_doctor", params: new_doctor_params.except(:name, :email)
        end.not_to change(User, :count)
      end
    end

    context "when the email already is in use" do
      before do
        create(:user, email: "teste@teste.com")
      end

      it "returns unprocessable entity" do
        post "/clinica/new_doctor", params: new_doctor_params
        expect(response).to have_http_status(:unprocessable_entity)
      end

      it "does not create a new user" do
        expect do
          post "/clinica/new_doctor", params: new_doctor_params
        end.not_to change(User, :count)
      end
    end
  end
end
