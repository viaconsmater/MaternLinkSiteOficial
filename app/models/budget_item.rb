class BudgetItem < ApplicationRecord
  default_scope { order(created_at: :desc) }

  belongs_to :budget
  belongs_to :clinic
  belongs_to :payment, optional: true

  validates :description, length: { maximum: 255 }

  enum status: {
    pending: 0,
    received: 1,
    cancelled: 2,
    accepted: 3
  }

  delegate :user, to: :budget
end
