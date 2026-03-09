class ChangeExternalPaymentIdFromUserToClinic < ActiveRecord::Migration[7.1]
  def change
    add_column :clinics, :external_payment_id, :string
  end
end
