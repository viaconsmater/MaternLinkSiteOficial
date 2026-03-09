class ProfilesController < ApplicationController
  def show
    areas = WorkArea.pluck(:name, :id).map { |name, id| { label: name, value: id } }
    specialties = WorkSpecialty.exams.pluck(:name, :id).map { |name, id| { label: name, value: id } }

    clinic = Clinic.includes(:clinic_users).find_by(clinic_users: { user: current_user, is_owner: true })
    render inertia: "User/profile", props: {
      area_options: areas,
      work_specialties_options: specialties,
      clinic: clinic ? serialize(clinic, ClinicEditSerializer) : nil,
    }
  end
end
