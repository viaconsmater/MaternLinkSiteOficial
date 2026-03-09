class Avo::Resources::Payment < Avo::BaseResource
  self.includes = []
  self.visible_on_sidebar = false

  # self.search = {
  #   query: -> { query.ransack(id_eq: params[:q], m: "or").result(distinct: false) }
  # }

  def fields
    field :id, as: :id
    field :status, as: :select, enum: ::Payment.statuses
    field :payment_method, as: :select, enum: ::Payment.payment_methods
    field :transfer_status, as: :select, enum: ::Payment.transfer_statuses
    field :amount, as: :number
    field :payable_type, as: :text
    field :payable_id, as: :number
    field :user_id, as: :number
    field :paid_at, as: :date_time
    field :transaction_id, as: :text
    field :transaction_receipt_url, as: :text
    field :payable, as: :belongs_to
    field :user, as: :belongs_to
    field :items, as: :has_many
  end
end
