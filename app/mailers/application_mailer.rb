class ApplicationMailer < ActionMailer::Base
  default from: Rails.application.credentials.dig(
    :sendgrid,
    :sender_email,
  ) || ENV.fetch("SENDGRID_SENDER_EMAIL", "viaconsmater@gmail.com")
  layout "mailer"
end
