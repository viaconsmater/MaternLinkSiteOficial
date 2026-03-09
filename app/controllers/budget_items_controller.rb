class BudgetItemsController < ApplicationController
  def update
    @budget = current_user.budgets.find(params[:budget_id])
    @item = @budget.items.find(params[:id])

    unless  @item.update(budget_items_params)
      return redirect_to exams_budget_path(@budget.id), inertia: { errors: @item.errors }
    end

    ::Clinics::BudgetsMailer
      .with(budget: @item, clinic: @item.clinic.users.first)
      .cancelled.deliver_now

    render inertia: "Budget/Show", props: {
      data: serialize(
        @item,
        ::Exams::Budgets::ItemSerializer)
    }
  end

  private

  def budget_items_params
    params.permit(:status)
  end
end
