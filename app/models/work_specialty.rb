class WorkSpecialty < ApplicationRecord
  validates :name, presence: true
  belongs_to :work_area, optional: true
  has_many :doctors, dependent: :nullify
  has_and_belongs_to_many :clinics, join_table: :clinics_work_specialties

  scope :exams, lambda { where(is_exam: true) }
end
