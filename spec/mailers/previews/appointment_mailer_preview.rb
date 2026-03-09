# Create a preview for AppointmentMailer
require "factory_bot_rails"

class AppointmentMailerPreview < ActionMailer::Preview
  include FactoryBot::Syntax::Methods

  def confirmation_to_clinic
    clinic = build(:clinic, clinic_users: [build(:clinic_user, is_owner: true)])
    appointment = build(:appointment, clinic: clinic, date: 6.hours.from_now, status: :pending)
    AppointmentMailer.with(appointment: appointment).confirmation_to_clinic
  end

  def confirmation_to_patient
    appointment = build(:appointment, doctor: doctor, date: 6.hours.from_now, status: :pending)
    AppointmentMailer.with(appointment: appointment).confirmation_to_patient
  end
end
