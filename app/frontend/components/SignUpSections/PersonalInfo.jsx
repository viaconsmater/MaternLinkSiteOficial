import { ArrowLongLeftIcon } from "@heroicons/react/24/outline";
import { Button, SelectBox, Text, TextField, TextFieldMask } from "@switchdreams/ui";
import React, { useState } from "react";

import { genderOptions } from "@/constants/SelectOptions";
import { useAlert } from "@/contexts/Alert";

const PersonalInfo = ({ setSection, data, setData }) => {
  const { showAlert } = useAlert();
  const [cpfError, setCpfError] = useState("");
  const [ageError, setAgeError] = useState("");

  const nextStep = (e) => {
    e.preventDefault();
    if (data.cpf === "" || data.gender === "" || data.birthdate === "") {
      showAlert({ message: "Preencha todos os campos!", type: "warning" });
    } else if (ageCheck(data.birthdate)) {
      setSection(({ step, role }) => ({ step: step + 1, role }));
    } else {
      showAlert({ message: "Você deve ter pelo menos 18 anos para prosseguir!", type: "warning" });
    }
  };

  const ageCheck = (birthdate) => {
    const today = new Date();
    const birthDate = new Date(birthdate);
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      if (age < 18) {
        setAgeError("Você deve ter no mínimo 18 anos de idade");
      }
      return age >= 18;
    }
    if (age < 18) {
      setAgeError("Você deve ter no mínimo 18 anos de idade");
    }
    return age >= 18;
  };

  const handleCPFBlur = () => {
    const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
    if (!cpfRegex.test(data.cpf)) {
      setCpfError("O CPF deve estar no formato 999.999.999-99.");
    } else {
      setCpfError("");
    }
  };

  return (
    <>
      <Button
        label="voltar"
        iconSide="left"
        icon={ArrowLongLeftIcon}
        className="text-primary-500"
        onClick={() => setSection(({ step, role }) => ({ step: step - 1, role }))}
      />
      <div className="mb-8 w-full text-center">
        <Text className="font-quickSand text-3xl font-bold text-coolGray-900">
          Continue seu cadastro
        </Text>
        <Text className="font-regular text-sm text-coolGray-600">Insira seus dados pessoais.</Text>
      </div>
      <form onSubmit={(e) => nextStep(e)} className="flex w-[28rem] flex-col gap-4 max-sm:w-full">
        <TextFieldMask
          name="cpf"
          mask="999.999.999-99"
          label="CPF"
          type="text"
          placeholder="Digite seu CPF"
          value={data.cpf}
          className="w-full rounded-xl"
          errorMsg={cpfError}
          error={cpfError && true}
          onChange={(e) => setData("cpf", e.target.value)}
          onBlur={() => handleCPFBlur()}
        />
        <SelectBox
          name="gender"
          label="Gênero"
          className="max-w-md rounded-xl"
          placeholder="Selecione seu gênero"
          options={genderOptions}
          value={data.gender}
          onChange={(e) => setData("gender", e)}
        />
        <TextField
          label="Data de nascimento"
          className="rounded-xl"
          placeholder="dd/mm/aaaa"
          value={data.birthdate}
          type="date"
          errorMsg={ageError}
          error={ageError && true}
          onChange={(e) => setData("birthdate", e.target.value)}
          name="birthdate"
        />

        <Button
          label="Continuar"
          className="mb-10 flex rounded-2xl bg-primary-500 px-6 py-2 text-sm font-medium text-white duration-500 hover:bg-primary-600"
          type="submit"
        />
      </form>
    </>
  );
};

export default PersonalInfo;
