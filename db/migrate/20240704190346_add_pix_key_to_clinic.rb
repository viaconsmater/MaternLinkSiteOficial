class AddPixKeyToClinic < ActiveRecord::Migration[7.1]
  def change
    add_column :clinics, :pix_key, :string
  end
end
