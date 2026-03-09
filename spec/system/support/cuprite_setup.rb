# Cuprite is a modern Capybara driver which uses Chrome CDP API
# instead of Selenium & co.
# See https://github.com/rubycdp/cuprite
require "billy/capybara/rspec"

remote_chrome_url = ENV["CHROME_URL"]

REMOTE_CHROME_URL = remote_chrome_url
REMOTE_CHROME_HOST, REMOTE_CHROME_PORT =
  if REMOTE_CHROME_URL
    URI.parse(REMOTE_CHROME_URL).yield_self do |uri|
      [uri.host, uri.port]
    end
  end

# Check whether the remote chrome is running and configure the Capybara
# driver for it.
remote_chrome =
  begin
    if REMOTE_CHROME_URL.nil?
      false
    else
      Socket.tcp(REMOTE_CHROME_HOST, REMOTE_CHROME_PORT, connect_timeout: 1).close
      true
    end
  rescue Errno::ECONNREFUSED, Errno::EHOSTUNREACH, SocketError
    false
  end

remote_options = remote_chrome ? { url: REMOTE_CHROME_URL } : {}

require "capybara/cuprite"

Capybara.register_driver(:better_cuprite) do |app|
  driver = Capybara::Cuprite::Driver.new(
    app,
    {
      window_size: [1200, 800],
      timeout: 15,
      process_timeout: 15,
      pending_connection_errors: true,
      url_blacklist: [/fonts.gstatic.com/, /fonts.googleapis.com/],
      browser_options: remote_chrome ? { "no-sandbox": nil } : { "ignore-certificate-errors": true },
      inspector: true,
      headless: !ENV["HEADLESS"].in?(["n", "0", "no", "false"]),
    }.merge(remote_options),
  )
  driver.set_proxy(Billy.proxy.host, Billy.proxy.port)
  driver
end

Capybara.default_driver = Capybara.javascript_driver = :better_cuprite

server = Capybara.current_session.server

# rubocop:disable Naming/InclusiveLanguage
Billy.config.whitelist = ["#{server.host}:#{server.port}"]
# rubocop:enable Naming/InclusiveLanguage

# Add shortcuts for cuprite-specific debugging helpers
module CupriteHelpers
  def pause
    page.driver.pause
  end

  def debug(binding = nil)
    $stdout.puts "🔎 Open Chrome inspector at http://localhost:3333"
    return binding.break if binding

    page.driver.pause
  end
end

RSpec.configure do |config|
  config.include CupriteHelpers, type: :system
end
