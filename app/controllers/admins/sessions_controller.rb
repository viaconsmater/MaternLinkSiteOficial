class Admins::SessionsController < ApplicationController
  skip_before_action :require_authenticate, only: [:new, :create]

  def new
  end

  def create
    user = User.find_by(email: params[:email])

    if user&.authenticate(params[:password]) && user.admin?
      @session = user.sessions.create!
      cookies.signed.permanent[:session_token] = { value: @session.id, httponly: true }
      redirect_to avo_path
    else
      redirect_to admins_login_path, inertia: { errors: "Credenciais Inválidas" }
    end
  end

  def destroy
    @session = Current.session
    @session&.destroy
    redirect_to root_path
  end
end
