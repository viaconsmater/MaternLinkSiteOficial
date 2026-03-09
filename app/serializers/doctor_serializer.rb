class DoctorSerializer < ApplicationSerializer
  attributes :id, :council, :description, :price_cents, :professional_experiences, :educational_history

  has_one :work_area, serializer: WorkAreaSerializer
  has_one :work_specialty, serializer: WorkSpecialtySerializer
end
