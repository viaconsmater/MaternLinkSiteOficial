import {
  ClockIcon,
  CreditCardIcon,
  DevicePhoneMobileIcon,
  EyeDropperIcon,
  HeartIcon,
  HomeModernIcon,
} from "@heroicons/react/24/outline";
import { Button, Text } from "@switchdreams/ui";
import React from "react";

import { imagePath } from "@/utils";

const ClubSection = () => {
  return (
    <div className="flex h-[50rem] w-full items-center justify-center overflow-hidden max-xl:h-fit max-xl:px-5 max-xl:py-20">
      <div className="relative flex h-fit w-full max-w-screen-big overflow-hidden rounded-[32px] bg-primary-500 p-12 max-xl:flex-col max-xl:items-center">
        <img
          alt="Imagem seção de clube"
          src={imagePath("doctorsClub.webp")}
          className="absolute bottom-0 left-0 h-52 max-xl:hidden"
        />
        <div className="flex w-[55%] flex-col gap-8 max-xl:items-center max-xl:justify-center max-xl:pb-5 max-lg:w-full">
          <Text className="font-poppins font-semibold text-secondary-500" size="lg">
            CLUBE
          </Text>
          <Text className="font-quicksand text-3xl font-semibold leading-snug text-white max-xl:text-center">
            Conheça nossas soluções em TELEMEDICINA e as vantagens do Clube de Benefícios.
          </Text>
          <a href="https://sejateleviaconsultas.com.br/" target="_blank" rel="noopener noreferrer">
            <Button
              label="Adquira o seu plano"
              className="rounded-2xl bg-secondary-500 font-poppins text-sm font-medium text-white"
            />
          </a>
        </div>
        <div className="flex w-fit flex-wrap justify-end gap-4 max-xl:justify-center">
          <div className="flex h-60 w-full max-w-56 flex-col gap-4 rounded-3xl bg-primary-400 p-6 max-sm:max-w-full max-sm:items-center">
            <div className="flex size-10 items-center justify-center rounded-xl bg-[#E6F7F61A]">
              <ClockIcon className="h-7 text-secondary-400" />
            </div>
            <Text className="font-quicksand text-sm font-semibold text-white max-sm:text-center">
              Telemedicina 24h com 36 especialidades médicas
            </Text>
          </div>
          <div className="flex h-60 w-full max-w-56 flex-col gap-4 rounded-3xl bg-primary-400 p-6 max-sm:max-w-full max-sm:items-center">
            <div className="flex size-10 items-center justify-center rounded-xl bg-[#E6F7F61A]">
              <DevicePhoneMobileIcon className="h-7 text-secondary-400" />
            </div>
            <Text className="font-quicksand text-sm font-semibold text-white max-sm:text-center">
              Telepsicologia
            </Text>
          </div>
          <div className="flex h-60 w-full max-w-56 flex-col gap-4 rounded-3xl bg-primary-400 p-6 max-sm:max-w-full max-sm:items-center">
            <div className="flex size-10 items-center justify-center rounded-xl bg-[#E6F7F61A]">
              <CreditCardIcon className="h-7 text-secondary-400" />
            </div>
            <Text className="font-quicksand text-sm font-semibold text-white max-sm:text-center">
              Desconto em exames laboratoriais e de imagem
            </Text>
          </div>
          <div className="flex h-60 w-full max-w-56 flex-col justify-between rounded-3xl bg-primary-400 p-6 max-sm:max-w-full">
            <div className="flex flex-col gap-4 max-sm:items-center">
              <div className="flex size-10 items-center justify-center rounded-xl bg-[#E6F7F61A]">
                <EyeDropperIcon className="h-7 text-secondary-400" />
              </div>
              <Text className="font-quicksand text-sm font-semibold text-white max-sm:text-center">
                Descontos em medicamentos nas principais Drogarias do país.
              </Text>
            </div>
            <div className="flex flex-col max-sm:items-center">
              <Text className="font-regular font-poppins text-primary-50" size="sm">
                Até
              </Text>
              <Text className="font-quicksand text-xl font-bold text-white">60%</Text>
            </div>
          </div>
          <div className="flex h-60 w-full max-w-56 flex-col justify-between rounded-3xl bg-primary-400 p-6 max-sm:max-w-full">
            <div className="flex flex-col gap-4 max-sm:items-center">
              <div className="flex size-10 items-center justify-center rounded-xl bg-[#E6F7F61A]">
                <HeartIcon className="h-7 text-secondary-400" />
              </div>
              <Text className="font-quicksand text-sm font-semibold text-white max-sm:text-center">
                Seguro de Vida Porto Seguro + Assitência Funeral
              </Text>
            </div>
            <div className="flex flex-col max-sm:items-center">
              <Text className="font-regular font-poppins text-primary-50" size="sm">
                Corbetura de
              </Text>
              <Text className="font-quicksand text-xl font-bold text-white">R$ 120.000,00</Text>
            </div>
          </div>
          <div className="flex h-60 w-full max-w-56 flex-col justify-between rounded-3xl bg-primary-400 p-6 max-sm:max-w-full">
            <div className="flex flex-col gap-4 max-sm:items-center">
              <div className="flex size-10 items-center justify-center rounded-xl bg-[#E6F7F61A]">
                <HomeModernIcon className="h-7 text-secondary-400" />
              </div>
              <Text className="font-quicksand text-sm font-semibold text-white max-sm:text-center">
                Descontos de até 70% nas rede de lojas credenciadas em todo o Brasil!
              </Text>
            </div>
            <div className="flex flex-col max-sm:items-center">
              <Text className="font-regular font-poppins text-primary-50" size="sm">
                24h por dia
              </Text>
              <Text className="font-quicksand text-xl font-bold text-white">Incluso</Text>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClubSection;
