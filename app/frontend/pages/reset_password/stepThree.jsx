import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { Link, useForm } from "@inertiajs/react";
import { Button, Text, TextField } from "@switchdreams/ui";
import React, { useState } from "react";

import ClickBack from "@/components/ClickBack";

const StepThree = ({ sid, code }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmationPassword, setShowConfirmationPassword] = useState(false);

  const showPasswordIcon = () => {
    setShowPassword(!showPassword);
  };

  const showConfirmationPasswordIcon = () => {
    setShowConfirmationPassword(!showConfirmationPassword);
  };

  const { data, setData, patch } = useForm({
    password: "",
    passwordConfirmation: "",
    sid: sid,
    code: parseInt(code),
  });

  const submitStepThreeData = (e) => {
    e.preventDefault();

    if (data.password !== data.passwordConfirmation) {
      alert("As senhas devem ser idênticas!");
      return;
    }

    patch("/reset_password", {
      onError: (e) => {
        alert(e);
      },
    });
  };

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center">
      <Link className="absolute left-0 top-10 w-full" href={`step_two?sid=${sid}`}>
        <ClickBack />
      </Link>
      <div className="relative flex size-full flex-col items-center justify-center px-4 md:px-28">
        <div className="mb-14 flex h-4/5 w-full flex-col justify-center py-32 pb-28 md:w-1/3">
          <Text size="sm" as="md" className="m-0 pt-5 text-center text-gray-600 md:pt-10">
            Esqueceu sua senha?
          </Text>
          <div className="flex justify-center gap-2">
            <Text size="3xl" as="h1" className="m-0 flex-none pb-14 pt-4 text-center text-gray-800">
              Crie uma
            </Text>
            <Text
              size="3xl"
              as="h1"
              className="m-0 flex-none pb-14 pt-4 text-center text-primary-500"
            >
              nova senha
            </Text>
          </div>
          <TextField
            label="Nova senha"
            placeholder="Insira sua nova senha"
            type={showPassword ? "text" : "password"}
            rightIcon={showPassword ? EyeIcon : EyeSlashIcon}
            onClickIcon={showPasswordIcon}
            onChange={(e) => setData("password", e.target.value)}
            required
            className="rounded-xl"
          />
          <TextField
            label="Confirme sua nova senha"
            placeholder="Insira sua nova senha novamente"
            type={showConfirmationPassword ? "text" : "password"}
            rightIcon={showConfirmationPassword ? EyeIcon : EyeSlashIcon}
            onClickIcon={showConfirmationPasswordIcon}
            onChange={(e) => setData("passwordConfirmation", e.target.value)}
            required
            className="rounded-xl"
          />
          <Button
            className="mt-8 flex rounded-2xl border border-primary-300 bg-primary-500 px-9 py-2 text-sm font-medium text-white duration-500 hover:bg-primary-300"
            label="Trocar senha"
            size="lg"
            onClick={submitStepThreeData}
          />
          <div className="flex w-full justify-between gap-4 pt-6">
            <div className="h-1 w-1/3 rounded-full bg-gray-100" />
            <div className="h-1 w-1/3 rounded-full bg-gray-100" />
            <div className="h-1 w-1/3 rounded-full bg-primary-500" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepThree;
