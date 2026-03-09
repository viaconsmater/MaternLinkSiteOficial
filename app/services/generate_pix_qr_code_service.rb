class GeneratePixQrCodeService
  def initialize(user:, payable:, amount:, payment_method: :pix)
    @user = user
    @payable = payable
    @amount = amount
    @payment_method = payment_method
  end

  def call
    payment_id = Payments.create_pix_transaction!(@user, @payable,sprintf("%.2f", @amount))
    @payment = @user.payments.create!(payable: @payable, transaction_id: payment_id, status: :pending, payment_method: :pix, amount: @amount)

    [Payments.pix_qr_code(@payment.transaction_id), @payment]
  end
end
