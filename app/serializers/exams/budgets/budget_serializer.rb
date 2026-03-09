class Exams::Budgets::BudgetSerializer < ApplicationSerializer
  attributes :id, :sent_at, :total_received, :total_sent

  def total_received
    object.items.received.count
  end

  def total_sent
    object.items.count
  end
end
