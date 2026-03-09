class SessionsController < ApplicationController
  skip_before_action :require_authenticate, only: [:new, :create]
  skip_before_action :block_admin

  def new
    render inertia: "sessions/new"
  end

  def create
    user = User.find_by(email: params[:email])

    if user&.authenticate(params[:password]) && user.enabled
      @session = user.sessions.create!
      token = { value: @session.id, httponly: true }
      params[:remember] ? cookies.signed.permanent[:session_token] = token : cookies.signed[:session_token] = token
      if user.manager?
        redirect_to my_clinic_path
      elsif user.doctor?
        redirect_to appointments_path
      elsif user.patient?
        redirect_to patient_appointments_path
      else
        redirect_to root_path
      end
    else
      redirect_to login_path, inertia: {
        errors: "Credenciais inválidas. Por favor, verifique e tente novamente,
        ou registre-se para criar uma conta.",
      }
    end
  end

  def destroy
    @session = Current.session
    @session&.destroy
    redirect_to root_path
  end
end
