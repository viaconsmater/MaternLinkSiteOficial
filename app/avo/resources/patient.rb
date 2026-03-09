class Avo::Resources::Patient < Avo::BaseResource
  self.includes = []
  # self.search = {
  #   query: -> { query.ransack(id_eq: params[:q], m: "or").result(distinct: false) }
  # }

  def fields
    field :id, as: :id
    field :user, as: :belongs_to
    field :name, as: :text
    field :appointments, as: :has_many
  end

  def name
    "Paciente"
  end

  def plural_name
    "Pacientes"
  end
end
