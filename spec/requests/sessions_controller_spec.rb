require "rails_helper"

RSpec.describe SessionsController, type: :request do
  describe "GET /login" do
    it "returns ok status" do
      get "/login"
      expect(response).to have_http_status(:ok)
    end
  end

  describe "POST /login" do
    context "with valid credentials" do
      it "returns created status" do
        user = create(:user_doctor)
        post "/login",
          params: { email: user.email, password: user.password }
        expect(response).to redirect_to(appointments_path)
      end
    end

    context "with invalid credentials" do
      it "returns unauthorized status" do
        user = create(:user)
        post "/login",
          params: { user: { email: user.email, password: "" } }
        expect(response).to redirect_to(login_path)
      end
    end

    context "with disabled user" do
      it "returns unauthorized status" do
        user = create(:user, enabled: false)
        post "/login",
          params: { user: { email: user.email, password: "" } }
        expect(response).to redirect_to(login_path)
      end
    end
  end
end
