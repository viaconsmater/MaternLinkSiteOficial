class ChangeWorkAreaIdNullableOnWorkSpecialties < ActiveRecord::Migration[7.1]
  def change
    change_column_null :work_specialties, :work_area_id, true
  end
end
