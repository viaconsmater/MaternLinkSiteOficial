import { ArrowLongRightIcon } from "@heroicons/react/24/outline";
import { Link } from "@inertiajs/react";
import { Button, Text } from "@switchdreams/ui";
import React from "react";

import { imagePath } from "../../../utils";

const Options = [
  {
    label: "Ginecologia e Obstetrícia",
    
  },
  {
    label: "Clínica Médica",

  },
  {
    label: "Endocrinologia",
    
  },
  {
    label: "Infectologia",
  
  },
  {
    label: "Oncologia",
   
  },
  {
    label: "Dermatologia",
    
  },
  {
    label: "Urologia",
    
  },
  {
    label: "Reprodução Humana",
    
  },
  {
    label: "Psicologia Clínica",
   
  },
  {
    label: "Psicologia Perinatal",
  
  },
  {
    label: "Fisioterapia",
  
  },
  {
    label: "Pilates",
   
  },
  {
    label: "Nutricionista",
   
  },
  {
    label: "Neonatologia",
    
  },
  {
    label: "Pediatria",
    
  },
  {
    label: "Exames e Diagnósticos",
    
  },
  {
    label: "Farmácias de Manipulação",
    
  },
];

const AppealSection = () => {
  return (
    <div className="flex w-full justify-center bg-primary-400 py-36 max-lg:px-6">
      <div className="flex max-w-screen-big flex-col items-center gap-16 max-xl:px-6">
        <div className="flex w-full flex-col items-start max-lg:items-center max-lg:justify-center">
          <Text className="mb-8 font-poppins text-lg font-semibold text-secondary-25">
            ESPECIALIDADES
          </Text>
          <div className="flex w-full items-start justify-between max-lg:justify-center">
            <Text className="font-quickSand text-5xl font-semibold text-white max-xl:text-4xl max-lg:text-center">
              Especialidades mais procuradas
            </Text>
            <Link href="/sign_up">
              <Button
                label="Busque um especialista"
                className="flex w-fit rounded-2xl border border-primary-400 bg-primary-700 px-6 py-2 font-poppins text-sm font-medium text-white duration-500 hover:bg-primary-100 max-lg:hidden"
                iconSide="right"
                icon={ArrowLongRightIcon}
              />
            </Link>
          </div>
          <Text className="text-md font-regular mt-8 font-poppins text-coolGray-300 max-lg:text-center">
            Oferecemos uma ampla variedade de especialidades médicas para atender às suas
            necessidades de saúde.
          </Text>
        </div>
        <div className="grid grid-cols-3 gap-4 max-lg:grid-cols-2 max-sm:grid-cols-1 ">
          {Options.map((option, idx) => {
            return (
              <div
                className="flex items-center gap-4 rounded-2xl bg-primary-200 px-6 py-4"
                key={idx}
              >
                <img src={option.img} />
                <Text className="font-quickSand text-xl font-semibold text-white">
                  {option.label}
                </Text>
              </div>
            );
          })}
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
    </div>
  );
};

export default AppealSection;
