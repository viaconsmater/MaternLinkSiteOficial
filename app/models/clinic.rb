class Clinic < ApplicationRecord
  include RestApiGenerator::Filterable
  belongs_to :address

  has_and_belongs_to_many :work_specialties, join_table: :clinics_work_specialties

  has_many :clinic_users, dependent: :destroy
  has_many :users, through: :clinic_users
  has_many :appointments, dependent: :destroy
  has_many :items, dependent: :destroy, class_name: 'BudgetItem'
  has_many :budgets, through: :items, dependent: :destroy
  has_many :reviews, as: :reviewable, dependent: :destroy

  has_one_attached :image

  scope :actived, ->() { where(active: true) }
  scope :inactive, ->() { where(active: false) }
  scope :exam_enabled, ->() { where(exam_enabled: true) }

  scope :nearby, ->(latitude, longitude) {
    latitude_sql = Arel.sql("#{latitude}")
    longitude_sql = Arel.sql("#{longitude}")

    select("clinics.*,
            (6371 * acos(cos(radians(#{latitude_sql})) * cos(radians(addresses.latitude)) *
            cos(radians(addresses.longitude) - radians(#{longitude_sql})) +
            sin(radians(#{latitude_sql})) * sin(radians(addresses.latitude)))) AS distance")
    .from('clinics')
    .joins('INNER JOIN addresses ON addresses.id = clinics.address_id')
    .order("distance ASC")
  }

  filter_scope :filter_by_work_specialty_id, ->(work_specialty_id) {
    joins(:work_specialties).where(work_specialties: { id: work_specialty_id, is_exam: true }).distinct
  }

  filter_scope :filter_by_state, ->(state) {
    joins(:address).where(address: { state: state.upcase })
  }

  filter_scope :filter_by_city, ->(city) {
    joins(:address).where(address: { city: city })
      .or(where(address: { neighborhood: city }))
  }

  enum pix_type: {
    CPF: 0, EMAIL: 1, PHONE: 2, EVP: 3,
  }

  validates :name, :cnpj, presence: true
  # menor valor possível 0% e maior 20%
  validates :operation_fee, numericality: { greater_than_or_equal_to: 0, less_than_or_equal_to: 2000 }
  validate :cnpj_format

  # Quando desativar a clinica, desativar todos os usuários
  after_update if: :active_previously_changed? do
    unless active
      # rubocop:disable Rails/SkipsModelValidations
      users.update_all(enabled: false)
      # rubocop:enable Rails/SkipsModelValidations
    end
  end

  def owner
    owner = clinic_users.where(is_owner: true).order(:created_at)
    owner&.first&.user
  end

  # 10% => 1000
  # Needs to returns 0.1
  def operation_fee_to_f
    operation_fee / 10000.0
  end

  def has_plan?
    false
  end

  def image_url
    Rails.application.routes.url_helpers.rails_blob_url(image.url)
  end

  def cnpj_format
    if !CNPJ.valid?(cnpj)
      errors.add(:base, "CNPJ inválido")
    else
      true
    end
  end

  def monthly_income(month, year)
    appointments.by_date(month, year).sum(&:price_cents)
  end

  def monthly_appointments(month, year)
    appointments.by_date(month, year).size
  end

  def monthly_new_patients(month, year)
    month_start = Time.zone.parse("1/#{month}/#{year}")
    old_patients = appointments.where(date: ...month_start).pluck(:patient_id).uniq
    this_month_patients = appointments.by_date(month, year).pluck(:patient_id).uniq
    (this_month_patients.to_set - old_patients.to_set).size
  end
end
