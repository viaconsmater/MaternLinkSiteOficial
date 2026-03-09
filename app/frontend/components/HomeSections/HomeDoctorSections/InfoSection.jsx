import { Link } from "@inertiajs/react";
import { Button, Text } from "@switchdreams/ui";
import React from "react";

import { imagePath } from "../../../utils";

const InfoSection = () => {
  return (
    <div className="flex flex-col gap-8 pb-10" id="about">
      <div className="relative flex w-full items-center justify-center gap-10 py-14 max-lg:flex-col">
        <div className="absolute left-0 top-0 w-1/5 rounded-r-2xl bg-primary-200 max-lg:w-1/2 max-md:h-[17%] md:h-[42%] lg:h-full" />
        <img
          src={imagePath("meet.webp")}
          className=" z-10 w-[30%] max-lg:w-3/5"
          alt="pessoas em reunião de negócios"
        />
        <div className="z-10 flex w-1/2 flex-col justify-center gap-5 max-lg:w-full max-lg:items-center max-lg:pb-5 max-lg:text-center max-md:px-6 lg:px-10 xl:px-28">
          <Text className="font-poppins text-lg font-semibold text-secondary-900">SOBRE</Text>
          <Text className="font-quickSand text-5xl font-semibold text-coolGray-950 max-md:text-4xl">
            Oportunidade Para Médicos e Demais Profissionais de Saúde!
          </Text>
          <div className="flex flex-col gap-5">
            <Text className="text-md font-regular font-poppins text-coolGray-600">
              A plataforma <b>Via Consultas</b> está em sua fase inicial de cadastro de médicos e demais
              profissionais de saúde! Este é o momento ideal para se juntar a nós e garantir sua
              presença desde o início nesta jornada rumo à excelência em atendimento particular.
            </Text>
            <Text className="text-md font-regular font-poppins text-coolGray-600">
              Mas aqui vai um segredo que você não pode perder: logo em seguida, iniciaremos a
              prospecção e cadastro dos pacientes em nossa plataforma! Isso mesmo, uma oportunidade
              única de se posicionar à frente da concorrência e assegurar uma maior visibilidade
              para sua clínica ou consultório
            </Text>
            <Text className="text-md font-regular font-poppins text-coolGray-600">
              Não perca tempo! Ao se cadastrar agora, você estará na vanguarda dessa revolução na
              prestação de serviços de saúde, alcançando novos pacientes e expandindo sua prática de
              forma estratégica e eficaz.
            </Text>
          </div>
          <Link href="/sign_up">
            <Button
              label="Seja nosso parceiro"
              className="flex max-w-60 rounded-2xl bg-primary-500 px-6 py-2 font-poppins text-sm font-medium text-white duration-500 hover:bg-primary-100"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default InfoSection;
