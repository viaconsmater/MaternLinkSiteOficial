class DoctorAvailability < ApplicationRecord
  belongs_to :doctor

  validates :day_of_week, :start_time, :end_time, presence: true
  validate :end_time_validation
  validate :overlap_time_validation

  enum day_of_week: {
    monday: 0, tuesday: 1, wednesday: 2, thursday: 3, friday: 4, saturday: 5, sunday: 6,
  }

  def end_time_validation
    if start_time && end_time && start_time > end_time
      errors.add(:base, "Horário de início deve ser antes do horário de término")
    end
  end

  def overlap_time_validation
    if doctor
      current_range = start_time..end_time
      doctor.doctor_availabilities.where(day_of_week: day_of_week).where.not(id: id).map do |availability|
        old_range = availability.start_time..availability.end_time
        if current_range.overlaps?(old_range)
          errors.add(:base, "Esse horário já está ocupado por outro período de atendimento")
        end
      end
    end
  end
end
