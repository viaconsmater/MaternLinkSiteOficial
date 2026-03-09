require "rails_helper"

RSpec.describe CreditCard, type: :model do
  describe "validations" do
    it "is valid with valid attributes" do
      expect(build(:credit_card)).to be_valid
    end

    it "is invalid without an user" do
      expect(build(:credit_card, user: nil)).to be_invalid
    end
  end
end
