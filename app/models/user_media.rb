class UserMedia < ApplicationRecord
  belongs_to :user
  has_many_attached :media_urls
end