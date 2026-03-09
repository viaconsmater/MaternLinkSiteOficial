class AddSplitEnabledToUsers < ActiveRecord::Migration[7.1]
  def change
    add_column :users, :split_enabled, :boolean
  end
end
