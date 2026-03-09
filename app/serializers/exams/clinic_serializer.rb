class Exams::ClinicSerializer < ApplicationSerializer
  has_one :address

  attributes :id,
    :name,
    :description,
    :cnpj,
    :image,
    :months_registered,
    :email,
    :phone,
    :patients_treated,
    :reviews,
    :user_media

  def months_registered
    days = (Time.zone.today - object.created_at.to_date).to_i
    (days % 365) / 30
  end

  def email
    object.owner.email
  end

  def phone
    object.owner.phone
  end

  def patients_treated
    #object.budgets.accepted.count
  end

  def user_media
    object.owner.media_urls
  end

  def image
    return nil unless object.image.attached?
    Rails.application.routes.url_helpers.rails_blob_path(object.image, only_path: true)
  end

  def reviews
    object.reviews
  end
end
