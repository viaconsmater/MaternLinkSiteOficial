class Patient < ApplicationRecord
  belongs_to :user
  has_many :appointments, dependent: :destroy

  delegate :name, to: :user
end
