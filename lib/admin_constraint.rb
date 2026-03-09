class AdminConstraint
  def matches?(request)
    session_record = if request.cookie_jar.signed[:session_token]
      Session.find_by(id: request.cookie_jar.signed[:session_token])
    end
    session_record&.user&.admin?
  end
end
