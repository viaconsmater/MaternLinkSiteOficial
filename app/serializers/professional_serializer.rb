class ProfessionalSerializer < ApplicationSerializer
  attributes :id,
    :name,
    :role,
    :registered_since,
    :image,
    :patients,
    :specialty,
    :doctor_description,
    :clinic_name,
    :clinic_address,
    :clinic_id,
    :availabilities,
    :appointments,
    :clinic_image,
    :value,
    :rating_avg,
    :reviews

  has_many :doctor_availabilities, serializer: DoctorAvailabilitySerializer, name: :availabilities

  def registered_since
    years_difference = ((Time.zone.today.to_date - object.created_at.to_date).to_i / 365).floor
    months_difference = ((Time.zone.today.to_date - object.created_at.to_date).to_i / 30).floor
    if years_difference > 0
      "#{years_difference} #{years_difference == 1 ? "ano" : "anos"}"
    elsif months_difference > 1
      "#{months_difference} meses"
    elsif months_difference == 1
      "#{months_difference} mês"
    else
      "Menos de um mês"
    end
  end

  def rating_avg
    return unless object&.doctor

    object.doctor.reviews.average(:rating)
  end

  def image
    return unless object&.doctor&.user&.image&.attached?

    Rails.application.routes.url_helpers.rails_blob_path(object.doctor.user.image, only_path: true)
  end

  def doctor_description
    object&.doctor&.description
  end

  def reviews
    object&.doctor&.reviews || []
  end

  def specialty
    object&.doctor&.work_specialty&.name
  end

  def clinic_name
    object&.clinics&.first&.name
  end

  def clinic_id
    object&.clinics&.first&.id
  end

  def clinic_image
    clinic = object&.clinics&.first
    return unless clinic&.image&.attached?

    Rails.application.routes.url_helpers.rails_blob_path(clinic.image, only_path: true)
  end

  def clinic_address
    street = object&.clinics&.first&.address&.street
    number = object&.clinics&.first&.address&.number
    city = object&.clinics&.first&.address&.city
    "#{street} #{number}, #{city}"
  end

  def patients
    object&.doctor&.appointments&.where(status: :completed)&.size || 0
  end

  def appointments
    return [] unless object&.doctor
    Panko::ArraySerializer.new(
      object.doctor.appointments.where.not(status: :cancelled),
      each_serializer: IndexAppointmentsSerializer,
    ).to_a
  end

  def value
    object&.doctor&.price_cents || 0
  end
end
