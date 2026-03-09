class CreatePayments < ActiveRecord::Migration[7.1]
  def change
    create_table :payments do |t|
      t.integer :status
      t.integer :payment_method
      t.integer :transfer_status
      t.decimal :amount, precision: 10, scale: 2, null: false
      t.references :payable, polymorphic: true, null: false
      t.references :user, null: false, foreign_key: true
      t.datetime :paid_at
      t.string :transaction_id

      t.timestamps
    end
  end
end
