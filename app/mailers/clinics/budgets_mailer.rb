module Clinics
  class BudgetsMailer < ApplicationMailer
    default from: "viaconsmater@gmail.com"

    def requested
      @budget = params[:budget]
      @clinic = params[:clinic]

      html_content = render_to_string(
        template: "clinics/budgets_mailer/requested",
        locals: { budget: @budget, clinic: @clinic },
      )

      from = SendGrid::Email.new(email: ENV["SENDGRID_SENDER_EMAIL"], name: "contato")
      to = SendGrid::Email.new(email: @clinic.email, name: @clinic.name)
      subject = "Solicitação de orçamento: #{@budget.id}"
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

    def cancelled
      @budget = params[:budget]
      @clinic = params[:clinic]

      html_content = render_to_string(
        template: "clinics/budgets_mailer/cancelled",
        locals: { budget: @budget, clinic: @clinic },
      )

      from = SendGrid::Email.new(email: ENV["SENDGRID_SENDER_EMAIL"], name: "contato")
      to = SendGrid::Email.new(email: @clinic.email, name: @clinic.name)
      subject = "Cancelamento de orçamento: #{@budget.id}"
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
