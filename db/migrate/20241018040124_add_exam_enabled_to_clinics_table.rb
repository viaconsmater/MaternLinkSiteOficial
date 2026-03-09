class AddExamEnabledToClinicsTable < ActiveRecord::Migration[7.1]
  def change
    add_column :clinics, :exam_enabled, :boolean, default: false, null: false
  end
end
