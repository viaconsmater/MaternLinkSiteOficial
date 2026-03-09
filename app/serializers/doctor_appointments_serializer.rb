class DoctorAppointmentsSerializer < ApplicationSerializer
  attributes :id,
    :date,
    :duration,
    :status,
    :payment_status,
    :transfer_status,
    :payment_method,
    :patient_name,
    :patient_gender,
    :patient_age,
    :price_cents,
    :transfer_value_cents,
    :aditional_info,
    :location,
    :end_date,
    :approximate_start_time,
    :approximate_end_time,
    :updated_at

  def patient_name
    object.patient.user.name
  end

  def patient_gender
    object.patient.user.translated_gender
  end

  def patient_age
    object.patient.user.age
  end

  def location
    "#{object.clinic.address.street}, #{object.clinic.address.number}"
  end

  def end_date
    object.date + object.duration.minutes
  end

  def approximate_start_time
    if object.date.min >= 30
      object.date.strftime("%k:30")
    else
      object.date.strftime("%k:00")
    end
  end

  def approximate_end_time
    date = object.date + object.duration.minutes
    if date.min >= 30
      date.strftime("%H:30")
    else
      date.strftime("%H:00")
    end
  end
end
