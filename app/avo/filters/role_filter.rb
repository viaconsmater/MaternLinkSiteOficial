class Avo::Filters::RoleFilter < Avo::Filters::SelectFilter
  self.name = "Filtro por tipo de usuário"
  # self.visible = -> do
  #   true
  # end

  def apply(request, query, value)
    return query if value.blank?

    query.where(role: value)
  end

  def options
    User.roles.map { |k, v| [v, k] }.to_h
  end
end
