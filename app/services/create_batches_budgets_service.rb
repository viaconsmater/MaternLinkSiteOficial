class CreateBatchesBudgetsService
  def initialize(clinic_ids:, current_user:, attachments:, params:)
    @clinic_ids = clinic_ids
    @user = current_user
    @params = params
    @attachments = attachments
  end

  def call
    @budget = @user.budgets.new(sent_at: Time.zone.now, attachments: @attachments)
    @clinic_ids.map { |clinic_id| @budget.items.new(@params.merge(clinic_id: clinic_id)) }

    return [true, @budget] unless @budget.save

    @budget.items.each do |item|
      ::Clinics::BudgetsMailer.with(budget: item, clinic: item.clinic.users.first).requested.deliver_now
    end

    ::Patients::BudgetsMailer.with(budget: @budget, user: @user).confirmation_requested.deliver_now

    [false, @budget]
  end
end
