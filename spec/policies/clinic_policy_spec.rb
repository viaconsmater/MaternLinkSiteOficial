require "rails_helper"

RSpec.describe ClinicPolicy, type: :policy do
  let(:user) { create(:user_manager, :owns_clinic) }
  let(:record) { create(:clinic) }
  let(:context) { { user: user } }

  describe_rule :my_clinic? do
    succeed "when user is manager"

    failed "when user is patient" do
      before { user.role = :patient }
    end

    failed "when user is doctor" do
      before { user.role = :doctor }
    end

    failed "when user is admin" do
      before { user.role = :admin }
    end
  end

  describe_rule :attach_image? do
    succeed "when user owns a clinic"

    failed "when user does not own a clinic" do
      before { user.clinic_users = [] }
    end

    failed "when user is patient" do
      before { user.patient! }
    end
  end

  describe_rule :appointments? do
    let(:user) { create(:user_manager) }
    let(:record) { create(:user_doctor) }
    let(:context) { { user: user } }
    let(:professional) { create(:doctor, clinics: [user.clinic]) }

    failed "when user is patient" do
      before { user.role = :patient }
    end

    failed "when user is doctor" do
      before { user.role = :doctor }
    end

    succeed "when user is manager" do
      before do
        user.role = :manager
        create(:clinic, users: [record, user])
      end
    end

    failed "when user is manager but doctor does not belongs to clinic" do
      before do
        user.role = :manager
        record.clinics = []
      end
    end
  end
end
