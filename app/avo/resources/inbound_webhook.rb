class Avo::Resources::InboundWebhook < Avo::BaseResource
  self.includes = []
  # self.search = {
  #   query: -> { query.ransack(id_eq: params[:q], m: "or").result(distinct: false) }
  # }

  def fields
    field :id, as: :id
    field :status, as: :text
    field :body, as: :textarea
  end

  def name
    "Webhook Recebido"
  end

  def plural_name
    "Webhooks Recebidos"
  end
end
