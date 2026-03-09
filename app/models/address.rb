class Address < ApplicationRecord
  validates :city, :state, :cep, :neighborhood, :street, presence: true

  def full_address
    "#{neighborhood}, #{street}#{number && ", number"}"
  end
end
