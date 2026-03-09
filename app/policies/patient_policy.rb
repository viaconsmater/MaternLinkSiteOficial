class PatientPolicy < ApplicationPolicy
  def appointments?
    user.patient?
  end
end
