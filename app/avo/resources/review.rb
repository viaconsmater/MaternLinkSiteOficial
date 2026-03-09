class Avo::Resources::Review < Avo::BaseResource
  self.includes = []
  def fields
    field :id, as: :id
    field :rating, as: :number
    field :description, as: :text
    field :reviewable, as: :belongs_to, polymorphic_as: :reviewable, types: [Doctor, Clinic]
  end
  
  def name
    "Avaliação"
  end

  def plural_name
    "Avaliações"
  end
end
