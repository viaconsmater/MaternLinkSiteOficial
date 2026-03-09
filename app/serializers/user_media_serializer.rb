class UserMediaSerializer < ApplicationSerializer
  attributes :id, :user_id, :media_url, :name

  def media_url
    return nil unless object.media_urls.attached?
    Rails.application.routes.url_helpers.rails_blob_path(object.media_urls.first, only_path: true)
  end
end
