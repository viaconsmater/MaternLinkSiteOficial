class IncomeSerializer < ApplicationSerializer
  attributes :id,
    :name,
    :image,
    :specialty,
    :created_at

  def image
    object.image.url
  end

  def specialty
    object.doctor.work_specialty.name
  end
end
