class User < ApplicationRecord
  include RestApiGenerator::Filterable
  enum role: { admin: 0, doctor: 1, patient: 2, manager: 3 }
  enum gender: {
    male: 0, female: 1,
  }

  has_secure_password
  has_one_attached :image
  has_many_attached :media_urls 

  scope :enabled, ->() { where(enabled: true) }

  generates_token_for :email_verification, expires_in: 2.days do
    email
  end
  generates_token_for :password_reset, expires_in: 20.minutes do
    password_salt.last(10)
  end

  belongs_to :address

  has_many :sessions, dependent: :destroy
  has_many :password_reset_tokens, dependent: :destroy
  has_one :doctor, dependent: :destroy
  has_many :doctor_appointments, through: :doctor, source: :appointments
  has_many :doctor_availabilities, through: :doctor
  has_one :patient, dependent: :destroy
  has_many :patient_appointments, through: :patient, source: :appointments
  has_one :work_area, through: :doctor # Access work_area through doctor
  has_many :clinic_users, dependent: :destroy
  has_many :clinics, through: :clinic_users
  has_many :credit_cards, dependent: :destroy
  has_many :budgets, dependent: :destroy
  has_many :items, through: :budgets, dependent: :destroy
  has_many :payments, dependent: :destroy
  has_many :user_media, dependent: :destroy, class_name: "UserMedia"

  accepts_nested_attributes_for :user_media
  accepts_nested_attributes_for :address
  accepts_nested_attributes_for :doctor
  accepts_nested_attributes_for :patient
  accepts_nested_attributes_for :clinics

  validates :email, presence: true, uniqueness: true, format: { with: URI::MailTo::EMAIL_REGEXP }
  validates :password, allow_nil: true, length: { minimum: 6 }
  validates :name, :cpf, presence: true
  validate :cpf_format

  filter_scope :filter_by_work_area, ->(work_area_id) {
    joins(:doctor).where(doctors: { work_area_id: work_area_id })
  }
  
  filter_scope :filter_by_work_specialty, ->(work_specialty_id) {
    joins(:doctor).where(doctors: { work_specialty_id: work_specialty_id })
  }

  filter_scope :filter_by_state, ->(state) {
    joins(:address).where(addresses: { state: state.upcase })
  }

  filter_scope :filter_by_city, ->(city) {
    joins(:address).where(addresses: { city: city })
      .or(where(addresses: { neighborhood: city }))
  }

  scope :nearby, ->(latitude, longitude) {
    latitude_sql = Arel.sql("#{latitude}")
    longitude_sql = Arel.sql("#{longitude}")

    select("users.*,
            (6371 * acos(cos(radians(#{latitude_sql})) * cos(radians(addresses.latitude)) *
            cos(radians(addresses.longitude) - radians(#{longitude_sql})) +
            sin(radians(#{latitude_sql})) * sin(radians(addresses.latitude)))) AS distance")
    .joins('INNER JOIN addresses ON addresses.id = users.address_id')
    .order("distance ASC")
  }

  normalizes :email, with: -> { _1.strip.downcase }

  before_validation if: :email_changed?, on: :update do
    self.verified = false
  end

  after_update if: :password_digest_previously_changed? do
    sessions.where.not(id: Current.session).delete_all
  end

  include Rails.application.routes.url_helpers

  def image_url
    image.attached? ? url_for(image) : '/images/default_avatar.png'
  end

  def media_urls
    user_media.map { |media| media.media_urls.map { |file| file.url } }.flatten
  end

  def owns_clinic?
    clinics.exists?(clinic_users: { user: self, is_owner: true })
  end

  def cpf_format
    if !CPF.valid?(cpf)
      errors.add(:base, "CPF inválido")
    else
      true
    end
  end

  def age
    return unless birthdate

    today = Time.zone.today
    years = today.year - birthdate.year

    # Account for days and months if birthday hasn't passed yet this year
    if today.month < birthdate.month || (today.month == birthdate.month && today.day < birthdate.day)
      years -= 1
    end

    years
  end

  def translated_gender
    return "mulher" if gender.to_s == "female"

    "homem"
  end

  def clinic
    clinic_users.find_by(is_owner: true)&.clinic || clinics.first
  end
end
