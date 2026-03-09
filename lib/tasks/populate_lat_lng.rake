require 'httparty'
require 'uri'

namespace :addresses do
  desc "Populate latitude and longitude for addresses using Google Maps API"
  task populate_lat_lng: :environment do
    api_key = ENV['GOOGLE_MAPS_API_KEY']

    Address.where(latitude: nil, longitude: nil).find_each do |address|
      puts "Fetching coordinates for Address ID: #{address.id}"

      def fetch_coordinates(query, api_key)
        encoded_query = URI.encode_www_form_component(query)
        url = "https://maps.googleapis.com/maps/api/geocode/json?address=#{encoded_query}&key=#{api_key}"
        response = HTTParty.get(url)

        if response.success? && response['results'].present?
          response['results'].first['geometry']['location']
        else
          nil
        end
      end

      coordinates = nil
      if address.cep.present?
        puts "Trying with CEP: #{address.cep}"
        coordinates = fetch_coordinates(address.cep, api_key)
      end

      if coordinates.nil? && address.neighborhood.present? && address.city.present?
        query = "#{address.neighborhood}, #{address.city}"
        puts "CEP failed, trying with Neighborhood and City: #{query}"
        coordinates = fetch_coordinates(query, api_key)
      end

      if coordinates
        address.update!(latitude: coordinates['lat'], longitude: coordinates['lng'])
        puts "Updated Address ID: #{address.id} => Latitude: #{coordinates['lat']}, Longitude: #{coordinates['lng']}"
      else
        puts "Failed to fetch data for Address ID: #{address.id}. No coordinates found."
      end
    end
  end
end