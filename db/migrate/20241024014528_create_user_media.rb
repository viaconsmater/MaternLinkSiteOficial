class CreateUserMedia < ActiveRecord::Migration[7.1]
  def change
    create_table :user_media do |t|
      t.references :user, null: false, foreign_key: true
      t.string :media_url
      t.string :name

      t.timestamps
    end
  end
end
