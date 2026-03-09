class WorkArea < ApplicationRecord
  validates :name, presence: true, uniqueness: true
  validates :nick_name, presence: true

  has_many :work_specialties, dependent: :destroy
  has_many :doctors, dependent: :nullify
end
