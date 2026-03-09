class CreateWorkSpecialties < ActiveRecord::Migration[7.1]
  def change
    create_table :work_specialties do |t|
      t.string :name, null: false
      t.references :work_area, null: false, foreign_key: true

      t.timestamps
    end
  end
end
