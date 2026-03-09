class DoctorAvailabilitiesController < ApplicationController
  before_action -> { set_user }
  before_action -> { authorize! @user, with: DoctorPolicy }
  def create
    DoctorAvailability.transaction do
      # Delete previous availabilities
      @user.doctor.doctor_availabilities.destroy_all

      params[:availability].each do |day, data|
        next unless data

        data.each do |period|
          start_time = Time.zone.parse(period[:startTime])
          end_time = Time.zone.parse(period[:endTime])

          start_time = start_time.change(year: 1970, month: 1, day: 1)
          end_time = end_time.change(year: 1970, month: 1, day: 1)

          DoctorAvailability.create!(
            doctor: @user.doctor,
            start_time: start_time,
            end_time: end_time,
            day_of_week: day.to_i,
          )
        end
      end
    end

    if @user.id == current_user.id
      redirect_to appointments_path
    else
      redirect_to "/clinica/informacoes_consultas/#{@user.id}"
    end
  rescue StandardError => e
    redirect_to appointments_path, inertia: { errors: e }
  end

  private

  def set_user
    @user = User.find(params[:user_id])
  end
end
