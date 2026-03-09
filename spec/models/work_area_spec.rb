require "rails_helper"

RSpec.describe WorkArea, type: :model do
  describe "validations" do
    context "when all attributes are valid" do
      it { expect(build(:work_area)).to be_valid }
    end

    context "with invalid name" do
      it { expect(build(:work_area, name: "")).to be_invalid }
    end

    context "with already existing name" do
      before { create(:work_area, name: "teste") }

      it { expect(build(:work_area, name: "teste")).to be_invalid }
    end
  end
end
