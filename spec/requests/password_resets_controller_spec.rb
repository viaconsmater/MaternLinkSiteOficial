require "rails_helper"

RSpec.describe PasswordResetsController, type: :request do
  let(:user) { create(:user, password: "123456") }

  describe "GET /reset_password/step_one" do
    context "with valid credentials" do
      it "returns ok status" do
        get "/reset_password/step_one"
        expect(response).to have_http_status(:ok)
      end
    end
  end

  describe "POST /reset_password" do
    context "with valid email" do
      it "redirects to step_two" do
        post "/reset_password", params: { email: user.email }
        expect(response.header["Location"]).to include(reset_password_step_two_path)
      end
    end

    context "with invalid email" do
      it "redirects to step_one" do
        post "/reset_password", params: { email: "" }
        expect(response).to redirect_to(reset_password_step_one_path)
      end
    end
  end

  describe "GET /reset_password/step_two" do
    context "with sid query param" do
      it "returns ok status" do
        get "/reset_password/step_two?sid="
        expect(response).to have_http_status(:ok)
      end
    end

    context "without sid query param" do
      it "redirects back to step one" do
        get "/reset_password/step_two"
        expect(response).to redirect_to(reset_password_step_one_path)
      end
    end
  end

  describe "POST /reset_password/check_code" do
    let(:token) { user.password_reset_tokens.create!(code: rand(100_000..999_999)) }
    let(:sid) { token.signed_id(expires_in: 20.minutes) }
    let(:code) { token.code }

    context "with valid sid and valid code" do
      it "redirects to step_three" do
        post "/reset_password/check_code", params: { sid: sid, code: code }
        expect(response.header["Location"]).to include(reset_password_step_three_path)
      end
    end

    context "with valid sid and invalid code" do
      it "redirects back to step_two" do
        post "/reset_password/check_code", params: { sid: sid, code: "" }
        expect(response.header["Location"]).to include(reset_password_step_two_path)
      end
    end

    context "with invalid sid and invalid code" do
      it "redirects back to step_two" do
        post "/reset_password/check_code", params: { sid: "", code: "" }
        expect(response.header["Location"]).to include(reset_password_step_two_path)
      end
    end
  end

  describe "GET /reset_password/step_three" do
    context "with sid and code query param" do
      it "returns ok status" do
        get "/reset_password/step_three?code=&sid="
        expect(response).to have_http_status(:ok)
      end
    end

    context "without sid and code query param" do
      it "redirects back to step two" do
        get "/reset_password/step_three"
        expect(response).to redirect_to(reset_password_step_two_path)
      end
    end
  end

  describe "PATCH /reset_password" do
    let(:token) { user.password_reset_tokens.create!(code: rand(100_000..999_999)) }
    let(:sid) { token.signed_id(expires_in: 20.minutes) }
    let(:code) { token.code }

    context "with valid password" do
      it "redirects to step_four" do
        patch "/reset_password", params: { sid: sid, code: code, password: "12345678" }
        expect(response).to redirect_to(reset_password_step_four_path)
      end

      it "changes the users password" do
        patch "/reset_password", params: { sid: sid, code: code, password: "12345678" }
        user.reload
        expect(user.authenticate("12345678")).to eq(user)
      end
    end

    context "with invalid password" do
      it "does not change the users password" do
        patch "/reset_password", params: { sid: sid, code: code, password: "1" }
        user.reload
        expect(user.authenticate("1")).not_to eq(user)
      end
    end

    context "with valid sid and invalid code" do
      it "redirects back to step_two" do
        patch "/reset_password", params: { sid: sid, code: "", password: "12345678" }
        expect(response.header["Location"]).to include(reset_password_step_two_path)
      end
    end

    context "with invalid sid and invalid code" do
      it "redirects back to step_three" do
        patch "/reset_password", params: { sid: "", code: "", password: "12345678" }
        expect(response.header["Location"]).to include(reset_password_step_three_path)
      end
    end
  end

  describe "GET /reset_password/step_four" do
    context "with valid credentials" do
      it "returns ok status" do
        get "/reset_password/step_four"
        expect(response).to have_http_status(:ok)
      end
    end
  end
end
