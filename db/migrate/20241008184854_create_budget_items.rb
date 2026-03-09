class CreateBudgetItems < ActiveRecord::Migration[7.1]
  def change
    create_table :budget_items do |t|
      t.references :clinic, null: false, foreign_key: true
      t.references :budget, null: false, foreign_key: true
      t.text :description, null: true
      t.integer :status, default: 0
      t.decimal :amount, null: true, precision: 10, scale: 2
      t.datetime :paid_at
      t.timestamps
    end
  end
end
