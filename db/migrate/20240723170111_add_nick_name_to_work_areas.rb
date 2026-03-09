class AddNickNameToWorkAreas < ActiveRecord::Migration[7.1]
  def change
    add_column :work_areas, :nick_name, :string
  end
end
