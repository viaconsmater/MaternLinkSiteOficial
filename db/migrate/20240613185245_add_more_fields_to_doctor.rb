class AddMoreFieldsToDoctor < ActiveRecord::Migration[7.1]
  def change
    add_column :doctors, :professional_experiences, :string, array: true, default: []
    add_column :doctors, :educational_history, :string, array: true, default: []
    add_column :doctors, :price_cents, :integer
  end
end
