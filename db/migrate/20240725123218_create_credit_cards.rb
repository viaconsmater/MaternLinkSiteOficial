class CreateCreditCards < ActiveRecord::Migration[7.1]
  def change
    create_table :credit_cards do |t|
      t.string :credit_card_brand
      t.string :credit_card_number
      t.string :credit_card_token
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
