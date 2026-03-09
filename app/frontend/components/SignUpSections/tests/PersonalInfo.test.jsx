import { fireEvent, render, screen, waitFor } from "@testing-library/react";

import { mockData } from "@/constants/testMocks";

import PersonalInfo from "../PersonalInfo";
describe("test personal information page", () => {
  it("complete all fields", () => {
    render(<PersonalInfo data={mockData} />);

    expect(screen.getByText("CPF")).toBeInTheDocument();
    expect(screen.getByText("Gênero")).toBeInTheDocument();
    expect(screen.getByText("Data de nascimento")).toBeInTheDocument();
  });

  it("go to next page", () => {
    const mockDataFilled = {
      ...mockData,
      cpf: "09953442193",
      gender: "masculino",
      birthdate: "29/09/2001",
    };
    render(<PersonalInfo data={mockDataFilled} />);

    fireEvent.click(screen.getByText("Continuar"));

    waitFor(() => {
      expect(screen.getByText("Insira seus dados profissionais.")).toBeInTheDocument();
    });
  });

  it("invalid cpf text", () => {
    const mockDataWithInvalidEmail = {
      ...mockData,
      cpf: "3212312311",
    };

    render(<PersonalInfo data={mockDataWithInvalidEmail} />);

    waitFor(() => {
      expect(screen.getByText("Por favor, insira um CPF válido.")).toBeInTheDocument();
    });
  });

  it("invalid date text", () => {
    const mockDataWithInvalidEmail = {
      ...mockData,
      birthdate: new Date(),
    };

    render(<PersonalInfo data={mockDataWithInvalidEmail} />);

    waitFor(() => {
      expect(screen.getByText("Você deve ter no mínimo 18 anos de idade")).toBeInTheDocument();
    });
  });
});
