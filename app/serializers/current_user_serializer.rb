class CurrentUserSerializer < ApplicationSerializer
  attributes :id,
    :name,
    :email,
    :role,
    :phone,
    :cpf,
    :gender,
    :birthdate,
    :registered_since,
    :image,
    :active_plan,
    :role

  def registered_since
    object.created_at.strftime("%-d/%-m/%Y")
  end

  def image
    return nil unless object.image.attached?
    Rails.application.routes.url_helpers.rails_blob_path(object.image, only_path: true)
  end

  def active_plan
    "mensal"
  end

  has_one :doctor
  has_one :address
  has_many :user_media, serializer: UserMediaSerializer
end
