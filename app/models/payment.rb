class Payment < ApplicationRecord
  belongs_to :payable, polymorphic: true
  belongs_to :user

  has_many :items, class_name: 'BudgetItem', dependent: :destroy

  enum status: { pending: 0, processing: 1, paid: 2, payment_cancelled: 3, error: 4, refunded: 5 }
  enum transfer_status: { waiting: 0, success: 1, failure: 2 }
  enum payment_method: { pix: 0, credit_card: 1 }
end
