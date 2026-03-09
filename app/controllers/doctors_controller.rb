class DoctorsController < ApplicationController
  include AddressesConcern

  skip_before_action :require_authenticate, only: :index
  before_action -> { authorize! with: DoctorPolicy }, except: :index

  def index
    @doctors = User.includes(doctor: [:work_specialty, :doctor_availabilities, :appointments], clinics: :address)
      .enabled.where(role: :doctor).filter_resource(params.slice(*User.filter_scopes))
    @doctors = @doctors.nearby(params[:latitude], params[:longitude]) if params[:latitude].present? && params[:longitude].present?

    respond_to do |format|
      format.html do
        @pagy, @professionals = pagy(@doctors, items: 10)
        render inertia: "Professional/Index", props: {
          initial_professionals: serialize(
            @professionals,
            ProfessionalSerializer,
          ),
          states_options: @states_options,
          cities_by_state_options: @cities_by_state,
          pagy: @pagy,
        }
      end

      format.json do
        @pagy, @professionals = sorted_professionals(@doctors, params[:sort])

        render json: { professionals: serialize(@professionals, ProfessionalSerializer), pagy: @pagy }.to_json,
          status: :ok
      end
    end
  end

  def income
    respond_to do |format|
      format.html do
        @pagy, @initial_appointments = pagy(
          current_user.doctor.appointments.where(status: :completed).order(date: :desc),
          items: 10,
        )
        initial_month_info = month_info(Time.zone.now)
        render inertia: "Doctor/income", props: {
          professional: serialize(current_user, IncomeSerializer),
          initial_appointments: serialize(@initial_appointments, DoctorAppointmentsSerializer),
          pagy: @pagy,
          initial_month_info: initial_month_info,
        }
      end
      format.json do
        if params[:date]
          month_info = month_info(Time.zone.parse(params[:date]))
          render json: month_info.to_json, status: :ok
        else
          @pagy, @appointments = pagy(
            current_user.doctor.appointments.where(status: :completed).order(date: :desc),
            items: 10,
            page: params[:page],
          )
          render json: serialize(@appointments, DoctorAppointmentsSerializer).to_json, status: :ok
        end
      end
    end
  end

  private

  def sorted_professionals(doctors, sort_order)
    if sort_order == "created_at"
      @doctors = @doctors.order(created_at: :asc)
    elsif sort_order == "alphabetical"
      @doctors = @doctors.order(name: :asc)
    elsif sort_order == "patients_count"
      @doctors = @doctors.left_joins(doctor: :appointments)
        .group(:id)
        .order("COUNT(appointments.id) DESC")
    end
    @pagy, @professionals = pagy(@doctors, items: 10, page: params[:page].to_i)
  end

  def month_info(date)
    last_month_date = date - 1.month
    {
      monthly_income: current_user.doctor.monthly_income(date.month, date.year),
      monthly_pending_income: current_user.doctor.monthly_pending_income(date.month, date.year),
      monthly_appointments: current_user.doctor.monthly_appointments(date.month, date.year),
      monthly_new_patients: current_user.doctor.monthly_new_patients(date.month, date.year),
      last_income: current_user.doctor.monthly_income(last_month_date.month, last_month_date.year),
      last_pending_income: current_user.doctor.monthly_pending_income(last_month_date.month, last_month_date.year),
      last_appointments: current_user.doctor.monthly_appointments(last_month_date.month, last_month_date.year),
      last_new_patients: current_user.doctor.monthly_new_patients(last_month_date.month, last_month_date.year),
    }
  end
end
