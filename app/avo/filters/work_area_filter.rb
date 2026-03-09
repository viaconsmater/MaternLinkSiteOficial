class Avo::Filters::WorkAreaFilter < Avo::Filters::SelectFilter
  self.name = "Filtro por área de atuação"
  # self.visible = -> do
  #   true
  # end

  def apply(request, query, value)
    return query if value.blank?

    query.where(work_area_id: value)
  end

  def options
    WorkArea.pluck(:id, :name).to_h
  end
end
