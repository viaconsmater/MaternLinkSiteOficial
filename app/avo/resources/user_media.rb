class Avo::Resources::UserMedia < Avo::BaseResource
  self.includes = []
  # self.search = {
  #   query: -> { query.ransack(id_eq: params[:q], m: "or").result(distinct: false) }
  # }

  self.visible_on_sidebar = false

  def fields
    field :id, as: :id
    field :name, as: :text
    field :image_url, as: :text
    field :user, as: :belongs_to
  end
end
