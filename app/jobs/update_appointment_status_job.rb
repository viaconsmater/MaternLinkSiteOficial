class UpdateAppointmentStatusJob < ApplicationJob
  queue_as :default

  def perform(appointment_id)
    appointment = Appointment.find(appointment_id)

    unless appointment.cancelled?
      if Time.zone.now > appointment.end_date_time
        appointment.update!(status: :completed)
      elsif Time.zone.now >= appointment.date
        appointment.update!(status: :ongoing)
      end
    end
  end
end
