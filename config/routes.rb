Rails.application.routes.draw do
  mount Avo::Engine, at: Avo.configuration.root_path
  mount Vitepress::Engine, at: "/docs", constraints: AdminConstraint.new
  mount GoodJob::Engine => "good_job", constraints: AdminConstraint.new

  root "home#home_patient"
  get "home_profissionais", to: "home#home_doctor"

  # Admin Authentication
  namespace :admins do
    get "sessions", to: "sessions#new"
    post "sessions", to: "sessions#create", as: :login
    delete "sessions", to: "sessions#destroy", as: :logout
  end

  # Clinic Routes
  namespace :clinics do
    scope module: 'exams' do
      resource :exams, only: [] do
        resources :budgets, only: %w[index edit update]
      end
    end
  end

  resources :reviews, only: %w[new create]

  # Authentication
  get  "sign_up", to: "registrations#new"
  post "sign_up", to: "registrations#create"

  # Login/Logout
  get  "login", to: "sessions#new"
  post "login", to: "sessions#create"
  delete "sign_out", to: "sessions#destroy"

  # Reset Password
  get "reset_password/step_one", to: "password_resets#step_one"
  post "reset_password", to: "password_resets#create"
  get "reset_password/step_two", to: "password_resets#step_two"
  post "reset_password/check_code", to: "password_resets#check_code"
  get "reset_password/step_three", to: "password_resets#step_three"
  patch "reset_password", to: "password_resets#update"
  get "reset_password/step_four", to: "password_resets#step_four"

  # Profiles
  resource :profiles, only: :show

  patch "perfil", to: "users#update"
  post "image_upload", to: "users#upload"
  post "remove_image", to: "users#remove_image"
  patch "users/:id/attach_image", to: "users#attach_image"

  # Work Specialties
  resources :work_specialties, only: [:show, :index]
  resources :work_areas, only: [:index]

  # Contacting Users
  resources :contacting_users, only: [:create]

  # Configurations
  get "configurations/plan", to: "configurations#plan"
  get "configurations/password", to: "configurations#password", as: :configurations_password
  patch "configurations/password", to: "configurations#change_password"
  get "rendimento", to: "doctors#income"

  # Clinics
  get "clinica", to: "clinics#my_clinic", as: :my_clinic
  patch "clinica/attach_image", to: "clinics#attach_image"
  get "clinica/new_doctor", to: "clinics#new_doctor"
  post "clinica/new_doctor", to: "clinics#create_doctor"
  get "clinica/informacoes_consultas/:id", to: "clinics#appointments"

  # Patients
  get "minhas_consultas", to: "patients#appointments", as: :patient_appointments

  # Webhooks
  post "webhooks/transactions", to: "webhook_payments#change_payment_status"

  # Exams
  resource :exams, only: [] do
    resources :budgets, only: %w[index show new create] do
      resources :budget_items, path: 'items', only: :update do 
        resources :payments, only: :new do
          get 'pix', on: :collection, to: 'payments#pix', as: 'pix'
          get ':payment_id/confirmed', on: :collection, to: 'payments#confirmed', as: 'confirmed'
          get ':payment_id/status', on: :collection, to: 'payments#status', as: 'status'

          get 'credit_cards', on: :collection, to: 'payments#credit_cards', as: 'credit_cards'
          post 'pay_credit_card', on: :collection, to: 'payments#pay_credit_card', as: 'pay_credit_card'
        end
      end
    end
  end

  get "exames", to: "exams#index", as: :exams

  # Doctors
  get "profissionais", to: "doctors#index", as: :doctors
  get "rendimento", to: "doctors#income"

  # Doctor Availabilities
  resources :doctor_availabilities, only: [:create]

  # Appointments
  get "consultas", to: "appointments#index", as: :appointments
  get "consultas/new", to: "appointments#new"
  post "consultas/pix", to: "appointments#create_with_pix"
  post "consultas/credit_card", to: "appointments#create_with_credit_card"
  get "consultas/:id/payment", to: "appointments#payment", as: :appointment_payment
  post "credit_cards", to: "credit_cards#create"
  get "credit_cards", to: "credit_cards#index"

  get "up" => "rails/health#show", as: :rails_health_check

  match "*path", to: "errors#not_found", via: :all,
    constraints: lambda { |req| !req.path.start_with?("/rails/") }
end

