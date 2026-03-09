class ConfigurationsController < ApplicationController
  skip_before_action :block_admin

  before_action -> { authorize! with: ConfigurationsPolicy }

  def plan
    render inertia: "Configuration/plan"
  end

  def password
    render inertia: "Configuration/Password"
  end

  def change_password
    if current_user&.authenticate(params[:current_password])
      if params[:new_password] == params[:confirm_new_password]
        current_user.update!(password: params[:new_password])
        if params[:end_sessions]
          destroy_session
          redirect_to root_path
        else
          redirect_to configurations_password_path
        end
      else
        redirect_to configurations_password_path,
          inertia: { errors: "As nova senha deve ser confirmada. Verifique se a confirmação é igual a nova senha." }
      end
    else
      redirect_to configurations_password_path,
        inertia: { errors: "Senha atual incorreta. Verifique e tente novamente" }
    end
  end

  private

  def destroy_session
    @session = Current.session
    @session&.destroy
  end
end
