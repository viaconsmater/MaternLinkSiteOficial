module Clinics
  module Exams
    class BudgetsController < ApplicationController
      before_action :set_clinic

      def index
        @budgets = @clinic.items
        @pagy, @items = pagy(@budgets, items: 10)

        render inertia: "ClinicExam/Index", props: {
          data: serialize(@items, ::Exams::Budgets::Clinics::ItemSerializer),
          pagy: @pagy
        }
      end

      def edit
        @item = @clinic.items.find(params[:id])

        render inertia: "ClinicExam/Edit", props: {
          data: serialize(@item, ::Exams::Budgets::Clinics::ItemSerializer)
        }
      end

      def update
        @item = @clinic.items.find(params[:id])

        unless @item.update(budget_items_params.merge(status: :received))
          return redirect_to edit_clinics_exams_budget_path, inertia: { errors: @item.errors }
        end

        ::Patients::BudgetsMailer
          .with(budget: @item.budget, user: current_user, clinic: @clinic)
          .budget_return
          .deliver_now

        redirect_to edit_clinics_exams_budget_path, inertia: { success: "Enviado com sucesso" }
      end

      private

      def set_clinic
        @clinic = current_user.clinic
        redirect_to root_path unless @clinic
      end

      def budget_items_params
        params.permit(:additional_description, :amount)
      end
    end
  end
end
