class AddressSerializer < ApplicationSerializer
  attributes :cep, :neighborhood, :city, :state, :street, :number
end
