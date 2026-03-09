class AddPaymentToBudgetItems < ActiveRecord::Migration[7.1]
  def change
    add_reference :budget_items, :payment, foreign_key: true
  end
end
