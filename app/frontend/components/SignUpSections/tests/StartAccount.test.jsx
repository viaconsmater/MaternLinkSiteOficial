import { fireEvent, render, screen, waitFor } from "@testing-library/react";

import { mockData } from "@/constants/testMocks";

import StartAccount from "../StartAccount";
describe("test start account", () => {
  it("complete all fields", () => {
    render(<StartAccount data={mockData} />);

    expect(screen.getByText("Nome")).toBeInTheDocument();
    expect(screen.getByText("Telefone")).toBeInTheDocument();
    expect(screen.getByText("Email")).toBeInTheDocument();
    expect(screen.getByText("Senha")).toBeInTheDocument();
    expect(screen.getByText(/Aceito/i)).toBeInTheDocument();
  });
  it("go to next page", () => {
    const mockDataFilled = {
      ...mockData,
      name: "John Doe",
      phone: "12345678910",
      email: "john.doe@example.com",
      password: "strongpassword",
    };
    render(<StartAccount data={mockDataFilled} />);

    fireEvent.click(screen.getByText("Cadastre-se"));
    waitFor(() => {
      expect(screen.getByText("Insira seus dados pessoais.")).toBeInTheDocument();
    });
  });
  it("invalid email text", () => {
    const mockDataWithInvalidEmail = {
      ...mockData,
      email: "invalid-email",
    };

    render(<StartAccount data={mockDataWithInvalidEmail} />);
    waitFor(() => {
      expect(screen.getByText("Por favor, insira um email válido.")).toBeInTheDocument();
    });
  });

  it("invalid password text", () => {
    const mockDataWithInvalidEmail = {
      ...mockData,
      password: "12345",
    };

    render(<StartAccount data={mockDataWithInvalidEmail} />);

    waitFor(() => {
      expect(screen.getByText("A senha deve ter no mínimo 6 caracteres.")).toBeInTheDocument();
    });
  });
  it("invalid phone text", () => {
    const mockDataWithInvalidEmail = {
      ...mockData,
      phone: "1234567891",
    };

    render(<StartAccount data={mockDataWithInvalidEmail} />);

    waitFor(() => {
      expect(screen.getByText("O telefone deve ter no mínimo 11 caracteres.")).toBeInTheDocument();
    });
  });
});
