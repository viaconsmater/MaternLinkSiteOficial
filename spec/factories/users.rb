FactoryBot.define do
  factory :user do
    name { "Robertin" }
    email { Faker::Internet.unique.email }
    password { "123456" }
    role { :admin }
    phone { "(61) 99999-9999" }
    cpf { CPF.generate }
    gender { :female }
    birthdate { Time.zone.today }

    factory :user_doctor do
      role { :doctor }
      association :doctor
    end

    factory :user_manager do
      role { :manager }
    end

    factory :user_patient do
      role { :patient }
      association :patient
    end

    trait :owns_clinic do
      after(:create) do |user|
        create(:clinic_user, user: user)
      end
    end

    association :address
  end
end
