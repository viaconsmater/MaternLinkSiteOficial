require "rails_helper"

RSpec.describe PatientPolicy, type: :policy do
  let(:user) { create(:user) }
  let(:context) { { user: user } }

  describe_rule :appointments? do
    failed "when user is admin"

    succeed "when user is patient" do
      before { user.role = :patient }
    end

    failed "when user is doctor" do
      before { user.role = :doctor }
    end

    failed "when user is manager" do
      before { user.role = :manager }
    end
  end
end
