class Avo::Resources::Budget < Avo::BaseResource
  self.includes = [:user, :items] # Inclui relacionamentos para otimizar consultas

  def fields
    field :id, as: :id
    field :user, as: :belongs_to, name: "Usuário" # Relacionamento com User
    field :items, as: :has_many, name: "Itens do Orçamento", inline_edit: true, inline_create: true do
      field :description, as: :text, name: "Descrição", maxlength: 255
      field :status, as: :select, enum: ::BudgetItem.statuses, name: "Status"
      field :clinic, as: :belongs_to
      field :payment, as: :belongs_to, optional: true
    end
    field :attachments, as: :files, name: "Anexos" # Campo para anexos

    # Outras configurações de campos, se necessário
  end

  def name
    "Orçamento de Exame"
  end

  def plural_name
    "Orçamentos de Exames"
  end
end