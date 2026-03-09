FactoryBot.define do
  factory :doctor_availability do
    start_time { "2024-06-12 00:00:01" }
    end_time { "2024-06-12 23:59:59" }
    day_of_week { Time.zone.today.wday - 1 >= 0 ? Time.zone.today.wday - 1 : 6 }

    association :doctor
  end
end
