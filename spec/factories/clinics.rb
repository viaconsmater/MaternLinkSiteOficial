FactoryBot.define do
  factory :clinic do
    name { "MyString" }
    cnpj { CNPJ.generate }
    description { "MyText" }
    pix_key { CPF.generate }
    pix_type { :CPF }

    association :address
  end
end
