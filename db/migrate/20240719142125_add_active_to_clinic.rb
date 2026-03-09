class AddActiveToClinic < ActiveRecord::Migration[7.1]
  def change
    add_column :clinics, :active, :boolean, default: true
  end
end
