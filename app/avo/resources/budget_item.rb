class Avo::Resources::BudgetItem < Avo::BaseResource
  self.includes = [:budget, :clinic, :payment] # Inclui relacionamentos para otimização
  self.visible_on_sidebar = false

  def fields
    field :id, as: :id
    field :budget, as: :belongs_to, name: "Orçamento" # Relacionamento com Budget
    field :clinic, as: :belongs_to # Relacionamento com Clinic
    field :payment, as: :belongs_to, optional: true # Relacionamento opcional com Payment
    field :description, as: :text, name: "Descrição", maxlength: 255 # Campo de descrição
    field :status, as: :select, enum: ::BudgetItem.statuses, name: "Status" # Enum para status

    # Outras configurações de campos, se necessário
  end

  def name
    "Item de Orçamento"
  end

  def plural_name
    "Itens de Orçamento"
  end
end