require "rails_helper"

RSpec.describe Address, type: :model do
  describe "validations" do
    context "when all attributes are valid" do
      it { expect(build(:address)).to be_valid }
    end

    context "when cep is invalid" do
      it { expect(build(:address, cep: "")).to be_invalid }
    end

    context "when city is invalid" do
      it { expect(build(:address, city: "")).to be_invalid }
    end

    context "when state is invalid" do
      it { expect(build(:address, state: "")).to be_invalid }
    end

    context "when neighborhood is invalid" do
      it { expect(build(:address, neighborhood: "")).to be_invalid }
    end

    context "when street is invalid" do
      it { expect(build(:address, street: "")).to be_invalid }
    end
  end
end
