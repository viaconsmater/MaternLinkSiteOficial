import { useForm } from "@inertiajs/react";
import { Text } from "@switchdreams/ui";
import axios from "axios";
import React, { useState } from "react";

import AddressInfo from "@/components/SignUpSections/AddressInfo";
import FinishSignUp from "@/components/SignUpSections/FinishSignUp";
import PersonalInfo from "@/components/SignUpSections/PersonalInfo";
import ProfessionalInfo from "@/components/SignUpSections/ProfessionalInfo";
import StartAccount from "@/components/SignUpSections/StartAccount";
import { useAlert } from "@/contexts/Alert";

import { imagePath } from "../../utils";

const SignUpDoctor = ({ area_options, clinic }) => {
  const { showAlert } = useAlert();
  const [currentSection, setCurrentSection] = useState({ step: 0, role: "doctor" });
  const [loading, setLoading] = useState(false);
  const [specialtyOptions, setSpecialtyOptions] = useState([]);
  const [terms, setTerms] = useState(false);
  const { setData, data } = useForm({
    role: "doctor",
    name: "",
    phone: "",
    email: "",
    password: "",
    cpf: "",
    gender: "",
    birthdate: "",
    address_attributes: {
      cep: "",
      city: "",
      state: "",
      neighborhood: "",
      street: "",
      number: "",
      latitude: "",
      longitude: "",
    },
    doctor_attributes: {
      work_area_id: "",
      work_specialty_id: "",
      council: "",
    },
    clinic_ids: [clinic.id],
  });

  const submitSignUpData = () => {
    setLoading(true);
    axios
      .post("/clinica/new_doctor", data)
      .then(() => setCurrentSection(({ step, role }) => ({ step: step + 1, role })))
      .catch((response) => {
        showAlert({ message: response.response.data });
      })
      .finally(() => setLoading(false));
  };

  const sectionConfig = {
    doctor: {
      0: (props) => <StartAccount {...props} clinic={clinic} />,
      1: (props) => <PersonalInfo {...props} />,
      2: (props) => (
        <ProfessionalInfo
          {...props}
          areaOptions={props.area_options}
          specialtyOptions={props.specialtyOptions}
          setSpecialtyOptions={props.setSpecialtyOptions}
        />
      ),
      3: (props) => (
        <AddressInfo
          {...props}
          submitSignUpData={props.submitSignUpData}
          processing={props.loading}
        />
      ),
      4: () => <FinishSignUp clinic={clinic} />,
    },
  };

  const renderCurrentSection = () => {
    const sectionRenderer = sectionConfig[currentSection.role]?.[currentSection.step];

    if (sectionRenderer) {
      return sectionRenderer({
        setSection: setCurrentSection,
        setData,
        data,
        terms,
        setTerms,
        submitSignUpData,
        loading,
        area_options,
        specialtyOptions,
        setSpecialtyOptions,
      });
    }

    return null;
  };

  const renderProgressDots = () => {
    if (currentSection.role === "doctor" && currentSection.step >= 4) {
      return null;
    }

    // Desconsidera a primeira e a ultima seção para a contagem
    const totalSections = Object.keys(sectionConfig[currentSection.role]).length;
    const relevantSectionsStart = 2;
    const currentSectionNumber = currentSection.step + 1;

    if (currentSectionNumber > 0) {
      const dots = [];
      for (let i = 1; i <= totalSections - relevantSectionsStart + 1; i++) {
        dots.push(
          <div
            key={`dot-${i}`}
            className={`size-3 flex-none rounded-full border-2 ${
              currentSectionNumber >= i ? "border-primary-400" : "border-primary-100"
            }`}
          />,
        );
        if (i < totalSections - relevantSectionsStart + 1) {
          dots.push(
            <div
              key={`line-${i}`}
              className={`h-[1.5px] w-[30%] ${
                currentSectionNumber > i ? "bg-primary-100" : "bg-coolGray-400"
              }`}
            />,
          );
        }
      }
      return (
        <div className="mb-10 flex w-full items-center justify-center transition-all duration-500">
          {dots}
        </div>
      );
    }
    return null;
  };

  const sectionWidthStyle = () => {
    if (currentSection.step === 0 || currentSection.step === 1) {
      return "";
    } else {
      return "md:max-w-[450px] max-w-screen-0.5sm";
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div
        className={`flex w-full flex-col gap-5 pt-28 max-lg:pb-8 max-md:px-5 lg:pt-16 ${sectionWidthStyle()}`}
      >
        <div className="flex h-fit items-center justify-center gap-6 rounded-2xl bg-white px-6 py-8">
          <img src={imagePath("teamLogo.svg")} />
          <Text className="text-center font-quicksand font-bold text-coolGray-950" size="2xl">
            {clinic.name}
          </Text>
        </div>
        {renderCurrentSection()}
        {renderProgressDots()}
      </div>
    </div>
  );
};

export default SignUpDoctor;
