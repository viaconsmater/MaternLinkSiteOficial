class ConfigurationsPolicy < ApplicationPolicy
  def plan?
    true
  end

  def password?
    true
  end

  def change_password?
    true
  end
end
