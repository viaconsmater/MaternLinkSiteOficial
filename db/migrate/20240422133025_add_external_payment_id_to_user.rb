class AddExternalPaymentIdToUser < ActiveRecord::Migration[7.1]
  def change
    add_column :users, :external_payment_id, :string
  end
end
