class ClinicEditSerializer < ApplicationSerializer
  has_many :work_specialties

  attributes :id,
    :name,
    :description,
    :cnpj,
    :image,
    :pix_key,
    :pix_type,
    :exam_enabled

  def image
    object.image.url
  end
end
