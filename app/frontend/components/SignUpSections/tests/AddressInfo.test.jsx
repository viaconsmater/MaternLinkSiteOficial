import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { vi } from "vitest";

import { mockData } from "@/constants/testMocks";

import AddressInfo from "../AddressInfo";
describe("test address information page", () => {
  it("complete all fields", () => {
    render(<AddressInfo data={mockData} />);

    expect(screen.getByText("CEP")).toBeInTheDocument();
    expect(screen.getByText("Estado")).toBeInTheDocument();
    expect(screen.getByText("Cidade")).toBeInTheDocument();
    expect(screen.getByText("Bairro")).toBeInTheDocument();
    expect(screen.getByText("Logradouro")).toBeInTheDocument();
    expect(screen.getByText("Número")).toBeInTheDocument();
  });

  it("go to next page", () => {
    const mockDataFilled = {
      ...mockData,
      address_attributes: {
        cep: "12345-678",
        state: "SP",
        city: "São Paulo",
        neighborhood: "Centro",
        street: "Rua Principal",
        number: "123",
      },
    };

    const submitSignUpData = vi.fn();

    render(<AddressInfo data={mockDataFilled} submitSignUpData={submitSignUpData} />);
    fireEvent.click(screen.getByText("Criar conta"));
    waitFor(() => {
      expect(screen.getByText("Cadastro concluido com sucesso!")).toBeInTheDocument();
    });
  });
});
