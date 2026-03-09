require "rails_helper"

RSpec.describe "ContactingUsers", type: :request do
  describe "POST #create" do
    context "with valid parameters" do
      let(:valid_params) { { name: "John Doe", email: "john@example.com", phone: "(61) 99999-9999" } }

      it "creates a new contacting user" do
        expect do
          post "/contacting_users", params: valid_params
        end.to change(ContactingUser, :count).by(1)
      end

      it "returns status code 201 (created)" do
        post "/contacting_users", params: valid_params
        expect(response).to have_http_status(:created)
      end
    end
  end
end
