import {
  ArrowLongLeftIcon,
  ChevronRightIcon,
  PlusCircleIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { Link } from "@inertiajs/react";
import { Button, Text } from "@switchdreams/ui";
import React from "react";

const UserType = ({ setSection, setData }) => {
  return (
    <>
      <Link href="/">
        <Button
          label="voltar à tela inicial"
          iconSide="left"
          icon={ArrowLongLeftIcon}
          className="text-primary-500"
        />
      </Link>
      <div className="mb-8 w-full text-center">
        <Text className="font-quickSand text-3xl font-bold text-coolGray-900">
          Selecione seu objetivo na Via Consultas
        </Text>
      </div>
      <div className="flex gap-8 max-lg:flex-col max-lg:items-center max-lg:justify-center max-md:px-5">
        <div
          type="submit"
          onClick={() => {
            setData("role", "patient");
            setSection((oldSection) => ({ step: oldSection.step + 1, role: "patient" }));
          }}
          className="flex w-96 cursor-pointer flex-col justify-start gap-6 rounded-3xl border border-primary-25 p-6 transition-all duration-500 hover:scale-105 max-md:w-full"
        >
          <div className="w-fit rounded-xl bg-secondary-25 p-2">
            <UserIcon className="h-8 text-secondary-700" />
          </div>
          <div className="flex w-full flex-col gap-4">
            <Text className="font-quickSand text-2xl font-semibold text-coolGray-950">
              Sou paciente
            </Text>
            <Text className="font-regular font-poppins text-sm text-coolGray-600">
              Quero ser atendido pelos melhores especialistas da minha região.
            </Text>
          </div>
          <div>
            <ChevronRightIcon className="h-4 text-secondary-700" />
          </div>
        </div>
        <div
          type="submit"
          onClick={() => {
            setData("role", "doctor");
            setSection((oldSection) => ({ step: oldSection.step + 1, role: "doctor" }));
          }}
          className="flex w-96 cursor-pointer flex-col justify-start gap-6 rounded-3xl border border-primary-25 p-6 transition-all duration-500 hover:scale-105 max-md:w-full"
        >
          <div className="w-fit rounded-xl bg-primary-25 p-2">
            <PlusCircleIcon className="h-8 text-primary-700" />
          </div>
          <div className="flex w-full flex-col gap-4">
            <Text className="font-quickSand text-2xl font-semibold text-coolGray-950">
              Sou profissional da saúde
            </Text>
            <Text className="font-regular font-poppins text-sm text-coolGray-600">
              Trabalho na área da saúde e quero atender mais pacientes de forma simplificada.
            </Text>
          </div>
          <div>
            <ChevronRightIcon className="h-4 text-primary-400" />
          </div>
        </div>
      </div>
    </>
  );
};

export default UserType;
