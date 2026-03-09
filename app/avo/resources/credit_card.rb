class Avo::Resources::CreditCard < Avo::BaseResource
  self.includes = []
  # self.search = {
  #   query: -> { query.ransack(id_eq: params[:q], m: "or").result(distinct: false) }
  # }

  self.visible_on_sidebar = false

  def fields
    field :id, as: :id
    field :credit_card_brand, as: :text
    field :credit_card_number, as: :text
    field :credit_card_token, as: :text
    field :user, as: :belongs_to
  end
end
