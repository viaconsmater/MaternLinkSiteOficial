class AddOperationTaxToClinic < ActiveRecord::Migration[7.1]
  def change
    add_column :clinics, :operation_fee, :integer, default: 1000
  end
end
