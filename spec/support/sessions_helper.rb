module SessionsHelper
  def user_login(user)
    session = user.sessions.create!
    my_cookies = ActionDispatch::Request.new(Rails.application.env_config.deep_dup).cookie_jar
    my_cookies.signed[:session_token] = { value: session.id, httponly: true }
    cookies[:session_token] = my_cookies[:session_token]
  end
end
