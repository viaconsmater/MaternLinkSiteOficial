class AddTransferStatusToAppointment < ActiveRecord::Migration[7.1]
  def change
    add_column :appointments, :transfer_status, :integer, default: 0
  end
end
