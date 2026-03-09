source "https://rubygems.org"

ruby "3.3.5"

# Bundle edge Rails instead: gem "rails", github: "rails/rails", branch: "main"
gem "rails", "~> 7.1.3", ">= 7.1.3.2"

# The modern asset pipeline for Rails [https://github.com/rails/propshaft]
gem "propshaft"

# Use sqlite3 as the database for Active Record
gem "pg"

# Use the Puma web server [https://github.com/puma/puma]
gem "puma", ">= 5.0"

# Build JSON APIs with ease [https://github.com/rails/jbuilder]
gem "jbuilder"

# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
gem "tzinfo-data", platforms: [:windows, :jruby]

# Reduces boot times through caching; required in config/boot.rb
gem "bootsnap", require: false

group :development, :test do
  # See https://guides.rubyonrails.org/debugging_rails_applications.html#debugging-with-the-debug-gem
  gem "debug", platforms: [:mri, :windows]
  gem "rspec-rails"
  gem "factory_bot_rails"
  gem "switchcop"
  gem "simplecov"
  gem "faker"
  gem 'pry', '~> 0.14.2'

  # System testing framework
  gem "capybara", "~> 3.38.0"
  gem "cuprite"
  gem "puffing-billy"
  # Library for stubbing and setting expectations on HTTP requests in Ruby.
  gem "webmock"
  gem 'dotenv-rails', require: 'dotenv/load'
  gem 'rubocop-rails', require: false
end

group :development do
  # Use console on exceptions pages [https://github.com/rails/web-console]
  gem "web-console"
end

gem "vite_rails"
gem "vitepress-rails"
gem "inertia_rails"
gem "avo"
gem "figaro"

#  High Performance JSON Serialization for ActiveRecord & Ruby Objects
gem "panko_serializer"

# Authorization framework for Ruby/Rails applications
gem "action_policy"

# An authentication system generator for Rails applications.
gem "authentication-zero"
# Use Active Model has_secure_password [https://guides.rubyonrails.org/active_model_basics.html#securepassword]
gem "bcrypt", "~> 3.1.7"

# Twilio SendGrid Web API v3 via Ruby used here to send emails
gem "sendgrid-ruby"

# Makes http fun again! Ain't no party like a httparty, because a httparty don't stop.
gem "httparty"

gem "rest-api-generator"

# This gem does some CPF/CNPJ magic. It allows you to create, validate and format CPF/CNPJ
gem "cpf_cnpj"

# Pagination gem
gem "pagy"

gem "good_job", "~> 3.26"

# Thruster is an HTTP/2 proxy for simple production-ready deployments of Rails applications.
gem "thruster"

# Active storage bucket
gem "aws-sdk-s3"
