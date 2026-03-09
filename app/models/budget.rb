class Budget < ApplicationRecord
  has_many_attached :attachments

  belongs_to :user
  has_many :items, class_name: 'BudgetItem', dependent: :destroy

  validates :attachments, presence: true
  validate :attachments_content_type

  private

  def attachments_content_type
    attachments.each do |attachment|
      unless attachment.content_type.in?(%w(image/png image/jpg image/jpeg application/pdf))
        errors.add(:attachments, 'somente arquivos PNG, JPG, JPEG ou PDF são permitidos')
      end
    end
  end
end
