import { fireEvent, render, screen } from "@testing-library/react";
import { vi } from "vitest";

import DoctorType from "../DoctorTypeInfo";

describe("DoctorType Component", () => {
  const mockSetSection = vi.fn();
  const mockSetData = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders the main elements", () => {
    render(<DoctorType setSection={mockSetSection} setData={mockSetData} />);

    expect(screen.getByText("Em qual perfil você se encaixa?")).toBeInTheDocument();
    expect(screen.getByText("Clínica Privada")).toBeInTheDocument();
    expect(screen.getByText("Consultório autônomo")).toBeInTheDocument();
  });

  it("sets data to 'manager' and navigates to the next section on 'Clínica Privada' click", () => {
    render(<DoctorType setSection={mockSetSection} setData={mockSetData} />);

    const clinicButton = screen.getByText("Clínica Privada").closest("div");
    fireEvent.click(clinicButton);

    expect(mockSetData).toHaveBeenCalledWith(expect.any(Function));
    expect(mockSetSection).toHaveBeenCalledWith(expect.any(Function));
  });

  it("sets data to 'doctor' and navigates to the next section on 'Consultório autônomo' click", () => {
    render(<DoctorType setSection={mockSetSection} setData={mockSetData} />);

    const autonomyButton = screen.getByText("Consultório autônomo").closest("div");
    fireEvent.click(autonomyButton);

    expect(mockSetData).toHaveBeenCalledWith(expect.any(Function));
    expect(mockSetSection).toHaveBeenCalledWith(expect.any(Function));
  });

  it("navigates back to the previous section on 'voltar' click", () => {
    render(<DoctorType setSection={mockSetSection} setData={mockSetData} />);

    const backButton = screen.getByText("voltar").closest("button");
    fireEvent.click(backButton);

    expect(mockSetSection).toHaveBeenCalledWith(expect.any(Function));
  });
});
