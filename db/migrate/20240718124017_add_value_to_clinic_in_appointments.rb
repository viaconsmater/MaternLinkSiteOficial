class AddValueToClinicInAppointments < ActiveRecord::Migration[7.1]
  def change
    add_column :appointments, :transfer_value_cents, :integer
  end
end
