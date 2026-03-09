class CreateJoinTableClinicWorkSpecialty < ActiveRecord::Migration[7.1]
  def change
    create_join_table :clinics, :work_specialties do |t|
      t.index [:clinic_id, :work_specialty_id]
      t.index [:work_specialty_id, :clinic_id]
    end
  end
end
