class AddTransactionReceiptUrlToPaymentTable < ActiveRecord::Migration[7.1]
  def change
     add_column :payments, :transaction_receipt_url, :string
  end
end
