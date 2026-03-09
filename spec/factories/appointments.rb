FactoryBot.define do
  factory :appointment do
    date { 6.hours.from_now }
    duration { 30 }
    status { 0 }
    payment_status { 0 }
    price_cents { 1 }
    aditional_info { "Info" }

    trait :without_validation do
      to_create do |instance|
        instance.save(validate: false)
      end
    end

    association :patient
    association :doctor
    association :clinic
  end
end
