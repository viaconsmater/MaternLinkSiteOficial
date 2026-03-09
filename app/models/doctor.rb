class Doctor < ApplicationRecord
  belongs_to :work_area
  belongs_to :work_specialty
  belongs_to :user

  delegate :name, to: :user

  validates :price_cents, numericality: { greater_than_or_equal_to: 0 }, allow_nil: true
  has_many :doctor_availabilities, dependent: :destroy
  has_many :appointments, dependent: :destroy
  has_many :reviews, as: :reviewable, dependent: :destroy

  validates :council, presence: true

  def monthly_income(month, year)
    return 0 if appointments.blank?

    appointments.by_date(month, year).where(transfer_status: :success).sum(&:price_cents)
  end

  def monthly_pending_income(month, year)
    return 0 if appointments.blank?

    appointments.by_date(month, year).where(transfer_status: :waiting).sum(&:price_cents)
  end

  def monthly_appointments(month, year)
    appointments.by_date(month, year).where(status: :completed).size
  end

  def monthly_new_patients(month, year)
    month_start = Time.zone.parse("1/#{month}/#{year}")
    old_patients = appointments.where(date: ...month_start).pluck(:patient_id).uniq
    this_month_patients = appointments.by_date(month, year).pluck(:patient_id).uniq
    (this_month_patients.to_set - old_patients.to_set).size
  end

  def image_new
    object.user.image_url
  end
end
