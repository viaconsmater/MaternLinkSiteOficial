module BetterRailsSystemTests
  # Use relative path in screenshot message to make it clickable in VS Code when running in Docker
  def image_path
    Pathname.new(absolute_image_path).relative_path_from(Rails.root).to_s
  end

  # Make failure screenshots compatible with multi-session setup
  # def take_screenshot
  #   return super unless Capybara.last_used_session
  #   Capybara.using_session(Capybara.last_used_session) { super }
  # end

  # Convert dom_id to selector
  def dom_id(*args)
    "##{super}"
  end

  def fill_in_select(field_selector, select_option)
    find("span", text: field_selector).click
    within "div[role='listbox']" do
      find("span", text: select_option).click
    end
  end

  def login_user(user)
    session = user.sessions.create!
    my_cookies = ActionDispatch::Request.new(Rails.application.env_config.deep_dup).cookie_jar
    my_cookies.signed[:session_token] = { value: session.id, httponly: true }
    page.driver.set_cookie(:session_token, my_cookies[:session_token])
  end
end

RSpec.configure do |config|
  # Add #dom_id support
  config.include ActionView::RecordIdentifier, type: :system
  config.include BetterRailsSystemTests, type: :system

  # Make urls in mailers contain the correct server host
  # config.around(:each, type: :system) do |ex|
  #   was_host, Rails.application.default_url_options[:host] =
  #     Rails.application.default_url_options[:host], Capybara.server_host
  #   ex.run
  #   Rails.application.default_url_options[:host] = was_host
  # end

  # Make sure this hook runs before others
  config.prepend_before(:each, type: :system) do
    # Use JS driver always
    driven_by Capybara.javascript_driver
  end
end
