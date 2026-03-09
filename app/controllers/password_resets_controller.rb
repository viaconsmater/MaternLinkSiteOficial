class PasswordResetsController < ApplicationController
  skip_before_action :require_authenticate
  skip_before_action :block_admin

  def step_one
    render inertia: "reset_password/stepOne"
  end

  # Second Step - Use the code in email
  def create
    @user = User.find_by!(email: params[:email]) # This will raise if user not found
    logger.debug "User found: #{@user.inspect}" # Add this for debugging

    send_reset_password_instructions

    @signed_id = @user.password_reset_tokens.last.signed_id(expires_in: 20.minutes)

    redirect_to reset_password_step_two_path(sid: @signed_id)
  rescue ActiveRecord::RecordNotFound
    redirect_to reset_password_step_one_path,
      inertia: { errors: "Ocorreu um erro: não foi possível encontrar usuário com o email: #{params[:email]}" }
  rescue => e
    # Log the error for debugging
    logger.error("Error occurred: #{e.message}")
    redirect_to reset_password_step_one_path,
      inertia: { errors: "Ocorreu um erro desconhecido." }
  end

  def step_two
    if params[:sid]
      render inertia: "reset_password/stepTwo", props: { sid: params[:sid] }
    else
      redirect_to reset_password_step_one_path
    end
  end

  # Third Step - Edit password
  def check_code
    token = PasswordResetToken.find_signed!(params[:sid])
    if token.code == params[:code].to_i
      redirect_to reset_password_step_three_path(sid: params[:sid], code: params[:code])
    else
      redirect_to reset_password_step_two_path(sid: params[:sid]), inertia: { errors: "O código fornecido está errado" }
    end
  rescue => e
    redirect_to reset_password_step_two_path(sid: params[:sid]), inertia: { errors: "Ocorreu um erro: #{e}" }
  end

  def step_three
    if params[:sid] && params[:code]
      render inertia: "reset_password/stepThree", props: { sid: params[:sid], code: params[:code] }
    else
      redirect_to reset_password_step_two_path(sid: params[:sid])
    end
  end

  # Fourth Step - Update password
  def update
    token = PasswordResetToken.find_signed!(params[:sid])
    if token.code == params[:code].to_i
      token.user.update!(password: params[:password])
      redirect_to reset_password_step_four_path
    else
      redirect_to reset_password_step_two_path(sid: params[:sid], code: params[:code])
    end
  rescue => e
    redirect_to reset_password_step_three_path(sid: params[:sid], code: params[:code]),
      inertia: { errors: "Ocorreu um erro: #{e}" }
  end

  def step_four
    render inertia: "reset_password/stepFour"
  end

  private

  def send_reset_password_instructions
    UserMailer.with(user: @user).password_reset.deliver_now
  end
end
