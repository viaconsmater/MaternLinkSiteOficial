class SimplifiedProfessionalSerializer < ApplicationSerializer
  attributes :id,
    :name,
    :image,
    :specialty,
    :state

  def image
    return nil unless object.image.attached?
    Rails.application.routes.url_helpers.rails_blob_path(object.image, only_path: true)
  end

  def specialty
    object.doctor&.work_specialty&.name
  end

  def state
    return if object.doctor.appointments.where(status: :scheduled).empty?

    next_appointment = object.doctor.appointments.where(status: :scheduled).min_by do |appointment|
      (Time.zone.now - appointment.date).abs
    end
    if object.doctor.appointments.any? do |appointment|
      Time.zone.now.between?(appointment.date, appointment.date + appointment.duration.minutes)
    end
      "working"
    else
      next_appointment.date
    end
  end
end
