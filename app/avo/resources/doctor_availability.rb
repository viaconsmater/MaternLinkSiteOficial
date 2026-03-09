class Avo::Resources::DoctorAvailability < Avo::BaseResource
  self.includes = []
  # self.search = {
  #   query: -> { query.ransack(id_eq: params[:q], m: "or").result(distinct: false) }
  # }

  def fields
    field :id, as: :id
    field :doctor, as: :belongs_to
    field :start_time,
      as: :time,
      relative: false,
      format_using: -> { value + Time.zone.utc_offset }
    field :end_time,
      as: :time,
      relative: false,
      format_using: -> { value + Time.zone.utc_offset }
    field :day_of_week, as: :select, enum: ::DoctorAvailability.day_of_weeks
  end

  def name
    "Disponibilidade do Profissional"
  end

  def plural_name
    "Disponibilidades dos Profissionais"
  end
end
