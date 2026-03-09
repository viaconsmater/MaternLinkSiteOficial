class HomeController < ApplicationController
  include AddressesConcern
  include SpecialtiesConcern

  skip_before_action :require_authenticate
  skip_before_action :block_admin
  before_action :specialties_options, :states_options, only: :home_patient

  def home_doctor
    render inertia: "Home/HomeDoctor"
  end

  def home_patient
    render inertia: "Home/HomePatient", props: {
      specialties_options: @specialties_options,
      states_options: @states_options,
      cities_by_state_options: @cities_by_state
    }
  end
end
