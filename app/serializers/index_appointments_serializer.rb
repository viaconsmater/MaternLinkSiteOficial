class IndexAppointmentsSerializer < ApplicationSerializer
  attributes :id,
    :date,
    :approximate_start_time

  def approximate_start_time
    if object.date.min >= 30
      object.date.strftime("%k:30")
    else
      object.date.strftime("%k:00")
    end
  end
end
