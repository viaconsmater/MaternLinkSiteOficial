require "rails_helper"

RSpec.describe Doctor, type: :model do
  describe "validations" do
    it "is valid with valid attributes" do
      doctor = build(:doctor)
      expect(doctor).to be_valid
    end

    it "is invalid without a council" do
      doctor = build(:doctor, council: nil)
      expect(doctor).to be_invalid
    end

    it "is invalid without a user" do
      doctor = build(:doctor, user: nil)
      expect(doctor).to be_invalid
    end

    it "is invalid without a work_area" do
      doctor = build(:doctor, work_area: nil)
      expect(doctor).to be_invalid
    end

    it "is invalid without a work_specialty" do
      doctor = build(:doctor, work_specialty: nil)
      expect(doctor).to be_invalid
    end

    it "is invalid with negatice price" do
      doctor = build(:doctor, price_cents: -5)
      expect(doctor).to be_invalid
    end
  end
end
