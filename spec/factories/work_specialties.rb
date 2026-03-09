FactoryBot.define do
  factory :work_specialty do
    name { "MyString" }
    association :work_area, factory: :work_area
  end
end
