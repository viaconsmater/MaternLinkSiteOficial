class BudgetsController < ApplicationController
  def index
    @pagy, @budgets = pagy(current_user.budgets, items: 100)

    render inertia: "Budget/List", props: {
      data: serialize(@budgets, ::Exams::Budgets::BudgetSerializer),
      pagy: @pagy
    }
  end

  def new
    render inertia: "Exams/Details"
  end

  def create
    error, budget = ::CreateBatchesBudgetsService.new(
      clinic_ids: params[:clinic_ids],
      attachments: params[:attachments],
      current_user: current_user,
      params: budget_params
    ).call

    return redirect_to show_exam_url, inertia: { errors: budget.errors } if error

    render inertia: 'Exams/Details', props: {
        data: budget,
      }
  end

  def show
    @budget = current_user.budgets.find(params[:id])

    render inertia: "Budget/Show", props: {
      data: serialize(
        @budget.items,
        ::Exams::Budgets::ItemSerializer)
    }
  end

  private

  def budget_params
    params.permit(:description)
  end
end
