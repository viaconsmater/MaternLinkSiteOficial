class AddNewFieldsToDoctor < ActiveRecord::Migration[7.1]
  def change
    add_column :doctors, :description, :text
  end
end
