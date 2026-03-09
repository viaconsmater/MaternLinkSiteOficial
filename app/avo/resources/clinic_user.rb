class Avo::Resources::ClinicUser < Avo::BaseResource
  self.includes = []
  self.visible_on_sidebar = false
  # self.search = {
  #   query: -> { query.ransack(id_eq: params[:q], m: "or").result(distinct: false) }
  # }

  def fields
    field :id, as: :id
    field :user, as: :belongs_to
    field :clinic, as: :belongs_to
    field :is_owner, as: :boolean
  end
end
