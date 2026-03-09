class Exams::Budgets::ItemSerializer < ApplicationSerializer
  has_one :clinic, serializer: Exams::ClinicSerializer

  attributes :id, :status, :description, :budget_id, :formatted_amount, :additional_description

  def formatted_amount
    ActionController::Base.helpers.number_to_currency(object.amount, unit: "R$", separator: ",", delimiter: ".", format: "%u %n")
  end
end
