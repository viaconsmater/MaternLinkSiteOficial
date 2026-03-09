class CreditCardsController < ApplicationController
  skip_before_action :require_authenticate
  skip_before_action :verify_authenticity_token

  def index
    @cards = current_user.credit_cards
    render inertia: "User/cards", props: {
      cards: serialize(@cards, CreditCardSerializer),
    }
  end

  def create
    Payments.card_tokenization(current_user, credit_card_params, request.remote_ip)
    head :created
  rescue StandardError => e
    render json: e, status: :unprocessable_entity
  end

  private

  def credit_card_params
    params.permit(
      creditCard: [
        :holderName,
        :number,
        :expiryMonth,
        :expiryYear,
        :ccv,
      ],
      creditCardHolderInfo: [
        :name,
        :email,
        :cpfCnpj,
        :postalCode,
        :addressNumber,
        :phone,
      ],
    )
  end
end
