require "rails_helper"

RSpec.describe UsersController, type: :request do
  let(:user_doctor) { create(:user_doctor) }

  describe "GET /perfil" do
    context "when the user is logged in as a doctor" do
      before { user_login(user_doctor) }

      it "returns ok status" do
        get "/perfil"
        expect(response).to have_http_status(:ok)
      end
    end
  end

  describe "PATCH /users" do
    let(:valid_params) { { cpf: CPF.generate, phone: "(61) 99999-9999", name: "new name" } }
    let(:invalid_params) { { phone: "(61) 33333-3333", name: "" } }

    before { user_login(user_doctor) }

    it "returns ok status with valid params" do
      patch "/perfil", params: valid_params
      expect(response).to redirect_to(profile_path)
      user_doctor.reload
      expect(user_doctor.name).to eq("new name")
    end

    it "returns unprocessable_entity status with invalid params" do
      patch "/perfil", params: invalid_params
      expect(user_doctor.name).not_to eq("")
    end
  end
end
