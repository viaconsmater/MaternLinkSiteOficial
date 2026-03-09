import {
  ArrowLongLeftIcon,
  ChevronRightIcon,
  MapPinIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { Button, Text } from "@switchdreams/ui";
import React from "react";

const DoctorType = ({ setData, setSection }) => {
  return (
    <>
      <Button
        label="voltar"
        iconSide="left"
        icon={ArrowLongLeftIcon}
        className="text-primary-500"
        onClick={() => {
          setSection(({ step, role }) => ({ step: step - 1, role }));
        }}
      />
      <div className="mb-8 w-full text-center">
        <Text className="font-quickSand text-3xl font-bold text-coolGray-900">
          Em qual perfil você se encaixa?
        </Text>
      </div>
      <div className="flex gap-8 max-lg:flex-col max-lg:items-center max-lg:justify-center max-md:px-5">
        <div
          type="submit"
          onClick={() => {
            setData((oldData) => {
              return {
                ...oldData,
                role: "doctor", // ✅ MUDANÇA: sempre "doctor"
                doctorType: "clinic", // ✅ Adicionar campo para diferenciar
                doctor_attributes: {
                  council: "",
                  work_area_id: "",
                  work_specialty_id: "",
                  price_cents: 0,
                },
                clinics_attributes: {
                  name: "",
                  cnpj: "",
                  description: "",
                  pix_key: "",
                  pix_type: "",
                  exam_enabled: "",
                },
              };
            });
            setSection((oldSection) => ({ step: oldSection.step + 1, role: "doctor" }));
          }}
          className="flex w-96 cursor-pointer flex-col justify-start gap-6 rounded-3xl border border-primary-25 p-6 transition-all duration-500 hover:scale-105 max-md:w-full"
        >
          <div className="w-fit rounded-xl bg-primary-25 p-2">
            <MapPinIcon className="h-8 text-primary-700" />
          </div>
          <div className="flex w-full flex-col gap-4">
            <Text className="font-quickSand text-2xl font-semibold text-coolGray-950">
              Clínica Privada
            </Text>
            <Text className="font-regular font-poppins text-sm text-coolGray-600">
              Possuo uma clínica com um time de profissionais da saúde e quero integrá-los na
              Via Consultas.
            </Text>
          </div>
          <div>
            <ChevronRightIcon className="h-4 text-primary-400" />
          </div>
        </div>
        <div
          type="submit"
          onClick={() => {
            setData((oldData) => {
              return {
                ...oldData,
                role: "doctor", // ✅ MUDANÇA: sempre "doctor"
                doctorType: "autonomy", // ✅ Adicionar campo para diferenciar
                doctor_attributes: {
                  council: "",
                  work_area_id: "",
                  work_specialty_id: "",
                  price_cents: 0,
                },
                clinics_attributes: {
                  name: "",
                  cnpj: "",
                  description: "",
                  pix_key: "",
                  pix_type: "",
                  exam_enabled: "",
                },
              };
            });
            setSection((oldSection) => ({ step: oldSection.step + 1, role: "doctor" }));
          }}
          className="flex w-96 cursor-pointer flex-col justify-start gap-6 rounded-3xl border border-primary-25 p-6 transition-all duration-500 hover:scale-105 max-md:w-full"
        >
          <div className="w-fit rounded-xl bg-primary-25 p-2">
            <UserIcon className="h-8 text-primary-700" />
          </div>
          <div className="flex w-full flex-col gap-4">
            <Text className="font-quickSand text-2xl font-semibold text-coolGray-950">
              Consultório autônomo
            </Text>
            <Text className="font-regular font-poppins text-sm text-coolGray-600">
              Sou profissional autônomo e possuo um consultório próprio para atender meus pacientes.
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

export default DoctorType;