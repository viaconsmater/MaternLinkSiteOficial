require "rails_helper"

RSpec.describe ClinicUser, type: :model do
  describe "validations" do
    it "is valid with valid attributes" do
      clinic_user = build(:clinic_user)
      expect(clinic_user).to be_valid
    end

    it "is invalid without an user" do
      clinic_user = build(:clinic_user, user: nil)
      expect(clinic_user).to be_invalid
    end

    it "is invalid without a clinic" do
      clinic_user = build(:clinic_user, clinic: nil)
      expect(clinic_user).to be_invalid
    end
  end
end
