class WebhookPaymentsController < ApplicationController
  skip_before_action :require_authenticate
  skip_before_action :verify_authenticity_token

  def change_payment_status
    token = request.headers["HTTP_ASAAS_ACCESS_TOKEN"]
    return head :unauthorized unless token.present? && token == ENV['PAYMENT_SECURITY_TOKEN']

    Webhooks::ExternalPaymentJob.perform_later(
      InboundWebhook.create!(status: :pending, body: request.body.read)
    )

    head :ok
  end
end
