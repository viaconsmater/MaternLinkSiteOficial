import { useForm } from "@inertiajs/react";
import axios from "axios";
import React, { useState } from "react";

import AddressInfo from "@/components/SignUpSections/AddressInfo";
import DoctorTypeInfo from "@/components/SignUpSections/DoctorTypeInfo";
import FinishSignUp from "@/components/SignUpSections/FinishSignUp";
import LocationInfo from "@/components/SignUpSections/LocationInfo";
import PersonalInfo from "@/components/SignUpSections/PersonalInfo";
import ProfessionalInfo from "@/components/SignUpSections/ProfessionalInfo";
import StartAccount from "@/components/SignUpSections/StartAccount";
import UserTypeInfo from "@/components/SignUpSections/UserTypeInfo";
import { useAlert } from "@/contexts/Alert";

const SignUp = ({ area_options }) => {
  const { showAlert } = useAlert();
  const [currentSection, setCurrentSection] = useState({ step: 0, role: "patient" });
  const [loading, setLoading] = useState(false);
  const [specialtyOptions, setSpecialtyOptions] = useState([]);
  const [terms, setTerms] = useState(false);
  const { setData, data } = useForm({
    role: "",
    name: "",
    phone: "",
    email: "",
    password: "",
    cpf: "",
    gender: "",
    type: "",
    doctorType: "",
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
  });

  const submitSignUpData = () => {
    setLoading(true);
    axios
      .post("/sign_up", data)
      .then(() => setCurrentSection(({ step, role }) => ({ step: step + 1, role })))
      .catch((response) => {
        showAlert({ message: response.response.data });
      })
      .finally(() => setLoading(false));
  };

  const sectionConfig = {
    patient: {
      0: (props) => <UserTypeInfo {...props} />,
      1: (props) => <StartAccount {...props} />,
      2: (props) => <PersonalInfo {...props} />,
      3: (props) => (
        <AddressInfo
          {...props}
          submitSignUpData={props.submitSignUpData}
          processing={props.loading}
        />
      ),
      4: () => <FinishSignUp />,
    },
    doctor: {
      0: (props) => <UserTypeInfo {...props} />,
      1: (props) => <DoctorTypeInfo {...props} />,
      2: (props) => <StartAccount {...props} />,
      3: (props) => <PersonalInfo {...props} />,
      4: (props) => (
        <ProfessionalInfo
          {...props}
          areaOptions={props.area_options}
          specialtyOptions={props.specialtyOptions}
          setSpecialtyOptions={props.setSpecialtyOptions}
        />
      ),
      5: (props) => <LocationInfo {...props} />,
      6: (props) => (
        <AddressInfo
          {...props}
          submitSignUpData={props.submitSignUpData}
          processing={props.loading}
        />
      ),
      7: () => <FinishSignUp />,
    },
    manager: {
      0: (props) => <UserTypeInfo {...props} />,
      1: (props) => <DoctorTypeInfo {...props} />,
      2: (props) => <StartAccount {...props} />,
      3: (props) => <PersonalInfo {...props} />,
      4: (props) => <LocationInfo {...props} />,
      5: (props) => (
        <AddressInfo
          {...props}
          submitSignUpData={props.submitSignUpData}
          processing={props.loading}
        />
      ),
      6: () => <FinishSignUp />,
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
    if (
      (currentSection.role === "doctor" &&
        (currentSection.step === 1 || currentSection.step >= 7)) ||
      (currentSection.role === "manager" &&
        (currentSection.step === 1 || currentSection.step >= 6)) ||
      (currentSection.role === "patient" && currentSection.step >= 4)
    ) {
      // Não renderiza dots nas telas de DoctorTypeInfo e FinishSignUp para doctors
      // e na tela de FinishSignUp para patients
      return null;
    }

    // Desconsidera a primeira e a ultima seção para a contagem
    const totalSections = Object.keys(sectionConfig[currentSection.role]).length - 2;
    const relevantSectionsStart =
      currentSection.role === "doctor" || currentSection.role === "manager" ? 2 : 1;
    const currentSectionNumber =
      currentSection.step >= relevantSectionsStart
        ? currentSection.step - relevantSectionsStart + 1
        : 0;

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
    if (
      currentSection.step === 0 ||
      (currentSection.step === 1 && (data.role === "doctor" || data.role === "manager"))
    ) {
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
        {renderCurrentSection()}
        {renderProgressDots()}
      </div>
    </div>
  );
};

export default SignUp;
