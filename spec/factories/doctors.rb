FactoryBot.define do
  factory :doctor do
    council { "MyString" }
    description { "MyText" }
    association :user
    association :work_area
    association :work_specialty
  end
end
