import { fireEvent, render, screen } from "@testing-library/react";
import { vi } from "vitest";

import LocationInfo from "../LocationInfo";

describe("LocationInfo Component", () => {
  const mockSetSection = vi.fn();
  const mockSetData = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders main elements and displays correct labels based on doctorType", () => {
    const mockData = {
      doctorType: "autonomy",
      clinics_attributes: {
        name: "",
        cnpj: "",
        description: "",
      },
    };
    render(<LocationInfo setSection={mockSetSection} setData={mockSetData} data={mockData} />);

    expect(screen.getByText("Continue seu cadastro")).toBeInTheDocument();
    expect(screen.getByText("Insira informações sobre o seu consultório.")).toBeInTheDocument();
  });

  it("navigates to the next section if all fields are filled", () => {
    const mockDataFilled = {
      doctorType: "autonomy",
      clinics_attributes: {
        name: "My Clinic",
        cnpj: "12.345.678/9012-34",
        description: "A wonderful clinic",
      },
    };
    render(
      <LocationInfo setSection={mockSetSection} setData={mockSetData} data={mockDataFilled} />,
    );

    const continueButton = screen.getByText("Continuar");
    fireEvent.click(continueButton);

    expect(mockSetSection).toHaveBeenCalledWith(expect.any(Function));
  });

  it("navigates back to the previous section on 'voltar' click", () => {
    const mockData = {
      doctorType: "autonomy",
      clinics_attributes: {
        name: "My Clinic",
        cnpj: "12.345.678/9012-34",
        description: "A wonderful clinic",
      },
    };
    render(<LocationInfo setSection={mockSetSection} setData={mockSetData} data={mockData} />);

    const backButton = screen.getByText("voltar").closest("button");
    fireEvent.click(backButton);

    expect(mockSetSection).toHaveBeenCalledWith(expect.any(Function));
  });
});
