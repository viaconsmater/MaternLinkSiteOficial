class ClinicPolicy < ApplicationPolicy
  alias_rule :new_doctor?, :create_doctor?, to: :my_clinic?

  def my_clinic?
    user.manager?
  end

  def attach_image?
    user.owns_clinic? && !user.patient?
  end

  def appointments?
    user.manager? && !user.clinic.nil? && user.clinic.users.pluck(:id).include?(record.id)
  end
end
