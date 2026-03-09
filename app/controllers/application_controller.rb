class ApplicationController < ActionController::Base
  include ActiveStorage::SetCurrent
  include Pagy::Backend
  before_action :set_current_request_details
  before_action :authenticate
  before_action :require_authenticate
  before_action :block_admin

  inertia_share currentUser: -> { Current.user ? serialize(Current.user, CurrentUserSerializer) : nil }

  rescue_from(ActionPolicy::Unauthorized) do |e|
    message = e.result.reasons.full_messages
    handle_unauthorized(message)
  end

  def handle_unauthorized(message)
    message = "Você não possui acesso à esse recurso" if message.blank?
    respond_to do |format|
      format.html do
        redirect_to root_path, inertia: { errors: message }
      end
      format.json { render json: { errors: message }, status: :unauthorized }
    end
  end

  def current_user
    Current.user
  end

  private

  # @param resource [ActiveRecord::Base, Array<ActiveRecord::Base>, ActiveRecord::Relation]
  # @param serializer_class [Class]
  def serialize(resource, serializer_class)
    if resource.respond_to?(:length)
      Panko::ArraySerializer.new(resource, each_serializer: serializer_class).to_a
    else
      serializer_class.new.serialize(resource)
    end
  end

  def authenticate
    session_record = cookies.signed[:session_token] ? Session.find_by(id: cookies.signed[:session_token]) : nil
    if session_record
      Current.session = session_record
      true
    else
      false
    end
  end

  def require_authenticate
    unless authenticate
      redirect_to root_path
    end
  end

  def block_admin
    if current_user&.admin?
      handle_unauthorized("Administradores não possuem acesso a este recurso")
    end
  end

  def set_current_request_details
    Current.user_agent = request.user_agent
    Current.ip_address = request.ip
  end

  def render_error(message, status = :unprocessable_entity)
    @message = message
    @status = status
    render 'shared/error', status: status
  end
end
