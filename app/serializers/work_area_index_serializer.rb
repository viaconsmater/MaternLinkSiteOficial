class WorkAreaIndexSerializer < ApplicationSerializer
  attributes :name, :id, :nick_name

  has_many :work_specialties, serializer: WorkSpecialtySerializer

  def work_specialties
    object.work_specialties.order(:name)
  end
end
