import { ArrowLongRightIcon } from "@heroicons/react/24/outline";
import { Link } from "@inertiajs/react";
import { Button, Text } from "@switchdreams/ui";
import React from "react";

import { imagePath } from "../../../utils";

const AppealSection = () => {
  return (
    <div className="flex w-full flex-col items-center gap-16 bg-primary-500 py-36 max-lg:px-6">
      <div className="flex items-center justify-center sm:justify-between sm:gap-10">
        <Text className="font-quickSand text-5xl font-semibold text-white max-xl:text-4xl max-lg:text-center">
          Consultas e exames ao alcance de todos
        </Text>
        <Link href="/sign_up">
          <Button
            label="Cadastre-se agora"
            className="flex w-fit rounded-2xl border border-primary-400 bg-primary-300 px-6 py-2 font-poppins text-sm font-medium text-white duration-500 hover:bg-primary-100 max-lg:hidden"
            iconSide="right"
            icon={ArrowLongRightIcon}
          />
        </Link>
      </div>
      <div className="flex items-center justify-between gap-8 max-xl:flex-col">
        <div className="flex items-center justify-center gap-6 ">
          <img
            src={imagePath("Icon1.svg")}
            alt="ícone de pessoa de braços abertos"
            className="size-[55px]"
          />
          <div className="w-80 max-md:w-full">
            <div className="flex gap-1">
              <Text className="font-quickSand text-xl font-semibold text-white">Para o</Text>
              <Text className="font-quickSand text-xl font-semibold text-coolGray-700">
                paciente
              </Text>
            </div>
            <Text className="font-regular text-md font-poppins text-coolGray-200">
              atendimento de qualidade, em tempo hábil e com valores mais acessíveis.
            </Text>
          </div>
        </div>
        <div className="h-20 w-px bg-coolGray-700 max-xl:h-px max-xl:w-4/5" />
        <div className="flex items-center justify-center gap-6 ">
          <img src={imagePath("Icon2.svg")} alt="Ícone de estetoscópio" className="size-[55px]" />
          <div className="w-80 max-md:w-full">
            <div className="flex gap-1">
              <Text className="font-quickSand text-xl font-semibold text-white">Para os</Text>
              <Text className="font-quickSand text-xl font-semibold text-coolGray-700">
                profissionais
              </Text>
            </div>
            <Text className="font-regular text-md font-poppins text-coolGray-200">
              Promovemos suas Clínicas ampliando o número de pacientes para completar suas agendas.
            </Text>
          </div>
        </div>
        <div className="h-20 w-px bg-coolGray-700 max-xl:h-px max-xl:w-4/5" />
        <div className="flex items-center justify-center gap-6 ">
          <img
            src={imagePath("Icon3.svg")}
            alt="ícone com grupo de pessoas"
            className="size-[55px]"
          />
          <div className="w-80 max-md:w-full">
            <div className="flex gap-1">
              <Text className="font-quickSand text-xl font-semibold text-white">Para a</Text>
              <Text className="font-quickSand text-xl font-semibold text-coolGray-700">
                sociedade
              </Text>
            </div>
            <Text className="font-regular text-md font-poppins text-coolGray-200">
              facilitar o acesso aos profissionais de saúde, proporcionando maior qualidade de vida
            </Text>
          </div>
        </div>
      </div>
      <Link href="/sign_up">
        <Button
          label="Cadastre-se agora"
          className="flex w-full rounded-2xl border border-primary-400 bg-primary-500 px-10 py-2 font-poppins text-sm font-medium text-white duration-500 hover:bg-primary-600 lg:hidden"
          iconSide="right"
          icon={ArrowLongRightIcon}
        />
      </Link>
    </div>
  );
};

export default AppealSection;
