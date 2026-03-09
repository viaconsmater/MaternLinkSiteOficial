module Patients
  class BudgetsMailer < ApplicationMailer
    default from: "viaconsmater@gmail.com"

    def confirmation_requested
      @budget = params[:budget]
      @user = params[:user]

      html_content = render_to_string(
        template: "patients/budgets_mailer/confirmation_requested",
        locals: { budget: @budget, user: @user },
      )

      from = SendGrid::Email.new(email: ENV["SENDGRID_SENDER_EMAIL"], name: "contato")
      to = SendGrid::Email.new(email: @user.email, name: @user.name)
      subject = "Confirmação de envio: #{@budget.id}"
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

    def budget_return
      @budget = params[:budget]
      @user = params[:user]
      @clinic = params[:clinic]

      html_content = render_to_string(
        template: "patients/budgets_mailer/budget_return",
        locals: { budget: @budget, user: @user, clinic: @clinic },
      )

      from = SendGrid::Email.new(email: ENV["SENDGRID_SENDER_EMAIL"], name: "contato")
      to = SendGrid::Email.new(email: @user.email, name: @user.name)
      subject = "Orçamento recebido da clinica: #{@clinic.name}"
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
