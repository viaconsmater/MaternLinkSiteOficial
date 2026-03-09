require "rails_helper"

RSpec.describe AppointmentPolicy, type: :policy do
  let(:user) { create(:user) }
  let(:patient) { create(:user_patient) }
  let(:doctor) { create(:doctor) }
  let(:record) { create(:appointment, date: 4.hours.from_now, doctor: doctor, patient: patient.patient) }
  let(:context) { { user: user } }

  before { create(:doctor_availability, doctor: doctor) }

  describe_rule :manage? do
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

  describe_rule :index? do
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

  describe_rule :payment? do
    failed "when user is admin"

    succeed "when user is patient and owner of the appointment" do
      let(:user) { patient }
    end

    failed "when user is doctor" do
      before { user.role = :doctor }
    end

    failed "when user is manager" do
      before { user.role = :manager }
    end
  end
end
