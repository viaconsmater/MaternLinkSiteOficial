import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { vi } from "vitest";

import ProfessionalInfo from "../ProfessionalInfo";

const areaOptions = [
  { label: "area", value: 1 },
  { label: "area 2", value: 2 },
];

const specialtyOptions = [
  { label: "specialty 1", value: 1 },
  { label: "specialty 2", value: 2 },
];

const mockDataFilled = {
  doctor_attributes: {
    council: "09953442193",
    work_area_id: 1,
    work_specialty_id: 1,
  },
};

const mockSetSection = vi.fn();
const mockSetData = vi.fn();
const mockSetSpecialtyOptions = vi.fn();
const mockShowAlert = vi.fn();

vi.mock("../../../contexts/Alert", () => ({
  useAlert: () => ({
    showAlert: mockShowAlert,
  }),
}));

describe("test personal information page", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders all fields", () => {
    render(
      <ProfessionalInfo
        setSection={mockSetSection}
        data={mockDataFilled}
        setData={mockSetData}
        areaOptions={areaOptions}
        specialtyOptions={specialtyOptions}
        setSpecialtyOptions={mockSetSpecialtyOptions}
      />,
    );

    expect(screen.getByText("Conselho de classe")).toBeInTheDocument();
    expect(screen.getByText("Especialidade")).toBeInTheDocument();
    expect(screen.getByText("Número do Conselho de classe")).toBeInTheDocument();
  });

  it("shows alert if fields are not filled", async () => {
    const incompleteData = {
      doctor_attributes: {
        council: "",
        work_area_id: "",
        work_specialty_id: null,
      },
    };

    render(
      <ProfessionalInfo
        setSection={mockSetSection}
        data={incompleteData}
        setData={mockSetData}
        areaOptions={areaOptions}
        specialtyOptions={specialtyOptions}
        setSpecialtyOptions={mockSetSpecialtyOptions}
      />,
    );

    fireEvent.click(screen.getByText("Continuar"));

    await waitFor(() => {
      expect(mockShowAlert).toHaveBeenCalledWith({
        message: "Preencha todos os campos!",
        type: "warning",
      });
    });
  });
});
