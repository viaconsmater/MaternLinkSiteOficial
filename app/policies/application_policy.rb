# Base class for application policies
class ApplicationPolicy < ActionPolicy::Base
  default_rule :manage?

  alias_rule :destroy?, :update?, :edit?, to: :manage?
  alias_rule :index?, :create?, :new?, to: :manage?

  def manage?
    false
  end
end
