module SpecialtiesConcern
  extend ActiveSupport::Concern

  included do
    before_action :specialties_options
  end

  def specialties_options
    @specialties_options = WorkSpecialty.exams.pluck(:name, :id).map { |name, id| { label: name, value: id } }
  end
end
