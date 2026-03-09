class ErrorsController < ApplicationController
  skip_before_action :require_authenticate # Skip Devise authentication for error pages

  def not_found
    render file: Rails.public_path.join("404.html").to_s, status: :not_found, layout: false
  end
end
