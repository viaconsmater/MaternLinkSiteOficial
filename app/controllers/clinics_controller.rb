class ClinicsController < ApplicationController
  skip_before_action :verify_authenticity_token
  before_action -> { set_clinic }
  before_action -> { authorize! @clinic, with: ClinicPolicy }, except: [:appointments, :my_clinic]

  def my_clinic
    return redirect_to root_path, inertia: { errors: "Você não possui uma clínica associada" } unless @clinic

    respond_to do |format|
      format.html do
        render inertia: "Team/Index", props: {
          clinic: serialize(@clinic, ClinicSerializer),
        }
      end
      format.json do
        date = Time.zone.parse(params[:date])
        last_month = date - 1.month
        month_info = {
          monthly_income: @clinic.monthly_income(date.month, date.year),
          monthly_appointments: @clinic.monthly_appointments(date.month, date.year),
          monthly_new_patients: @clinic.monthly_new_patients(date.month, date.year),
          last_income: @clinic.monthly_income(last_month.month, last_month.year),
          last_appointments: @clinic.monthly_appointments(last_month.month, last_month.year),
          last_new_patients: @clinic.monthly_new_patients(last_month.month, last_month.year),
        }
        render json: month_info.to_json, status: :ok
      end
    end
  end

  def new_doctor
    return redirect_to root_path, inertia: { errors: "Você não possui uma clínica associada" } unless @clinic

    areas = WorkArea.pluck(:name, :id).map do |a|
      { label: a[0], value: a[1] }
    end
    render inertia: "Team/New", props: {
      area_options: areas,
      clinic: serialize(@clinic, ClinicSerializer),
    }
  end

  def create_doctor
    params[:password] = SecureRandom.base58 if params[:provider].present?
    User.create!(doctor_params)

    send_register_email

    head :created
  rescue StandardError => e
    render json: e, status: :unprocessable_entity
  end

  def attach_image
    return redirect_to root_path, inertia: { errors: "Você não possui uma clínica associada" } unless @clinic

    @clinic.image.attach(params[:image])
    @clinic.save!(validate: false)
    redirect_to profiles_path
  rescue StandardError => e
    redirect_to profiles_path, inertia: { errors: e }
  end

  def appointments
    @user = User.includes(:doctor).find(params[:id])
    authorize! @user, with: ClinicPolicy
    respond_to do |format|
      format.html do
        @doctor_options = @clinic.users.where(role: :doctor).map do |doctor|
          {
            label: doctor.name,
            value: doctor.id,
          }
        end
        @availabilities = @user.doctor.doctor_availabilities
        @appointments = @user.doctor.appointments.where.not(status: :cancelled)
        @pending = @appointments.where(status: :pending, date: Time.zone.now.all_day)
        @pagy, @done = pagy(@user.doctor.appointments.where.not(status: :pending), items: 7)
        render inertia: "Team/Appointments", props: {
          doctor: serialize(@user, SimplifiedProfessionalSerializer),
          doctor_options: @doctor_options,
          doctor_availabilities: serialize(@availabilities, DoctorAvailabilitySerializer),
          appointments: serialize(@appointments, DoctorAppointmentsSerializer),
          pending_appointments: serialize(@pending, DoctorAppointmentsSerializer),
          done_appointments: serialize(@done, DoctorAppointmentsSerializer),
          pagy: @pagy,
        }
      end
      format.json do
        @pagy, @done = pagy(@user.doctor.appointments.where.not(status: :pending), items: 7, page: params[:page])
        render json: {
          done_appointments: serialize(@done, DoctorAppointmentsSerializer),
          pagy: @pagy,
        }.to_json,
          status: :ok
      end
    end
  end

  private

  def set_clinic
    clinic = current_user.clinics.first
    @clinic = clinic if clinic.present?
  end

  def doctor_params
    params.permit([
      :name,
      :email,
      :password,
      :phone,
      :role,
      :cpf,
      :gender,
      :birthdate,
      clinic_ids: [],
      address_attributes: [
        :cep,
        :city,
        :state,
        :street,
        :number,
        :neighborhood,
        :latitude,
        :longitude
      ],
      doctor_attributes: [
        :council,
        :work_area_id,
        :work_specialty_id,
      ],
    ])
  end

  def send_register_email
    UserMailer.with(user: @user).register_email.deliver_later
  end
end
