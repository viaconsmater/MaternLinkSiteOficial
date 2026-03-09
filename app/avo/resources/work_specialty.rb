class Avo::Resources::WorkSpecialty < Avo::BaseResource
  self.includes = []
  # self.search = {
  #   query: -> { query.ransack(id_eq: params[:q], m: "or").result(distinct: false) }
  # }

  def fields
    field :id, as: :id
    field :name, as: :text
    field :work_area, as: :belongs_to
    field :is_exam, as: :boolean, name: "Área de um exame?"
  end

  def filters
    filter Avo::Filters::WorkAreaFilter
  end

  def name
    "Especialidade"
  end

  def plural_name
    "Especialidades"
  end
end
