class CreateAddresses < ActiveRecord::Migration[7.1]
  def change
    create_table :addresses do |t|
      t.string :cep
      t.string :neighborhood
      t.string :city
      t.string :state
      t.string :street
      t.string :number

      t.timestamps
    end
  end
end
