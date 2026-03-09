class Avo::Resources::Doctor < Avo::BaseResource
  self.includes = []
  # self.search = {
  #   query: -> { query.ransack(id_eq: params[:q], m: "or").result(distinct: false) }
  # }

  def fields
    field :id, as: :id
    field :name, as: :text, hide_on: [:forms]
    field :council, as: :text
    field :work_area, as: :belongs_to
    field :work_specialty, as: :belongs_to
    field :professional_experiences, as: :tags, hide_on: :index
    field :educational_history, as: :tags, hide_on: :index
    field :price_cents,
      as: :number,
      format_using: -> {
                      if view == :edit
                        value
                      else
                        view_context.number_to_currency((value ? value : 0) / 100.0)
                      end
                    },
      help: "Preço da consulta em centavos"
    field :user, as: :belongs_to
    field :doctor_availabilities, as: :has_many
    field :appointments, as: :has_many
  end

  def name
    "Profissional da Saúde"
  end

  def plural_name
    "Profissionais da Saúde"
  end
end
