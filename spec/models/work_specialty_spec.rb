require "rails_helper"

RSpec.describe WorkSpecialty, type: :model do
  describe "validations" do
    context "when all attributes are valid" do
      it { expect(build(:work_specialty)).to be_valid }
    end

    context "with invalid name" do
      it { expect(build(:work_specialty, name: "")).to be_invalid }
    end

    context "with invalid work_area" do
      it { expect(build(:work_specialty, work_area_id: "")).to be_invalid }
    end
  end
end
