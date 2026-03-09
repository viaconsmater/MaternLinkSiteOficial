class PatientsController < ApplicationController
  before_action -> { authorize! with: PatientPolicy }

  def appointments
    respond_to do |format|
      format.html do
        @next_appointments = current_user.patient.appointments.where(status: :scheduled).order(date: :asc)
        @pagy, @appointment_history = pagy(
          current_user.patient.appointments.where(status: [:completed, :cancelled]).order(date: :desc),
          items: 5,
        )
        render inertia: "Patients/appointments", props: {
          appointment_history: serialize(@appointment_history, PatientAppointmentsSerializer),
          next_appointments: @next_appointments && serialize(@next_appointments, PatientAppointmentsSerializer),
          pagy: @pagy,
        }
      end
      format.json do
        @pagy, @appointment_history = pagy(
          current_user.patient.appointments.where(status: :completed).order(date: :desc),
          items: 5,
          page: params[:page],
        )
        render json: serialize(@appointment_history, PatientAppointmentsSerializer).to_json, status: :ok
      end
    end
  rescue StandardError => e
    respond_to do |format|
      format.html do
        redirect_to root_path, inertia: { errors: e }
      end
      format.json do
        render json: e, status: :unprocessable_entity
      end
    end
  end
end
