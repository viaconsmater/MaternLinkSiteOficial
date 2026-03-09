class AddAdditionalDescriptionToBudgetItems < ActiveRecord::Migration[7.1]
  def change
    add_column :budget_items, :additional_description, :string
  end
end
