class AppointmentPolicy < ApplicationPolicy
  def manage?
    user.patient?
  end

  def index?
    user.doctor?
  end

  def payment?
    user.patient? && record.patient_id == user.patient.id
  end
end
