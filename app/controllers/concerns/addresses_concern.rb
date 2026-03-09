module AddressesConcern
  extend ActiveSupport::Concern

  included do
    before_action :states_options, :cities_by_state
  end

  def states_options
    @states_options = Address.select(:state).distinct
  end

  def cities_by_state
    @cities_by_state = Address.select(:state, :city, :neighborhood)
                .distinct
                .group_by(&:state)
                .transform_values do |addresses|
                  addresses.map { |address| "#{address.neighborhood}" }
                end
  end
end
