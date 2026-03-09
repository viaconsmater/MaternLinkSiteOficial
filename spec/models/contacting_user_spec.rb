require "rails_helper"

RSpec.describe ContactingUser, type: :model do
  describe "validations" do
    context "when all attributes are valid" do
      it { expect(build(:contacting_user)).to be_valid }
    end
  end
end
