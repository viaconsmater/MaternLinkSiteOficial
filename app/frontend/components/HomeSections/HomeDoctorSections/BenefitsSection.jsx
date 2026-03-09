import {
  CalendarDaysIcon,
  CursorArrowRippleIcon,
  TvIcon,
  WrenchScrewdriverIcon,
} from "@heroicons/react/24/outline";
import { Text } from "@switchdreams/ui";
import React from "react";

const Cells = [
  {
    icon: <TvIcon alt="ícone de uma televisão" />,
    name: "Maior Visibilidade Profissional",
    description:
      "Potencialize sua visibilidade e influência profissional. Atraia uma ampla base de pacientes em busca de assistência médica e reduza as taxas de absenteísmo em sua clínica.",
  },
  {
    icon: <CalendarDaysIcon alt="ícone de calendário" />,
    name: "Flexibilidade de Agenda",
    description:
      "Aprimore sua prática médica com um gerenciamento de agenda flexível e personalizado. Cadastre sua clínica e ajuste seus horários de acordo com sua disponibilidade e preferência, simplificando o agendamento para você e seus pacientes",
  },
  {
    icon: <CursorArrowRippleIcon alt="ícone de cursor do mouse" />,
    name: "Fácil e Intuitiva",
    description:
      "Uma plataforma intuitiva e fácil de usar, automatizando as operações de agendamento, tanto para os profissionais como para os pacientes.",
  },
  {
    icon: <WrenchScrewdriverIcon alt="ícone de ferramentas" />,
    name: "Suporte Profissional",
    description:
      "Conte com o apoio da nossa equipe de profissionais sempre prontos para prestar o melhor atendimento de suporte e facilitar as etapas.",
  },
];

const BenefitsSection = () => {
  return (
    <div className="flex max-w-screen-big flex-col items-center gap-10 md:py-32" id="benefits">
      <div className="flex w-full flex-col items-center justify-center gap-5 text-center">
        <Text className="font-poppins text-lg font-semibold text-secondary-600 max-xl:mt-16">
          BENEFÍCIOS
        </Text>
        <Text className="font-quickSand text-5xl font-semibold text-coolGray-700">
          Descubra os Benefícios do Via Consultas
        </Text>
        <Text className="text-md font-regular w-[55%] font-poppins text-coolGray-600">
          Junte-se à nossa comunidade e experimente uma nova forma de cuidados de saúde. Com o
          Via Consultas, você desfrutará de:
        </Text>
      </div>
      <div className="flex w-full flex-wrap items-center justify-center gap-5 py-10">
        {Cells.map((cardCell, idx) => {
          return (
            <div
              key={idx}
              className="flex h-80 w-72 flex-col gap-5 rounded-lg bg-white p-6 shadow-lg max-lg:items-center"
            >
              <div className="size-11 rounded-lg bg-primary-25 p-3 text-primary-400">
                {cardCell.icon}
              </div>
              <Text className="font-quickSand text-xl font-bold text-coolGray-900 max-lg:text-center">
                {cardCell.name}
              </Text>
              <Text className="font-regular font-poppins text-sm text-coolGray-600 max-lg:text-center">
                {cardCell.description}
              </Text>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BenefitsSection;
