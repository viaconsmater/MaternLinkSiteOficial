class PaymentsController < ApplicationController
  def new
    @item = current_user.items.find(params[:budget_item_id])

    render inertia: "Budget/payment", props: {
      data: serialize(@item, ::Exams::Budgets::ItemSerializer)
    }
  end

  def pix
    @item = current_user.items.find(params[:budget_item_id]) 
    @qr_code, @payment = ::GeneratePixQrCodeService.new(user: current_user, payable: @item, amount: @item.amount).call

    render inertia: "Budget/payment_show", props: {
      data: serialize(@item, ::Exams::Budgets::ItemSerializer),
      qr_code: @qr_code,
      payment: @payment
    }
  end

  def pay_credit_card
    @item = current_user.items.find(params[:budget_item_id])

    if @item&.payment&.paid?
      return redirect_to new_exams_budget_budget_item_payment_path, inertia: { errors: 'Pagamento já realizado' }
    end

    payment_transaction ||= ::Payments.credit_card_transaction!(current_user, @item,sprintf("%.2f", @item.amount * 100), data)

    save_credit_card(payment_transaction['creditCard'])

    payment = current_user.payments.create!(
      payable: @item,
      transaction_id: payment_transaction['id'],
      status: :paid,
      payment_method: :credit_card,
      amount: sprintf("%.2f", @item.amount),
      status: :paid,
      transaction_receipt_url: payment_transaction['transactionReceiptUrl']
    )

    @item.update!(status: :accepted)
    ::Patients::PaymentsMailer
      .with(budget: @item.budget, user: current_user)
      .confirmation
      .deliver_now

    ::Clinics::PaymentsMailer
      .with(budget: @item, clinic: @item.clinic)
      .confirmation
      .deliver_now

    redirect_to confirmed_exams_budget_budget_item_payments_path(payment_id: payment.id)
  end

  def confirmed
    @payment = current_user.payments.find(params[:payment_id])

    render inertia: "Budget/payment_confirm", props: {
      data: serialize(@payment.payable, ::Exams::Budgets::ItemSerializer),
      payment: @payment
    }
  end

  def status
    payment = current_user.payments.find_by(id: params[:payment_id])

    if payment
      render json: { data: payment }, status: :ok
    else
      render json: { error: "Pagamento não encontrado" }, status: :not_found
    end
  end

  private

  def data
    data = params[:payment_info]

    {
    "creditCard": {
        "holderName": data.dig('credit_card', 'holder_name'),
        "number": data.dig('credit_card', 'number'),
        "expiryMonth": data.dig('credit_card', 'expiry_month'),
        "expiryYear": data.dig('credit_card', 'expiry_year'),
        "ccv": data.dig('credit_card', 'ccv'),
      },
      "creditCardHolderInfo": {
        "name": data.dig('credit_card_holder_info', 'name'),
        "email": data.dig('credit_card_holder_info', 'email'),
        "cpfCnpj": data.dig('credit_card_holder_info', 'cpf_cnpj'),
        "postalCode": data.dig('credit_card_holder_info', 'postal_code'),
        "addressNumber": data.dig('credit_card_holder_info', 'address_number'),
        "addressComplement": nil,
        "mobilePhone": data.dig('credit_card_holder_info', 'phone')
      }
    }
  end

  def save_credit_card(credit_card)
    current_user.credit_cards.create(
      credit_card_brand: credit_card['creditCardBrand'],
      credit_card_number: credit_card['creditCardNumber'],
      credit_card_token: credit_card['creditCardToken']
    )
  end
end
