import {
  BoltIcon,
  CheckBadgeIcon,
  ClipboardIcon,
  CursorArrowRippleIcon,
} from "@heroicons/react/24/outline";
import { Text } from "@switchdreams/ui";
import React from "react";

const Cells = [
  {
    icon: <BoltIcon alt="ícone de um raio" />,
    name: "Acesso prático e rápido",
    description:
      "Marque consultas médicas de onde estiver, sem a necessidade de deslocamentos. Agende seus horários de consulta com facilidade e rapidez.",
  },

  {
    icon: <CursorArrowRippleIcon alt="ícone de cursor do mouse" />,
    name: "Fácil e Intuitiva",
    description:
      "Uma plataforma intuitiva e fácil de usar, projetada para simplificar o processo de agendamento, tanto para os profissionais como para os pacientes.",
  },
  {
    icon: <ClipboardIcon alt="ícone de prancheta" />,
    name: "Especialidades Médicas",
    description:
      "Explore uma diversidade de especialidades médicas e encontre o profissional certo para atender às suas necessidades específicas de saúde.",
  },
];

const BenefitsSection = () => {
  return (
    <div className="flex max-w-screen-big flex-col items-center gap-10 md:py-32" id="benefits">
      <div className="flex w-full flex-col items-center justify-center gap-5 text-center">
        <Text className="font-poppins text-lg font-semibold text-secondary-900 max-xl:mt-16">
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
              className="flex size-72 flex-col gap-5 rounded-lg bg-white p-6 shadow-lg max-lg:items-center"
            >
              <div className="size-11 rounded-lg bg-secondary-25 p-3 text-secondary-700">
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
