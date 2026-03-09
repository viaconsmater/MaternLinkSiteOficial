import { Link } from "@inertiajs/react";
import { Button, Text } from "@switchdreams/ui";
import React from "react";

import { imagePath } from "../../../utils";

const SignUpSection = () => {
  return (
    <div className="flex h-fit w-full items-center justify-center overflow-x-clip bg-primary-400 max-lg:flex-col max-lg:gap-8 max-lg:pt-20 lg:h-[19rem]">
      <div className="relative flex h-full max-w-screen-big items-center justify-center">
        <div className="flex w-[80rem] flex-col gap-5 max-lg:w-full max-lg:items-center max-lg:justify-center max-md:px-6">
          <Text className="font-quickSand text-4xl font-semibold text-white max-md:text-center max-md:text-2xl">
            Precisa de atendimento?
          </Text>
          <Text className="text-md font-regular font-poppins text-coolGray-200 max-lg:text-center max-md:text-sm">
            Cuide da sua saúde e da saúde do seu bebê de forma prática e acessível.
            Junte-se ao Via Consultas e dê o primeiro passo para uma gestação mais segura e tranquila
          </Text>
          <Link href="/">
            <Button
              label="Busque um médico"
              className="flex w-48 rounded-2xl bg-white px-6 py-2 font-poppins text-sm font-medium text-primary-500 duration-500 hover:bg-primary-300 max-lg:w-full"
            />
          </Link>
        </div>
        <img
          src={imagePath("patientFooter.svg")}
          className="bottom-0 right-[-35rem] max-lg:hidden lg:absolute"
          alt="dois médicos fazendo coração com os estetoscópios"
        />
        <div className="w-full">
          <img
            src={imagePath("doctorsMobile.webp")}
            className="w-full object-contain lg:hidden"
            alt="dois médicos fazendo coração com os estetoscópios"
          />
        </div>
      </div>
    </div>
  );
};

export default SignUpSection;
