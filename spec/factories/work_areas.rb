FactoryBot.define do
  factory :work_area do |_n|
    name { Faker::Name.unique.name }
    nick_name { Faker::Name.unique.name }
  end
end
