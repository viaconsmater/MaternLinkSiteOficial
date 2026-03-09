class Avo::Resources::Appointment < Avo::BaseResource
  self.includes = []

  def fields
    field :id, as: :id
    field :date, as: :date_time, relative: false, format_using: -> { value && value.change(offset: "UTC") }
    field :doctor, as: :belongs_to
    field :duration, as: :number, hide_on: [:index, :forms]
    field :patient, as: :belongs_to
    field :clinic, as: :belongs_to
    field :price_cents,
      as: :number,
      format_using: -> {
                      if view == :edit
                        value
                      else
                        view_context.number_to_currency((value ? value : 0) / 100.0)
                      end
                    }
    field :transfer_value_cents,
      as: :number,
      format_using: -> {
        if view == :edit
          value
        else
          view_context.number_to_currency((value ? value : 0) / 100.0)
        end
      },
      hide_on: [:index]
    field :clinic_status, as: :text, hide_on: [:forms]
    field :maternlink_status, as: :text, hide_on: [:forms]
    field :status, as: :select, enum: ::Appointment.statuses, hide_on: [:index]
    field :payment_status, as: :select, enum: ::Appointment.payment_statuses, hide_on: [:index]
    field :transfer_status, as: :select, enum: ::Appointment.transfer_statuses, hide_on: [:index]
    field :external_payment_id, as: :text, hide_on: [:index, :forms]
    field :external_clinic_payment_id, as: :text, hide_on: [:index, :forms]
  end

  def name
    "Consulta"
  end

  def plural_name
    "Consultas"
  end
end
