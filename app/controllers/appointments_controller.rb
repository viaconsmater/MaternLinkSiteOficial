class AppointmentsController < ApplicationController
  skip_before_action :verify_authenticity_token
  before_action -> { set_appointment }, only: :payment
  before_action -> { authorize! @appointment, with: AppointmentPolicy }

  def index
    respond_to do |format|
      format.html do
        @availabilities = current_user.doctor.doctor_availabilities
        @appointments = current_user.doctor.appointments.where.not(status: :cancelled)
        @pending = @appointments.where(status: :scheduled, date: Time.zone.now.all_day)
        @pagy, @done = pagy(current_user.doctor.appointments.where(status: [:completed, :cancelled]), items: 7)
        render inertia: "Appointments/Index", props: {
          doctor_availabilities: serialize(@availabilities, DoctorAvailabilitySerializer),
          appointments: serialize(@appointments, DoctorAppointmentsSerializer),
          pending_appointments: serialize(@pending, DoctorAppointmentsSerializer),
          done_appointments: serialize(@done, DoctorAppointmentsSerializer),
          pagy: @pagy,
        }
      end
      format.json do
        @pagy, @done = pagy(current_user.doctor.appointments.where(status: :completed), items: 7, page: params[:page])
        render json: {
          done_appointments: serialize(@done, DoctorAppointmentsSerializer),
          pagy: @pagy,
        }.to_json,
          status: :ok
      end
    end
  end

  def new
    doctor = serialize(User.find(params[:doctor_id]), ProfessionalSerializer)
    render inertia: "Appointments/new", props: {
      date: params[:date],
      time: params[:time],
      doctor: doctor,
      cards: serialize(current_user.credit_cards, CreditCardSerializer),
    }
  end

  def create_with_pix
    appointment_params = build_appointment_params(params, :pix)
    @appointment = Appointment.create!(appointment_params)
    puts @appointment.doctor
    payment_id = Payments.create_pix_transaction!(current_user, @appointment.doctor, appointment_params[:price_cents] / 100, true)
    @appointment.update!(external_payment_id: payment_id)

    redirect_to appointment_payment_path(@appointment)
  rescue StandardError => e
    redirect_to doctors_path, inertia: { errors: "Ocorreu um erro: #{e}" }
  end

  def create_with_credit_card
    Appointment.transaction do
      appointment_params = build_appointment_params(params, :credit_card)
      @appointment = Appointment.create!(appointment_params)
      payment_id = Payments.create_credit_card_transaction!(current_user, @appointment.doctor,appointment_params[:price_cents] / 100, true)
      @appointment.update!(external_payment_id: payment_id, payment_status: :processing)

      Payments.pay_credit_card(
        payment_id,
        params[:payment_info][:cardId] ? {
          creditCardToken: current_user.credit_cards.find(params[:payment_info][:cardId]).credit_card_token,
        } : params[:payment_info],
      )

      redirect_to appointment_payment_path(@appointment)
    end
  rescue StandardError => e
    if params[:return_url]
      redirect_to params[:return_url], inertia: { errors: "Ocorreu um erro: #{e}" }
    else
      redirect_to doctors_path, inertia: { errors: "Ocorreu um erro: #{e}" }
    end
  end

  def payment
    qr_code = @appointment.pending? ? Payments.pix_qr_code(@appointment.external_payment_id) : {}
    render inertia: "Appointments/payment", props: {
      doctor: serialize(@appointment.doctor.user, ProfessionalSerializer),
      appointment: @appointment,
      qr_code: qr_code,
    }
  end

  private

  def set_appointment
    @appointment = Appointment.find(params[:id])
  end

  def build_appointment_params(params, payment_method)
    doctor = User.find(params[:doctor_user_id].to_i).doctor
    {
      patient: current_user.patient,
      doctor: doctor,
      date: Time.zone.parse(params[:date]),
      duration: Appointment::APPOINTMENT_DURATION,
      status: :scheduled,
      payment_status: :pending,
      clinic_id: params[:clinic_id].to_i,
      price_cents: doctor.price_cents.to_i,
      aditional_info: params[:aditional_info],
      payment_method: payment_method,
    }
  end
end
