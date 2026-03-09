class AddPaymentMethodToAppointment < ActiveRecord::Migration[7.1]
  def change
    add_column :appointments, :payment_method, :integer
  end
end
