class ContactingUsersController < ApplicationController
  skip_before_action :require_authenticate
  skip_before_action :verify_authenticity_token, only: [:create]
  skip_before_action :block_admin

  def create
    ContactingUser.create!(contacting_user_params)
    head :created
  rescue StandardError => e
    render json: e, status: :unprocessable_entity
  end

  private

  def contacting_user_params
    params.permit(:name, :email, :phone)
  end
end
