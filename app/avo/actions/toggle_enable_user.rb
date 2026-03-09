class Avo::Actions::ToggleEnableUser < Avo::BaseAction
  self.name = "Habilitar/Desabilitar Usuários"
  self.message = "Selecione o campo abaixo para habiltiar os usuários selecionados ou deixa desmarcado
  para desabilitar todos os selecionados"

  def fields
    field :enabled, as: :boolean, name: "Habilitar?"
  end

  def handle(**args)
    records, fields, _current_user, _resource = args.values_at(:records, :fields, :current_user, :resource)
    records.each do |user|
      user.update!(enabled: fields["enabled"])
    end
  rescue => e
    error e
  end
end
