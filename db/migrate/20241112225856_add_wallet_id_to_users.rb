class AddWalletIdToUsers < ActiveRecord::Migration[7.1]
  def change
    add_column :users, :wallet_id, :string
  end
end
