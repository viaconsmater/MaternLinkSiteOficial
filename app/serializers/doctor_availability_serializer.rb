class DoctorAvailabilitySerializer < ApplicationSerializer
  attributes :id, :start_time, :end_time, :day_of_week

  def start_time
    object.start_time.strftime("%k:%M")
  end

  def end_time
    object.end_time.strftime("%k:%M")
  end
end
