# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end
#
#

address = Address.create!(
  cep: "70745060",
  state: "DF",
  city: "Brasília",
  street: "306",
  neighborhood: "Asa norte",
)

User.create!(
  email: ENV.fetch("ADMIN_EMAIL", "admin@viaconsultas.com.br"),
  name: "Admin",
  password: ENV.fetch("ADMIN_PASSWORD"),
  role: :admin,
  address: address,
  cpf: CPF.generate,
)


# ==============================
# MEDICINA (CRM)
# ==============================
area = WorkArea.create!(name: "Conselho Regional de Medicina (CRM)", nick_name: "Medicina")

WorkSpecialty.create!(name: "Ginecologia e Obstetrícia", work_area: area)
WorkSpecialty.create!(name: "Clínica Médica", work_area: area)
WorkSpecialty.create!(name: "Clínica da Família", work_area: area)
WorkSpecialty.create!(name: "Endocrinologia + Endocrinologia Pediátrica", work_area: area)
WorkSpecialty.create!(name: "Infectologia + Infectologia Pediátrica", work_area: area)
WorkSpecialty.create!(name: "Urologia", work_area: area)
WorkSpecialty.create!(name: "Oncologia + Oncologia Pediátrica", work_area: area)
WorkSpecialty.create!(name: "Dermatologia + Dermatologia Pediátrica", work_area: area)
WorkSpecialty.create!(name: "Mastologia", work_area: area)
WorkSpecialty.create!(name: "Pediatria", work_area: area)
WorkSpecialty.create!(name: "Pediatria Neonatal", work_area: area)
WorkSpecialty.create!(name: "Reprodução Humana / Infertilidade", work_area: area)
WorkSpecialty.create!(name: "Clínica de Exames Diagnósticos de Imagem", work_area: area)

# ==============================
# FARMÁCIA (CRF)
# ==============================
area = WorkArea.create!(name: "Conselho Regional de Farmácia (CRF)", nick_name: "Farmácia")

WorkSpecialty.create!(name: "Farmácia Clínica", work_area: area)
WorkSpecialty.create!(name: "Laboratório de Análises Clínicas e Patológicas", work_area: area)

# ==============================
# PSICOLOGIA (CRP)
# ==============================
area = WorkArea.create!(name: "Conselho Regional de Psicologia (CRP)", nick_name: "Psicologia")

WorkSpecialty.create!(name: "Psicologia Clínica", work_area: area)

# ==============================
# FISIOTERAPIA (CREFITO)
# ==============================
area = WorkArea.create!(name: "Conselho Regional de Fisioterapia (CREFITO)", nick_name: "Fisioterapia")

WorkSpecialty.create!(name: "Fisioterapia + Pilates", work_area: area)

# ==============================
# NUTRIÇÃO (CRN)
# ==============================
area = WorkArea.create!(name: "Conselho Regional de Nutrição (CRN)", nick_name: "Nutrição")

WorkSpecialty.create!(name: "Nutrição – Nutrição Pediátrica", work_area: area)

# ==============================
# BIOMEDICINA (CRBM)
# ==============================
area = WorkArea.create!(name: "Conselho Regional de Biomedicina (CRBM)", nick_name: "Biomedicina")

WorkSpecialty.create!(name: "Laboratório de Anatomopatologia Médica", work_area: area)
WorkSpecialty.create!(name: "Laboratório de Análises Clínicas e Patológicas", work_area: area)
WorkSpecialty.create!(name: "Clínica de Exames Diagnósticos de Imagem", work_area: area)
