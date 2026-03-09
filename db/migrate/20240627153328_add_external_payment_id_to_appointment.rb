class AddExternalPaymentIdToAppointment < ActiveRecord::Migration[7.1]
  def change
    add_column :appointments, :external_payment_id, :string
    add_index :appointments, :external_payment_id, unique: true
  end
end
