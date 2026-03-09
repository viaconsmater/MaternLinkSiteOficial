class Exams::Budgets::Clinics::ItemSerializer < ApplicationSerializer
  attributes :id, :status, :formatted_amount, :description, :user_name, :user_email, :user_phone, :sent_at, :attachments

  def formatted_amount
    ActionController::Base.helpers.number_to_currency(object.amount, unit: "R$", separator: ",", delimiter: ".", format: "%u %n")
  end

  def user_phone
    object.user.phone
  end

  def user_email
    object.user.email
  end

  def user_name
    object.user.name
  end

  def sent_at
    object.budget.sent_at
  end

  def attachments
    object.budget.attachments.map do |attachment|
      Rails.application.routes.url_helpers.rails_blob_path(attachment)
    end
  end
end
