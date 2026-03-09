class Avo::Resources::Address < Avo::BaseResource
  self.includes = []
  self.title = :full_address
  self.visible_on_sidebar = false
  # self.search = {
  #   query: -> { query.ransack(id_eq: params[:q], m: "or").result(distinct: false) }
  # }

  def fields
    field :id, as: :id
    field :cep, as: :text
    field :neighborhood, as: :text
    field :city, as: :text
    field :state, as: :text
    field :street, as: :text
    field :number, as: :text
  end

  def name
    "Endereço"
  end

  def plural_name
    "Endereços"
  end
end
