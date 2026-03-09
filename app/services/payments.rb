module Payments
  #########################################
  # CONFIGURAÇÃO
  #########################################

  def self.base_url
    ENV.fetch("PAYMENT_API_URL") { "https://sandbox.asaas.com/api/v3" }
  end

  def self.headers
    {
      "access_token" => ENV.fetch("PAYMENT_API_KEY"),
      "Content-Type" => "application/json",
      "accept" => "application/json"
    }
  end

  def self.validate_api_config!
    ENV.fetch("PAYMENT_API_KEY")
  end

  #########################################
  # CLIENTE
  #########################################

  def self.create_client!(user)
    validate_api_config!

    raise "Cpf/cnpj do usuário ausente" if user.cpf.blank?

    body = {
      name: user.name,
      email: user.email,
      cpfCnpj: user.cpf.gsub(/\D/, ""),
      externalReference: user.id,
      notificationDisabled: true
    }

    response = HTTParty.post(
      "#{base_url}/customers",
      headers: headers,
      body: body.to_json
    )

    error_handler(response)

    user.update!(external_payment_id: response["id"])
  end

  #########################################
  # SUBCONTA (SPLIT)
  #########################################

  def self.create_subaccount!(user)
    raise "Cpf/cnpj do usuário ausente" if user.cpf.blank?

    body = {
      name: user.name,
      email: user.email,
      cpfCnpj: user.cpf.gsub(/\D/, ""),
      mobilePhone: user.phone,
      birthDate: user.birthdate,
      incomeValue: 5000,
      address: user.address.street,
      addressNumber: user.address.number,
      province: user.address.neighborhood,
      postalCode: user.address.cep
    }

    response = HTTParty.post(
      "#{base_url}/accounts",
      headers: headers,
      body: body.to_json
    )

    error_handler(response)

    user.update!(wallet_id: response["walletId"])
  end

  #########################################
  # PIX
  #########################################

  def self.create_pix_transaction!(user, recipient, value_to_receive, is_doctor = false)
    create_client!(user) if user.external_payment_id.blank?

    value = value_to_receive.to_f
    repasse = (value * 0.90).round(2)

    target_user = is_doctor ? recipient.user : recipient.clinic.owner
    create_subaccount!(target_user) if target_user.wallet_id.blank?

    wallet_id = target_user.wallet_id

    if wallet_id.blank? || !target_user.split_enabled
      repasse -= 12.90
    end

    body = {
      billingType: "PIX",
      customer: user.external_payment_id,
      dueDate: Date.current.to_s,
      value: value,
      description: "Pagamento de Consulta na Via Consultas",
      split: [
        {
          walletId: wallet_id,
          fixedValue: repasse
        }
      ]
    }

    response = HTTParty.post(
      "#{base_url}/payments",
      headers: headers,
      body: body.to_json
    )

    error_handler(response)

    response["id"]
  end

  #########################################
  # QR CODE PIX
  #########################################

  def self.pix_qr_code(payment_id)
    response = HTTParty.get(
      "#{base_url}/payments/#{payment_id}/pixQrCode",
      headers: headers
    )

    error_handler(response)

    response.merge("paymentId" => payment_id)
  end

  #########################################
  # CARTÃO - CRIAR COBRANÇA
  #########################################

  def self.create_credit_card_transaction!(user, recipient, value_to_receive, is_doctor = false)
    create_client!(user) if user.external_payment_id.blank?

    value = value_to_receive.to_f
    repasse = (value * 0.90).round(2)

    target_user = is_doctor ? recipient.user : recipient.clinic.owner
    create_subaccount!(target_user) if target_user.wallet_id.blank?

    wallet_id = target_user.wallet_id

    if wallet_id.blank? || !target_user.split_enabled
      repasse -= 12.90
    end

    body = {
      billingType: "CREDIT_CARD",
      customer: user.external_payment_id,
      dueDate: Date.current.to_s,
      value: value,
      description: "Pagamento de Consulta na Via Consultas",
      split: [
        {
          walletId: wallet_id,
          fixedValue: repasse
        }
      ]
    }

    response = HTTParty.post(
      "#{base_url}/payments",
      headers: headers,
      body: body.to_json
    )

    error_handler(response)

    target_user.update!(split_enabled: true)

    response["id"]
  end

  #########################################
  # PAGAR COM CARTÃO
  #########################################

  def self.pay_credit_card(payment_id, data)
    response = HTTParty.post(
      "#{base_url}/payments/#{payment_id}/payWithCreditCard",
      headers: headers,
      body: data.to_json
    )

    error_handler(response)

    if (appointment = Appointment.find_by(external_payment_id: payment_id))
      appointment.update!(payment_status: :paid)
    end

    response
  end

  #########################################
  # TOKENIZAÇÃO DE CARTÃO
  #########################################

  def self.card_tokenization(user, data, remote_ip)
    create_client!(user) if user.external_payment_id.blank?

    body = {
      customer: user.external_payment_id,
      remoteIp: remote_ip
    }.merge(data)

    response = HTTParty.post(
      "#{base_url}/creditCard/tokenize",
      headers: headers,
      body: body.to_json
    )

    error_handler(response)

    CreditCard.create!(
      user: user,
      credit_card_number: response["creditCardNumber"],
      credit_card_brand: response["creditCardBrand"],
      credit_card_token: response["creditCardToken"]
    )

    response
  end

  #########################################
  # TRANSFERÊNCIA PARA CLÍNICA
  #########################################

  def self.pay_clinic(appointment)
    clinic = appointment.clinic

    pix_type, pix_key = clinic_pix(clinic)
    value_cents = value_to_pay_clinic_with_tax(appointment.price_cents, clinic)

    body = {
      value: value_cents / 100.0,
      pixAddressKey: pix_key,
      operationType: "PIX",
      pixAddressKeyType: pix_type,
      description: "Pagamento da consulta #{appointment.id} à clínica"
    }

    response = HTTParty.post(
      "#{base_url}/transfers",
      headers: headers,
      body: body.to_json
    )

    error_handler(response)

    appointment.update!(
      transfer_status: :success,
      payment_status: :paid,
      transfer_value_cents: value_cents,
      external_clinic_payment_id: response["id"]
    )
  rescue => e
    appointment.update!(transfer_status: :failure)
    raise e
  end

  #########################################
  # UTILITÁRIOS
  #########################################

  def self.clinic_pix(clinic)
    pix_type = clinic.pix_type
    pix_key = %w[CPF PHONE].include?(pix_type) ? clinic.pix_key.gsub(/\D/, "") : clinic.pix_key
    [pix_type, pix_key]
  end

  def self.value_to_pay_clinic_with_tax(value_cents, clinic)
    (value_cents.to_i * (1 - clinic_tax(clinic))).to_i
  end

  def self.clinic_tax(clinic)
    clinic.operation_fee.present? ? clinic.operation_fee_to_f : 0.1
  end

  def self.error_handler(response)
    unless response.code.in?([200, 201, 202])
      if response.parsed_response&.dig("errors")
        raise "Erro no ASAAS: #{response.parsed_response["errors"].map { |e| e["description"] }.join(", ")}"
      else
        raise "Erro inesperado na integração com ASAAS"
      end
    end
  end
end