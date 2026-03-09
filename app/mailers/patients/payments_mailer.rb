module Patients
  class PaymentsMailer < ApplicationMailer
    default from: "viaconsmater@gmail.com"

    def confirmation
      @budget = params[:budget]
      @user = params[:user]

      html_content = render_to_string(
        template: "patients/payments_mailer/confirmation",
        locals: { user: @user, budget: @budget },
      )

      from = SendGrid::Email.new(email: ENV["SENDGRID_SENDER_EMAIL"], name: "contato")
      to = SendGrid::Email.new(email: @user.email, name: @user.name)
      subject = "Confirmação de pagamento"
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
