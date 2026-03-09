class PatientAppointmentsSerializer < ApplicationSerializer
  attributes :id,
    :date,
    :duration,
    :status,
    :payment_status,
    :payment_method,
    :doctor_name,
    :doctor_age,
    :doctor_gender,
    :doctor_image,
    :doctor_id,
    :doctor_specialty,
    :price_cents,
    :aditional_info,
    :location,
    :approximate_start_time

  def doctor_name
    object.doctor.user.name
  end

  def doctor_gender
    object.doctor.user.translated_gender
  end

  def doctor_age
    object.doctor.user.age
  end

  def doctor_image
    #object.doctor.user.image.url
  end

  def doctor_id
      object.doctor.id
  end

  def doctor_specialty
    object.doctor.work_specialty.name
  end

  def location
    "#{object.clinic.address.street}, #{object.clinic.address.number}"
  end

  def approximate_start_time
    if object.date.min >= 30
      object.date.strftime("%k:30")
    else
      object.date.strftime("%k:00")
    end
  end
end
