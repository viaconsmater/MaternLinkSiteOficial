class Avo::Resources::WorkArea < Avo::BaseResource
  self.includes = []
  # self.search = {
  #   query: -> { query.ransack(id_eq: params[:q], m: "or").result(distinct: false) }
  # }

  def fields
    field :id, as: :id
    field :name, as: :text
    field :nick_name, as: :text
    field :work_specialties, as: :has_many
  end

  def name
    "Conselho Regional"
  end

  def plural_name
    "Conselhos Regionais"
  end
end
