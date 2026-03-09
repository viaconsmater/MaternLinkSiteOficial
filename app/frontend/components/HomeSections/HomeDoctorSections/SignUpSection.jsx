import { Link } from "@inertiajs/react";
import { Button, Text } from "@switchdreams/ui";
import React from "react";

import { imagePath } from "../../../utils";

const SignUpSection = () => {
  return (
    <div className="flex h-fit w-full items-center justify-center overflow-x-clip bg-secondary-550 max-lg:flex-col max-lg:gap-8 max-lg:pt-20 lg:h-[23rem]">
      <div className="relative flex h-full max-w-screen-big items-center justify-center">
        <div className="flex w-[80rem] flex-col gap-5 max-lg:w-full max-lg:items-center max-lg:justify-center max-md:px-6">
          <Text className="font-quickSand text-4xl font-semibold text-secondary-600 max-md:text-center max-md:text-2xl">
            É profissional da saúde?
          </Text>
          <Text className="font-quickSand text-4xl font-semibold text-secondary-600 max-md:text-center max-md:text-2xl">
            Seja nosso parceiro
          </Text>
          <Text className="text-md font-regular font-poppins text-coolGray-600 max-lg:text-center max-md:text-sm">
            Não perca esta oportunidade de fazer a diferença na vida dos pacientes e elevar sua
            prática a novos patamares. Cadastre-se hoje mesmo na Via Consultas e faça parte da
            revolução da saúde digital!
          </Text>
          <Link href="/home_profissionais">
            <Button
              label="Seja nosso parceiro"
              className="flex w-48 rounded-2xl bg-primary-500 px-6 py-2 font-poppins text-sm font-medium text-white duration-500 hover:bg-primary-300 max-lg:w-full"
            />
          </Link>
        </div>
        <img
          src={imagePath("doctors.png")}
          className="bottom-0 right-0 max-lg:hidden lg:absolute"
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
