require "rails_helper"

RSpec.describe "DoctorAvailabilities", type: :request do
  describe "POST /doctor_availabilities" do
    let(:user_doctor) { create(:user_doctor) }
    let(:valid_params) do
      {
        availability: {
          "0" => [
            { startTime: "09:00", endTime: "10:00" },
          ],
        },
        user_id: user_doctor.id,
      }
    end

    before { user_login(user_doctor) }

    it "creates doctor availabilities with valid params" do
      expect { post "/doctor_availabilities", params: valid_params }.to change(DoctorAvailability, :count).by(1)
    end

    it "doesn't create doctor availabilities" do
      expect do
        post "/doctor_availabilities", params: { availabilitie: {} }
      end.not_to change(DoctorAvailability, :count)
    end
  end
end
