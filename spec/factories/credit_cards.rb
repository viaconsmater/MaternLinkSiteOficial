FactoryBot.define do
  factory :credit_card do
    credit_card_brand { "MyString" }
    credit_card_number { "MyString" }
    credit_card_token { "MyString" }
    association :user
  end
end
