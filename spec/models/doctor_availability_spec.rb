require "rails_helper"

RSpec.describe DoctorAvailability, type: :model do
  describe "validations" do
    it "is valid with valid attributes" do
      expect(build(:doctor_availability)).to be_valid
    end

    it "is invalid without start_time" do
      expect(build(:doctor_availability, start_time: nil)).to be_invalid
    end

    it "is invalid without end_time" do
      expect(build(:doctor_availability, end_time: nil)).to be_invalid
    end

    it "is invalid without day_of_week" do
      expect(build(:doctor_availability, day_of_week: nil)).to be_invalid
    end

    it "is invalid without doctor" do
      expect(build(:doctor_availability, doctor: nil)).to be_invalid
    end
  end

  describe "time validations" do
    context "when start_time is after end_time" do
      it "is invalid" do
        expect(build(:doctor_availability, start_time: 2.hours.from_now, end_time: Time.zone.now)).to be_invalid
      end
    end

    context "when the doctor is already available at the time" do
      let(:doctor) { create(:doctor) }

      before { create(:doctor_availability, start_time: Time.zone.now, end_time: 2.hours.from_now, doctor: doctor) }

      it "is invalid" do
        expect(build(
          :doctor_availability,
          start_time: Time.zone.now,
          end_time: 1.hour.from_now,
          doctor: doctor,
        )).to be_invalid
      end
    end
  end
end
