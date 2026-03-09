require "system_helper"

describe "sessions creation", type: :system do
  context "when user is patient" do
    it "login and redirects do minhas consultas" do
      create(:user_patient, email: "patient@mailer.com", password: "123456")

      visit root_path

      click_on "Entrar"

      fill_in "email", with: "patient@mailer.com"
      fill_in "password", with: "123456"

      click_button "Entrar"

      expect(page).to have_current_path("/minhas_consultas")
    end
  end
end
