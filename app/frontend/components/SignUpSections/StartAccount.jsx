import { ArrowLongLeftIcon, EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { router } from "@inertiajs/react";
import { Button, CheckBox, Text, TextField, TextFieldMask } from "@switchdreams/ui";
import React, { useState } from "react";

import { useAlert } from "@/contexts/Alert";

const StartAccount = ({ setSection, data, setData, terms, setTerms, clinic = null }) => {
  const [passwordError, setPasswordError] = useState();
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState();
  const [phoneError, setPhoneError] = useState();
  const { showAlert } = useAlert();

  const nextStep = (e) => {
    e.preventDefault();
    if (data.email === "" || data.password === "" || data.phone === "" || data.name === "") {
      showAlert({ message: "Preencha todos os campos!", type: "warning" });
    } else if (passwordError || emailError || phoneError) {
      showAlert({ message: "Corrija o erro nos campos!", type: "warning" });
    } else if (terms !== true) {
      showAlert({
        message:
          "Você esqueceu de aceitar os termos de uso e política de privacidade. Por favor, marque a caixa antes de prosseguir.",
        type: "warning",
      });
    } else {
      setSection(({ step, role }) => ({ step: step + 1, role }));
    }
  };

  const showPasswordIcon = () => {
    setShowPassword(!showPassword);
  };

  const handlePasswordBlur = () => {
    if (data.password.length < 6) {
      setPasswordError("A senha deve ter no mínimo 6 caracteres.");
    } else {
      setPasswordError();
    }
  };

  const handleEmailBlur = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(data.email)) {
      setEmailError("Por favor, insira um email válido.");
    } else {
      setEmailError();
    }
  };

  const handlePhoneBlur = () => {
    const phoneRegex = /^\(\d{2}\) \d{5}-\d{4}$/;
    if (!phoneRegex.test(data.phone)) {
      setPhoneError("O telefone deve ter no mínimo 11 caracteres.");
    } else {
      setPhoneError();
    }
  };

  return (
    <>
      <Button
        label="voltar"
        iconSide="left"
        icon={ArrowLongLeftIcon}
        className="text-primary-500"
        onClick={() => {
          if (clinic) {
            router.get("/clinica");
          } else {
            setSection(({ step, role }) => ({ step: step - 1, role }));
          }
        }}
      />
      <div className="mb-8 w-full text-center">
        <Text className="font-quickSand text-3xl font-bold text-coolGray-900">Crie sua conta</Text>
        <Text className="font-regular text-sm text-coolGray-600">Insira seus dados de login.</Text>
      </div>
      <form onSubmit={(e) => nextStep(e)} className="w-full max-w-screen-big">
        <TextField
          name="name"
          label="Nome"
          className="rounded-xl"
          placeholder="Digite seu nome"
          value={data.name}
          onChange={(e) => setData("name", e.target.value)}
        />
        <TextFieldMask
          name="phone"
          mask="(99) 99999-9999"
          label="Telefone"
          type="text"
          className="rounded-xl"
          value={data.phone}
          error={phoneError && true}
          errorMsg={phoneError}
          placeholder="Digite seu telefone"
          onChange={(e) => setData("phone", e.target.value)}
          onBlur={() => {
            handlePhoneBlur();
          }}
        />
        <TextField
          name="email"
          label="Email"
          className="rounded-xl"
          placeholder="Digite seu email"
          type="email"
          value={data.email}
          onChange={(e) => setData("email", e.target.value)}
          onBlur={handleEmailBlur}
          error={emailError && true}
          errorMsg={emailError}
        />
        <TextField
          name="password"
          label="Senha"
          placeholder="•••••••••"
          type={showPassword ? "text" : "password"}
          rightIcon={showPassword ? EyeIcon : EyeSlashIcon}
          onClickIcon={showPasswordIcon}
          value={data.password}
          onChange={(e) => setData("password", e.target.value)}
          onBlur={handlePasswordBlur}
          error={passwordError && true}
          errorMsg={passwordError}
          className="rounded-xl"
        />
        <div className="my-4 flex items-center gap-4">
          <CheckBox size="small" onChange={() => setTerms(!terms)} checked={terms} />
          <Text className="font-regular text-sm">
            Aceito os
            <a
              className="font-regular text-sm text-primary-500"
              href="/TermosParceiros.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              {" "}
              Termos de uso{" "}
            </a>
            e
            <a
              className="font-regular text-sm text-primary-500"
              href="/PoliticaDePrivacidade.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              {" "}
              Política de privacidade{" "}
            </a>
            da Via Consultas
          </Text>
        </div>
        <Button
          label="Cadastre-se"
          className="mb-10 flex rounded-2xl bg-primary-500 px-6 py-2 text-sm font-medium text-white duration-500 hover:bg-primary-600"
          type="submit"
        />
      </form>
    </>
  );
};

export default StartAccount;
