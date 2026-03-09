class WorkAreasController < ApplicationController
  skip_before_action :require_authenticate

  def index
    work_areas = WorkArea.order(:name)
    render json: serialize(work_areas, WorkAreaIndexSerializer), status: :ok
  rescue StandardError => e
    render json: e, status: :unprocessable_entity
  end
end
