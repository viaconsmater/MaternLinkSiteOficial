class Avo::Resources::ContactingUser < Avo::BaseResource
  self.includes = []
  # self.search = {
  #   query: -> { query.ransack(id_eq: params[:q], m: "or").result(distinct: false) }
  # }

  def fields
    field :id, as: :id
    field :name, as: :text
    field :email, as: :text
    field :phone, as: :text
  end

  def name
    "Contato de Usuário"
  end

  def plural_name
    "Contatos de Usuários"
  end
end
