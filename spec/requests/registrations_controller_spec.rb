require "rails_helper"

RSpec.describe RegistrationsController, type: :request do
  let(:work_specialty) { create(:work_specialty) }
  let(:user_params) do
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
      clinics_attributes: {
        name: "String", cnpj: CNPJ.generate,
        description: "String",
      },
    }
  end

  describe "GET /sign_up" do
    it "returns ok status" do
      get "/sign_up"
      expect(response).to have_http_status(:ok)
    end
  end

  describe "POST /sign_up" do
    context "when the params are valid" do
      it "returns created status" do
        post "/sign_up", params: user_params
        expect(response.cookies.keys).to eq(["session_token", "_viaconsultas_session"])
        expect(response).to have_http_status(:created)
      end

      it "creates a new user" do
        expect do
          post "/sign_up", params: user_params
        end.to change(User, :count).by(1)
      end
    end

    context "when some required params are absent" do
      it "returns unprocessable entity" do
        post "/sign_up", params: user_params.except(:name, :email)
        expect(response).to have_http_status(:unprocessable_entity)
      end

      it "does not create a new user" do
        expect do
          post "/sign_up", params: user_params.except(:name, :email)
        end.not_to change(User, :count)
      end
    end

    context "when the email already is in use" do
      before do
        create(:user, email: "teste@teste.com")
      end

      it "returns unprocessable entity" do
        post "/sign_up", params: user_params
        expect(response).to have_http_status(:unprocessable_entity)
      end

      it "does not create a new user" do
        expect do
          post "/sign_up", params: user_params
        end.not_to change(User, :count)
      end
    end

    context "when the doctor attributes are sent" do
      it "creates a doctor model" do
        expect do
          post "/sign_up",
            params: user_params.merge(doctor_attributes: {
              council: "String", work_area_id: work_specialty.work_area.id,
              work_specialty_id: work_specialty.id,
            })
        end.to change(Doctor, :count).by(1)
      end
    end

    context "when the clinic attributes are sent" do
      let(:manager_params) do
        {
          name: "Jorge",
          email: "teste@teste.com",
          password: "123456",
          phone: "99999999",
          role: "manager",
          cpf: CPF.generate,
          gender: "male",
          birthdate: Time.zone.today,
          address_attributes: {
            cep: "1234567",
            city: "Teste",
            state: "Teste",
            neighborhood: "teste",
            street: "teste",
          },
        }
      end

      it "creates a clinic model" do
        expect do
          post "/sign_up",
            params: manager_params.merge(clinics_attributes: {
              name: "String", cnpj: CNPJ.generate,
              description: "String",
            })
        end.to change(Clinic, :count).by(1)

        expect(User.last.role).to eq("manager")
      end
    end
  end
end
