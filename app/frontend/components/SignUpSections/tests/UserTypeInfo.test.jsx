import { fireEvent, render, screen } from "@testing-library/react";
import { vi } from "vitest";

import UserType from "../UserTypeInfo";

describe("UserType Component", () => {
  const mockSetSection = vi.fn();
  const mockSetData = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders the main elements", () => {
    render(<UserType setSection={mockSetSection} setData={mockSetData} />);

    expect(screen.getByText("Selecione seu objetivo na Matern Link")).toBeInTheDocument();
    expect(screen.getByText("Sou paciente")).toBeInTheDocument();
    expect(
      screen.getByText("Quero ser atendido pelos melhores especialistas da minha região."),
    ).toBeInTheDocument();
    expect(screen.getByText("Sou profissional da saúde")).toBeInTheDocument();
    expect(
      screen.getByText(
        "Trabalho na área da saúde e quero atender mais pacientes de forma simplificada.",
      ),
    ).toBeInTheDocument();
  });

  it("sets data to 'patient' and navigates to the next section on 'Sou paciente' click", () => {
    render(<UserType setSection={mockSetSection} setData={mockSetData} />);

    const patientButton = screen.getByText("Sou paciente").closest("div");
    fireEvent.click(patientButton);

    expect(mockSetData).toHaveBeenCalledWith("role", "patient");
    expect(mockSetSection).toHaveBeenCalledWith(expect.any(Function));
  });

  it("sets data to 'doctor' and navigates to the next section on 'Sou profissional da saúde' click", () => {
    render(<UserType setSection={mockSetSection} setData={mockSetData} />);

    const doctorButton = screen.getByText("Sou profissional da saúde").closest("div");
    fireEvent.click(doctorButton);

    expect(mockSetData).toHaveBeenCalledWith("role", "doctor");
    expect(mockSetSection).toHaveBeenCalledWith(expect.any(Function));
  });
});
