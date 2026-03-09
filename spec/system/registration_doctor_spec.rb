require "system_helper"

describe "Creation doctor", type: :system do
  before do
    wa = create(:work_area, name: "CRM")
    create(:work_specialty, name: "Qualquer", work_area: wa)

    # Stub cep API
    proxy.stub("https://viacep.com.br").and_return(json: {
      logradouro: "Rua 1",
      bairro: "Bairro 1",
      localidade: "Cidade 1",
      uf: "DF",
    })
  end

  it "creates doctor successfully" do
    visit "sign_up"

    # Choose doctor autônomo
    find("p", text: "Sou profissional da saúde").click
    find("p", text: "Consultório autônomo").click

    # First Step
    fill_in "Nome", with: "Pedro"
    fill_in "Telefone", with: "123456"
    fill_in "Email", with: "doctor@mail.com"
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

    # Third Step
    fill_in_select("Selecione seu Conselho de Classe", "CRM")
    sleep(0.1) # Wait for the select to be filled
    fill_in_select("Selecione sua especialidade", "Qualquer")

    fill_in "Número do Conselho de classe", with: "123456"
    fill_in_select("Selecione o valor da consulta", "R$ 100,00")

    click_button "Continuar"

    # Clinic Step
    fill_in "Nome da clínica", with: "Consultório do Pedro"

    find_field("CNPJ").send_keys("15217936000146")
    fill_in_select("O tipo da chave pix que deseja receber os pagamentos", "Email")
    fill_in "Chave pix", with: "doctor@mail.com"
    fill_in "Descrição da clínica", with: "Clínica do Pedro"

    click_button "Continuar"

    # Address STEP
    find_field("CEP").send_keys("70687140")
    find_field("Número").click # Just to trigger the CEP API

    sleep(1) # Wait CEP API: Mocked with Billy
    click_button "Criar conta"

    sleep(1) # Wait for User Creation
    expect(User.where(email: "doctor@mail.com", role: :doctor)).to exist
    expect(Clinic.where(name: "Consultório do Pedro")).to exist
  end
end
