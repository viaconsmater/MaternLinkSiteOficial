class AddIsExamToWorkSpecialties < ActiveRecord::Migration[7.1]
  def change
    add_column :work_specialties, :is_exam, :boolean, default: false, null: false
  end
end
