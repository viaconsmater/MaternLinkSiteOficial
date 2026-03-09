class Webhooks::ExternalPaymentJob < ApplicationJob
  queue_as :default

  def perform(inbound_webhook)
    webhook_payload = JSON.parse(inbound_webhook.body, symbolize_names: true)

    appointment = Appointment.find_by(external_payment_id: webhook_payload[:payment][:id])
    payment = Payment.find_by(transaction_id: webhook_payload[:payment][:id])

    return inbound_webhook.update!(status: :skipped) if appointment.nil? && payment.nil?

    if webhook_payload[:event] == "PAYMENT_CONFIRMED"
      ActiveRecord::Base.transaction do
        appointment.update!(payment_status: :processing, transfer_status: :waiting)
        inbound_webhook.update!(status: :processed)
      end
    elsif webhook_payload[:event] == "PAYMENT_REFUNDED"
      ActiveRecord::Base.transaction do
        if payment.present?
          payment.update!(status: :refunded, transfer_status: :waiting)
          payment.payable.update!(status: :cancelled)
        end
      end
    elsif webhook_payload[:event] == "PAYMENT_RECEIVED"
      ActiveRecord::Base.transaction do
        if payment.present?
          payment.update!(status: :paid, transfer_status: :waiting)
          payment.payable.update!(status: :accepted)
          #atualiza a clínica para o split de pagamento
          payment.payable.clinic.owner.update!(split_enabled: true)

          ::Patients::PaymentsMailer
            .with(budget: payment.payable.budget, user: payment.payable.user)
            .confirmation
            .deliver_now

          ::Clinics::PaymentsMailer
            .with(budget: payment.payable, clinic: payment.payable.clinic)
            .confirmation
            .deliver_now
        end

        appointment.update!(payment_status: :processing, transfer_status: :success) if appointment.present?
        inbound_webhook.update!(status: :processed)
      end
    elsif webhook_payload[:event] == "PAYMENT_OVERDUE" || webhook_payload[:event] == "PAYMENT_DELETED"
      ActiveRecord::Base.transaction do
        appointment.update!(payment_status: :payment_cancelled, status: :cancelled)
        inbound_webhook.update!(status: :processed)
      end
    else
      inbound_webhook.update!(status: :skipped)
    end
  end
end
