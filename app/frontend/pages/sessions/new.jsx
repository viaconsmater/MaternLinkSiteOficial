import { ArrowLongLeftIcon, EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { Link, useForm } from "@inertiajs/react";
import { Button, CheckBox, Text, TextField } from "@switchdreams/ui";
import React, { useState } from "react";

import { useAlert } from "@/contexts/Alert";
import { imagePath } from "@/utils";

const Login = () => {
  const { showAlert } = useAlert();
  const [showPassword, setShowPassword] = useState(false);
  const { setData, data, post } = useForm({
    email: "",
    password: "",
    remember: false,
  });

  const showPasswordIcon = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (data.email === "" || data.password === "") {
      showAlert({ message: "Preecha todos os campos!", type: "warning" });
    } else {
      post("/login", {
        onError: (error) => {
          showAlert({ message: error });
        },
        onSuccess: () => {
          showAlert({ message: "Login realizado com sucesso", type: "success" });
        },
      });
    }
  };

  return (
    <div className="flex h-[95vh] w-full">
      <div className="flex w-1/2 flex-col items-center justify-center max-lg:w-full max-lg:px-10">
        <Link href="/">
          <Button
            label="voltar à tela inicial"
            iconSide="left"
            icon={ArrowLongLeftIcon}
            className="text-primary-500"
          />
        </Link>
        <div className="mb-10 w-full text-center">
          <Text className="font-quickSand text-3xl font-bold text-coolGray-900">
            Entre na sua conta
          </Text>
          <Text className="font-regular text-sm text-coolGray-600">Seja bem-vindo de volta!</Text>
        </div>
        <form className="gap-5 pt-14" onSubmit={(e) => handleLogin(e)}>
          <TextField
            name="email"
            label="Email"
            className="rounded-xl"
            placeholder="Digite seu email"
            type="email"
            value={data.email}
            onChange={(e) => setData("email", e.target.value)}
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
            className="rounded-xl"
          />
          <div className="flex items-center justify-center gap-6 max-md:flex-col max-md:items-start max-md:gap-2">
            <div className="my-4 flex items-center gap-2">
              <CheckBox size="small" onChange={() => setData("remember", !data.remember)} />
              <Text className="font-regular text-sm text-coolGray-600">Mantenha-me conectado</Text>
            </div>
            <Link className="text-sm font-medium text-primary-500" href="/reset_password/step_one">
              Esqueci minha senha
            </Link>
          </div>
          <Button
            label="Entrar"
            className="mt-6 flex rounded-2xl bg-primary-500 px-6 py-2 text-sm font-medium text-white duration-500 hover:bg-primary-600"
            type="submit"
          />
          <Text className="font-regular mt-10 flex items-center justify-center gap-2 text-sm">
            Não possui uma conta?
            <Link className="font-regular text-sm text-primary-500" href="/sign_up">
              Cadastre-se aqui
            </Link>
          </Text>
        </form>
      </div>
      <div className="relative flex w-1/2 flex-col items-center justify-center gap-5 bg-primary-500 p-10 max-lg:hidden">
        <img src={imagePath("topLeft.webp")} className="absolute left-0 top-0 w-52" />
        <img src={imagePath("bottomRight.webp")} className="absolute bottom-0 right-0 w-80" />
        
        
        <img src={imagePath("login.webp")} className="w-2/3" />
        <Text className="font-quickSand text-center text-4xl font-bold text-white">
          Seja bem-vindo de volta!
        </Text>
      </div>
    </div>
  );
};

export default Login;
