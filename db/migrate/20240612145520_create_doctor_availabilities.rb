class CreateDoctorAvailabilities < ActiveRecord::Migration[7.1]
  def change
    create_table :doctor_availabilities do |t|
      t.references :doctor, null: false, foreign_key: true
      t.datetime :start_time
      t.datetime :end_time
      t.integer :day_of_week

      t.timestamps
    end
  end
end
