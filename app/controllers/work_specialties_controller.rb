class WorkSpecialtiesController < ApplicationController
  skip_before_action :require_authenticate

  def index
    specialties = WorkSpecialty.order(:name)
    render json: specialties, status: :ok
  rescue StandardError => e
    render json: e, status: :unprocessable_entity
  end

  def show
    specialties = WorkSpecialty.where(work_area_id: params[:id]).order(:name).pluck(:name, :id).map do |a|
      { label: a[0], value: a[1] }
    end
    render json: specialties, status: :ok
  rescue StandardError => e
    render json: e, status: :unprocessable_entity
  end
end
