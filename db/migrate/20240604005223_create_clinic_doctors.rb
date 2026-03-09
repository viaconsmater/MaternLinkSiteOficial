class CreateClinicDoctors < ActiveRecord::Migration[7.1]
  def change
    create_table :clinic_users do |t|
      t.references :user, null: false, foreign_key: true
      t.references :clinic, null: false, foreign_key: true
      t.boolean :is_owner

      t.timestamps
    end
  end
end
