class AddMorePaymentFieldsToClinicAndAppointment < ActiveRecord::Migration[7.1]
  def change
    add_column :clinics, :pix_type, :integer, default: 0
    add_column :appointments, :external_clinic_payment_id, :string, null: true
    add_index :appointments, :external_clinic_payment_id, unique: true
    add_column :appointments, :payment_status, :integer, default: 0
  end
end
