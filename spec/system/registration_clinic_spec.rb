require "system_helper"

describe "Creation clinic", type: :system do
  before do
    wa = create(:work_area, name: "CRM")
    create(:work_specialty, name: "Qualquer", work_area: wa)

    proxy.stub("https://viacep.com.br").and_return(json: {
      logradouro: "Rua 1",
      bairro: "Bairro 1",
      localidade: "Cidade 1",
      uf: "DF",
    })
  end

  it "creates clinic successfully" do
    visit "sign_up"

    # Choose doctor autônomo
    find("p", text: "Sou profissional da saúde").click
    find("p", text: "Clínica Privada").click

    # First Step
    fill_in "Nome", with: "Pedro"
    fill_in "Telefone", with: "123456"
    fill_in "Email", with: "manager@mail.com"
    fill_in "Senha", with: "123456"

    find_field(type: "checkbox").check

    within("form") do
      click_button "Cadastre-se"
    end

    # Second Step
    find_field("CPF").send_keys("77341778083")
    find_field("Data de nascimento").send_keys("01/01/1990")

    fill_in_select("Selecione seu gênero", "Masculino")

    click_button "Continuar"

    # Clinic Step
    fill_in "Nome da clínica", with: "Consultório do Pedro"

    find_field("CNPJ").send_keys("15217936000146")
    fill_in_select("O tipo da chave pix que deseja receber os pagamentos", "Email")
    fill_in "Chave pix", with: "manager@mail.com"
    fill_in "Descrição da clínica", with: "Clínica do Pedro"

    click_button "Continuar"

    # Address STEP
    find_field("CEP").send_keys("70687140")
    find_field("Número").click # Just to trigger the CEP API

    sleep(3) # Wait CEP API: Mocked with Billy
    click_button "Criar conta"

    sleep(1) # Wait User creation
    expect(User.where(email: "manager@mail.com", role: :manager)).to exist
    expect(Clinic.where(name: "Consultório do Pedro")).to exist
  end
end
