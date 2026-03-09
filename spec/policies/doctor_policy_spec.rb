require "rails_helper"

RSpec.describe DoctorPolicy, type: :policy do
  let(:user) { create(:user) }
  let(:context) { { user: user } }
  let(:record) { create(:user) }

  describe_rule :manage? do
    failed "when user is admin"

    failed "when user is patient" do
      before { user.role = :patient }
    end

    succeed "when user is doctor" do
      before { user.role = :doctor }
    end

    failed "when user is manager" do
      before { user.role = :manager }
    end
  end

  describe_rule :create? do
    failed "when user is admin"

    failed "when user is patient" do
      before { user.role = :patient }
    end

    failed "when user is doctor" do
      before { user.role = :doctor }
    end

    succeed "when user is doctor and it updates itself" do
      before do
        user.role = :doctor
        user.id = record.id
      end
    end

    failed "when user is manager" do
      before do
        user.role = :manager
        clinic = create(:clinic)
        create(:clinic_user, clinic: clinic, user: user, is_owner: true)
      end
    end

    succeed "when user is manager and the doctor is within his clinic" do
      before do
        user.role = :manager
        clinic = create(:clinic)
        create(:clinic_user, clinic: clinic, user: user, is_owner: true)
        create(:clinic_user, clinic: clinic, user: record, is_owner: false)
      end
    end
  end
end
