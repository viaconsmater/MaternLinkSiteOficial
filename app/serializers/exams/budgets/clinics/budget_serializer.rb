class Exams::Budgets::Clinics::BudgetSerializer < ApplicationSerializer
  has_one :user, serializer: CurrentUserSerializer
  has_many :items, serializer: Exams::Budgets::Clinics::ItemSerializer

  attributes :id, :sent_at
end
