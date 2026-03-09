require "system_helper"

describe "Creation patient", type: :system do
  before do
    proxy.stub("https://viacep.com.br").and_return(json: {
      logradouro: "Rua 1",
      bairro: "Bairro 1",
      localidade: "Cidade 1",
      uf: "DF",
    })
  end

  it "creates patient successfully" do
    visit "sign_up"

    # Choose paciente
    find("p", text: "Sou paciente").click

    # First Step
    fill_in "Nome", with: "Pedro"
    fill_in "Telefone", with: "123456"
    fill_in "Email", with: "patient@mail.com"
    fill_in "Senha", with: "123456"

    find_field(type: "checkbox").check

    within("form") do
      click_button "Cadastre-se"
    end

    # Second Step
    find_field("CPF").send_keys("77341778083")
    find_field("Data de nascimento").send_keys("01/01/1990")

    find("span", text: "Selecione seu gênero").click
    within "div[role='listbox']" do
      find("span", text: "Masculino").click
    end

    click_button "Continuar"

    # Adress STEP
    find_field("CEP").send_keys("70687140")
    find_field("Número").click # Just to trigger the CEP API

    sleep(1) # Wait CEP API: Mocked with Billy
    click_button "Criar conta"

    expect(User.where(email: "patient@mail.com", role: :patient)).to exist
  end
end
