class CreateContactingUsers < ActiveRecord::Migration[7.1]
  def change
    create_table :contacting_users do |t|
      t.string :name
      t.string :email
      t.string :phone

      t.timestamps
    end
  end
end
