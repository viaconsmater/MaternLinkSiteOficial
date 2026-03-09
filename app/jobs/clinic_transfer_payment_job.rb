class ClinicTransferPaymentJob < ApplicationJob
  queue_as :default

  def perform(appointment_id)
    appointment = Appointment.find(appointment_id)

    not_paid = appointment.processing? && !(appointment.transfer_status == "success")

    raise "Appoint already transferred to clinic" unless not_paid

    Payments.pay_clinic(appointment)
  end
end
