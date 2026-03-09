class RegistrationsController < ApplicationController
  skip_before_action :require_authenticate
  skip_before_action :verify_authenticity_token, only: [:create]

  def new
    areas = WorkArea.pluck(:name, :id).map do |a|
      { label: a[0], value: a[1] }
    end
    render inertia: "registrations/new", props: {
      area_options: areas,
    }
  end

  def create
    params[:password] = SecureRandom.base58 if params[:provider].present?
    @user = if user_params[:role] == "patient" || user_params[:role] == "manager"
      User.create!(user_params)
    elsif user_params[:role] == "doctor"
      User.create!(doctor_params)
    end

    if user_params[:role] == "patient"
      Patient.create!(user: @user)
    end

    if user_params[:role] == "doctor" || user_params[:role] == "manager"
      @clinic = Clinic.create!(clinic_params.merge({ address: @user.address }))
      ClinicUser.create!(clinic: @clinic, user: @user, is_owner: true)
    end
    send_register_email

    session_record = @user.sessions.create!
    cookies.signed.permanent[:session_token] = { value: session_record.id, httponly: true }
    head :created
  rescue StandardError => e
    render json: e, status: :unprocessable_entity
  end

  private

  def common_params
    [
      :name,
      :email,
      :password,
      :phone,
      :role,
      :cpf,
      :gender,
      :birthdate,
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
    ]
  end

  def doctor_specific_params
    [
      doctor_attributes: [
        :council,
        :work_area_id,
        :work_specialty_id,
        :price_cents,
      ],
    ]
  end

  def clinic_params
    params.require(:clinics_attributes).permit(
      :cnpj,
      :description,
      :name,
      :pix_key,
      :pix_type,
      :exam_enabled,
    )
  end

  def user_params
    params.permit(*common_params)
  end

  def doctor_params
    params.permit(*common_params, *doctor_specific_params)
  end

  def send_register_email
    UserMailer.with(user: @user).register_email.deliver_later
  end
end
