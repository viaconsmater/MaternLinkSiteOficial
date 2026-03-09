require "sendgrid-ruby"
include SendGrid

class UserMailer < ApplicationMailer
  # MARK: PASSWORD RESET EMAIL FUNCTION
  def password_reset
    @user = params[:user]
    @code = @user.password_reset_tokens.create!(code: rand(100_000..999_999)).code

    html_content = render_to_string(
      template: "user_mailer/password_reset",
      locals: { user: @user, code: @code },
    )

    from = SendGrid::Email.new(email: ENV["SENDGRID_SENDER_EMAIL"], name: "contato")
    to = SendGrid::Email.new(email: @user.email, name: @user.name)
    subject = "Alteração de Senha"
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

  # MARK: EMAIL VERIFICATION FUNCTION
  def email_verification
    @user = params[:user]
    @signed_id = @user.generate_token_for(:email_verification)

    html_content = render_to_string(
      template: "user_mailer/email_verification",
      locals: { user: @user, signed_id: @signed_id },
    )

    from = SendGrid::Email.new(email: ENV["SENDGRID_SENDER_EMAIL"], name: "contato")
    to = SendGrid::Email.new(email: @user.email, name: @user.name)
    subject = "Verificação de email"
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

  # MARK: REGISTER EMAIL FUNCTION
  def register_email
    @user = params[:user]

    html_content = render_to_string(
      template: "user_mailer/register_email",
    )

    from = SendGrid::Email.new(email: ENV["SENDGRID_SENDER_EMAIL"], name: "contato")
    to = SendGrid::Email.new(email: @user.email, name: @user.name)
    subject = "Cadastro concluido com sucesso"
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
