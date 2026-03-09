class ClinicSerializer < ApplicationSerializer
  attributes :id,
    :name,
    :description,
    :doctors,
    :created_at,
    :monthly_income,
    :monthly_appointment,
    :monthly_new_patients,
    :last_income,
    :last_appointment,
    :last_new_patients,
    :image

  def doctors
    Panko::ArraySerializer.new(
      object.users.where(role: :doctor),
      each_serializer: SimplifiedProfessionalSerializer,
    ).to_a
  end

  def monthly_income
    current_date = Time.zone.now
    object.monthly_income(current_date.month, current_date.year)
  end

  def monthly_appointment
    current_date = Time.zone.now
    object.monthly_appointments(current_date.month, current_date.year)
  end

  def monthly_new_patients
    current_date = Time.zone.now
    object.monthly_new_patients(current_date.month, current_date.year)
  end

  def last_income
    current_date = 1.month.ago
    object.monthly_income(current_date.month, current_date.year)
  end

  def last_appointment
    current_date = 1.month.ago
    object.monthly_appointments(current_date.month, current_date.year)
  end

  def last_new_patients
    current_date = 1.month.ago
    object.monthly_new_patients(current_date.month, current_date.year)
  end

  def image
    return nil unless object.image.attached?
    Rails.application.routes.url_helpers.rails_blob_path(object.image, only_path: true)
  end
end
