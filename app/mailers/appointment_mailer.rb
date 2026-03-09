class AppointmentMailer < ApplicationMailer
  def confirmation_to_clinic
    @appointment = params[:appointment]
    return if @appointment.clinic.owner.blank?

    html_content = render_to_string(
      template: "appointment_mailer/confirmation_to_clinic",
      locals: { appointment: @appointment },
    )

    from = SendGrid::Email.new(email: ENV["SENDGRID_SENDER_EMAIL"], name: "contato")
    to = SendGrid::Email.new(email: @user.email, name: @user.name)
    subject = "Consulta marcada com sucesso!"
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

  def confirmation_to_patient
    @appointment = params[:appointment]

    html_content = render_to_string(
      template: "appointment_mailer/confirmation_to_clinic",
      locals: { appointment: @appointment },
    )

    from = SendGrid::Email.new(email: ENV["SENDGRID_SENDER_EMAIL"], name: "contato")
    to = SendGrid::Email.new(email: @user.email, name: @user.name)
    subject = "Consulta marcada com sucesso!"
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
