import { PlayCircleIcon } from "@heroicons/react/24/solid";
import { Link } from "@inertiajs/react";
import { Button, Text } from "@switchdreams/ui";
import React from "react";

import { imagePath } from "../../../utils";

const HeroSection = () => {
  return (
    <div className="relative flex h-auto w-full flex-col justify-center bg-primary-500 max-xl:items-center max-lg:pt-16 lg:w-[96%] lg:rounded-b-2xl xl:h-[39rem]">
      <div className="z-10 flex size-full flex-col justify-center gap-6 max-xl:items-center max-xl:px-6 xl:absolute xl:w-3/5 xl:pl-32 2xl:w-3/5 3xl:w-1/2">
        <Text className="font-poppins text-lg font-semibold text-secondary-25 max-xl:mt-16">
          VIA CONSULTAS
        </Text>
        <Text className="font-quickSand text-6xl font-semibold leading-snug text-white max-xl:text-center">
          Mais pacientes particulares com menos burocracia.
        </Text>
        <div className="flex flex-col gap-5">
          <Text className="font-regular text-md font-poppins text-coolGray-300 max-xl:text-center">
            Não dependa de Planos de Saúde.
          </Text>
          <Text className="font-regular text-md font-poppins text-coolGray-300 max-xl:text-center">
            Tenha mais pacientes particulares na sua Clínica, com agendamentos e pagamentos
            totalmente automatizados.
          </Text>
        </div>
        <div className="mt-4 flex w-full gap-4 max-xl:flex-col xl:w-4/5">
          <Link href="/sign_up" className="w-full xl:w-4/5">
            <Button
              label="Seja nosso parceiro"
              className="flex rounded-2xl bg-white px-9 py-2 font-poppins text-sm font-medium text-primary-500 duration-500 hover:bg-primary-300 hover:text-white w-full"
            />
          </Link>
          <Link href="#video" className="w-full">
            <Button
              label="Conheça a Via Consultas"
              className="flex w-full rounded-2xl border border-primary-300 bg-primary-500 px-7 py-2 font-poppins text-sm font-medium text-white duration-500 hover:bg-primary-300"
              iconSide="left"
              icon={PlayCircleIcon}
            />
          </Link>
        </div>
      </div>
      <img
        src={imagePath("HeroDoctor.webp")}
        width="600px"
        className="z-5 bottom-0 right-0 xl:absolute"
        alt="Médico sorrindo de braços cruzados"
      />
    </div>
  );
};

export default HeroSection;
