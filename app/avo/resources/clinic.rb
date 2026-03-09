class Avo::Resources::Clinic < Avo::BaseResource
  self.includes = []

  def fields
    field :id, as: :id
    field :name, as: :text
    field :cnpj, as: :text, hide_on: :index
    field :description, as: :textarea, hide_on: :index
    # 1000 => 10%
    field :operation_fee,
      as: :number,
      help: "Para preencher esse valor multiple a porcentagem por 10000, exemplo 0.1 = 10%, então coloque 1000"
    field :active, as: :boolean
    field :address, as: :belongs_to, hide_on: :index
    field :clinic_users, as: :has_many
    field :appointments, as: :has_many
  end

  def name
    "Clínica"
  end

  def plural_name
    "Clínicas"
  end
end
