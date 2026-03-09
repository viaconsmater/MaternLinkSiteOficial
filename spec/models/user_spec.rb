require "rails_helper"

RSpec.describe User, type: :model do
  describe "validations" do
    context "when all attributes are valid" do
      it { expect(build(:user)).to be_valid }
      it { expect(build(:user_doctor)).to be_valid }
    end

    context "with invalid name" do
      it { expect(build(:user, name: "")).to be_invalid }
    end

    context "with invalid cpf" do
      it { expect(build(:user, cpf: "")).to be_invalid }
    end

    context "with invalid cpf format" do
      it { expect(build(:user, cpf: "12345678")).to be_invalid }
    end

    context "with invalid email" do
      it { expect(build(:user, email: "")).to be_invalid }
    end

    context "with invalid email structure" do
      it { expect(build(:user, email: "obrabo")).to be_invalid }
    end

    context "with already existing email" do
      before { create(:user, email: "teste@teste.com") }

      it { expect(build(:user, email: "teste@teste.com")).to be_invalid }
    end

    context "with invalid password" do
      it { expect(build(:user, password: "")).to be_invalid }
    end

    context "with small password" do
      it { expect(build(:user, password: "123")).to be_invalid }
    end
  end

  describe "age" do
    context "with birthday yet to come" do
      it "returns correct age" do
        user = create(:user, birthdate: (19.years.ago + 1.day))
        expect(user.age).to eq(18)
      end
    end

    context "with birthday already passed" do
      it "returns correct age" do
        user = create(:user, birthdate: (19.years.ago - 1.day))
        expect(user.age).to eq(19)
      end
    end
  end
end
