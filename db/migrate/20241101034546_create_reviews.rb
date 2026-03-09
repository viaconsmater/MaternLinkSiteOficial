class CreateReviews < ActiveRecord::Migration[7.1]
  def change
    create_table :reviews do |t|
      t.integer :rating, null: false
      t.text :description
      t.references :reviewable, polymorphic: true, null: false
      t.timestamps
    end
  end
end
