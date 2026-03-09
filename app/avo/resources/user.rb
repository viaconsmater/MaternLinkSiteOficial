class Avo::Resources::User < Avo::BaseResource
  self.includes = []
  self.title = :email
  # self.search = {
  #   query: -> { query.ransack(id_eq: params[:q], m: "or").result(distinct: false) }
  # }

  def fields
    field :id, as: :id
    field :email, as: :text
    field :name, as: :text
    field :role, as: :select, enum: ::User.roles
    field :password, as: :password
    field :cpf, as: :text, hide_on: :index
    field :enabled, as: :boolean
    field :gender,
      as: :select,
      enum: ::User.genders,
      hide_on: [:index]
    field :birthdate, as: :date, hide_on: :index

    field :phone, as: :text, hide_on: :index
    field :address, as: :belongs_to, hide_on: :index
    field :user_media, as: :belongs_to, hide_on: :index
    field :external_payment_id, as: :text, hide_on: [:index, :forms]

    field :doctor, as: :has_one, visible: -> { resource.record.doctor? }, hide_on: :index
    field :doctor_appointments, as: :has_many, visible: -> { resource.record.doctor? }, hide_on: :index

    field :patient, as: :has_one, visible: -> { resource.record.patient? }, hide_on: :index
    field :patient_appointments, as: :has_many, visible: -> { resource.record.patient? }, hide_on: :index
  end

  def filters
    filter Avo::Filters::RoleFilter
  end

  def actions
    action Avo::Actions::ToggleEnableUser
  end

  def name
    "Usuário"
  end

  def plural_name
    "Usuários"
  end
end
