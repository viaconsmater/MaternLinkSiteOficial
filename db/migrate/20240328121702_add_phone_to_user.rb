class AddPhoneToUser < ActiveRecord::Migration[7.1]
  def change
    add_column :users, :phone, :string
    add_column :users, :cpf, :string
    add_column :users, :gender, :integer
    add_column :users, :birthdate, :date
  end
end
