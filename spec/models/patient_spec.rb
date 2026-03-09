require "rails_helper"

RSpec.describe Patient, type: :model do
  describe "validations" do
    context "when all attributes are valid" do
      it { expect(build(:patient)).to be_valid }
    end

    context "with no user" do
      it { expect(build(:patient, user: nil)).to be_invalid }
    end
  end
end
