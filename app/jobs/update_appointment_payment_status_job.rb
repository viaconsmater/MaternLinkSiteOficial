class UpdateAppointmentPaymentStatusJob < ApplicationJob
  queue_as :default

  def perform(appointment_id)
    appointment = Appointment.find(appointment_id)

    if appointment.pending?
      appointment.update!(payment_status: :payment_cancelled, status: :cancelled)
    end
  end
end
