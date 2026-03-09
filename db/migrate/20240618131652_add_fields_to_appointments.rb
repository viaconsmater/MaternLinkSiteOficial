class AddFieldsToAppointments < ActiveRecord::Migration[7.1]
  def change
    add_reference :appointments, :clinic, null: true, foreign_key: true
    add_column :appointments, :price_cents, :integer
    add_column :appointments, :aditional_info, :text
  end
end
