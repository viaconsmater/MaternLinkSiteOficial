class DoctorPolicy < ApplicationPolicy
  alias_rule :income?, to: :manage?

  def manage?
    user.doctor?
  end

  def create?
    (user.manager? && user.clinic.clinic_users.pluck(:user_id).include?(record.id)) ||
      (user.doctor? && user.id == record.id)
  end
end
