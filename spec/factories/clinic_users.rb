FactoryBot.define do
  factory :clinic_user do
    is_owner { true }

    association :clinic
    association :user
  end
end
