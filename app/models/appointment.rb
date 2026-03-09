class Appointment < ApplicationRecord
  belongs_to :patient
  belongs_to :doctor
  belongs_to :clinic

  APPOINTMENT_DURATION = 30
  HOUR_LIMIT_TO_SCHEDULE = 2.hours
  TIME_LIMIT_TO_PAY = 15.minutes

  accepts_nested_attributes_for :patient

  # scheduled: A consulta foi agendada e ainda não ocorreu
  # ongoing: A consulta foi iniciada porém ainda não terminou
  # completed: A consulta chegou ao fim
  # cancelled: A consulta foi cancelada (ocorre também quando o pagamento não é realizado)
  enum status: { scheduled: 0, completed: 1, cancelled: 2, ongoing: 3 }

  # pending: Aguardando Pagamento
  # processing: Pagamento realizado, aguardando transferencia à clinica
  # paid: Pagamento e Transferencia realizados
  enum payment_status: { pending: 0, processing: 1, paid: 2, payment_cancelled: 3, error: 4 }

  # waiting: Estado inicial, o pagamento pode ter ocorrido mas a transferência ainda não ocorreu
  # success: A transferência para a clínica foi bem sucedida
  # failure: A transferência para a clínica falhou, porém o pagamento pode ter funcionado
  enum transfer_status: { waiting: 0, success: 1, failure: 2 }

  enum payment_method: { pix: 0, credit_card: 1 }

  before_save :set_duration
  after_create :schedule_update_payment_status_job
  after_commit :schedule_update_status_job
  validates :date, :status, :price_cents, presence: true
  validates :external_payment_id, uniqueness: true, allow_nil: true
  validates :external_clinic_payment_id, uniqueness: true, allow_nil: true
  validate :check_start_datetime, on: :create
  validate :check_overlap, on: :create
  validate :check_availability, on: :create

  # Notification and clinic transfer
  after_update if: :transfer_status_previously_changed? do
    if success?
      AppointmentMailer.with(appointment: self).confirmation_to_clinic.deliver_later
      AppointmentMailer.with(appointment: self).confirmation_to_patient.deliver_later
      ClinicTransferPaymentJob.perform_later(id)
    end
  end

  scope :not_real_cancelled, -> { where.not(status: :cancelled).where.not(payment_status: :cancelled) }
  scope :future, -> { where(date: Time.zone.now..) }
  scope :by_date, ->(month, year) {
    month_start = Time.zone.parse("1/#{month}/#{year}")
    month_end = month_start.end_of_month
    where(date: month_start..month_end, status: [:scheduled, :completed])
  }

  def end_date_time
    date + duration.minutes
  end

  def clinic_status
    if success?
      "Recebido"
    elsif waiting?
      "Aguardando"
    else
      "Erro"
    end
  end

  def maternlink_status
    if pending?
      "Aguardando"
    elsif processing?
      "Em Processamento"
    elsif paid?
      "Pago"
    elsif payment_cancelled?
      "Cancelado"
    else
      "Erro"
    end
  end

  private

  def check_overlap
    unless doctor
      errors.add(:base, "Doctor needed")
      return
    end
    if date
      current_range = date.change(usec: 0)...(date.change(usec: 0) + APPOINTMENT_DURATION.minutes)
      has_overlap = doctor.appointments.future.not_real_cancelled.any? do |appointment|
        appointment_start_date = appointment.date.change(usec: 0)
        appointment_range = appointment_start_date...(appointment_start_date + appointment.duration.minutes)
        appointment_range.overlaps?(current_range)
      end
      if has_overlap
        errors.add(:base, "Esse horário já está ocupado por atendimento")
      end
    end
  end

  def check_availability
    unless doctor
      errors.add(:base, "Doctor needed")
      return
    end
    unless date
      errors.add(:base, "Date needed")
      return
    end
    # TODO: Fix day of week logic
    has_availability =
      doctor.doctor_availabilities.where(day_of_week: date.wday - 1 >= 0 ? date.wday - 1 : 6).any? do |availability|
        checked_time = Time.zone.parse(date.strftime("%H:%M:%S"))
        checked_time.between?(
          Time.zone.parse(availability.start_time.strftime("%H:%M:%S")),
          Time.zone.parse(availability.end_time.strftime("%H:%M:%S")),
        )
      end
    unless has_availability
      errors.add(:base, "Esse horário não está disponível")
    end
  end

  def check_start_datetime
    if date && date < Time.zone.now + HOUR_LIMIT_TO_SCHEDULE
      errors.add(
        :base,
        "Não é possível agendar uma consulta para um horário anterior ao
        atual ou com menos de #{HOUR_LIMIT_TO_SCHEDULE.in_hours.to_i} horas de antecedência.",
      )
    end
  end

  def set_duration
    self.duration = APPOINTMENT_DURATION
  end

  def schedule_update_status_job
    if previous_changes[:date] || previously_new_record?
      UpdateAppointmentStatusJob.set(wait_until: date).perform_later(id)
      UpdateAppointmentStatusJob.set(wait_until: end_date_time).perform_later(id)
    end
  end

  def schedule_update_payment_status_job
    UpdateAppointmentPaymentStatusJob.set(wait_until: Time.zone.now + TIME_LIMIT_TO_PAY).perform_later(id)
  end
end
