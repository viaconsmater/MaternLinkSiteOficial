module Clinics
  class PaymentsMailer < ApplicationMailer
    default from: "viaconsmater@gmail.com"

    def confirmation
      @budget = params[:budget]
      @clinic = params[:clinic]
      owner = @clinic.users.first

      mail(to: owner.email, subject: "Orçamento Aceito")
      html_content = render_to_string(
        template: "patients/budgets_mailer/confirmation_requested",
        locals: { budget: @budget, clinic: @clinic },
      )

      from = SendGrid::Email.new(email: ENV["SENDGRID_SENDER_EMAIL"], name: "contato")
      to = SendGrid::Email.new(email: @owner.email, name: @owner.name)
      subject = "Orçamento Aceito"
      content = SendGrid::Content.new(
        type: "text/html",
        value: html_content,
      )
      mail = SendGrid::Mail.new(from, subject, to, content)
      sg = SendGrid::API.new(api_key: ENV["SENDGRID_API_KEY"])

      # Send an HTTP POST request to /mail/send
      response = sg.client.mail._("send").post(request_body: mail.to_json)
      Rails.logger.debug response.status_code
      Rails.logger.debug response.headers
    end
  end
end
