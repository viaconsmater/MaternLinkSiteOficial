import { Text } from "@switchdreams/ui";
import React from "react";

const AboutSection = () => {
  return (
    <div
      id="video"
      className="relative flex w-full items-center justify-center gap-10 pt-10 max-lg:mb-10 max-lg:flex-col xl:h-[40rem]"
    >
      <div className="z-4 absolute right-0 top-0 w-1/5 rounded-l-2xl bg-primary-200 max-lg:hidden max-lg:w-1/2 max-md:h-1/4 md:h-1/2 lg:h-3/5" />
      <div className="flex w-1/2 flex-col justify-center gap-5 py-20 max-lg:w-full max-lg:items-center max-lg:pb-5 max-lg:text-center lg:px-10 xl:px-24">
        <Text className="font-poppins text-lg font-semibold text-secondary-900">APRESENTAÇÃO</Text>
        <Text className="font-quickSand text-5xl font-semibold text-coolGray-700 max-lg:px-6 max-md:text-4xl">
          Conheça as soluções da nossa plataforma!
        </Text>
        <Text className="text-md font-regular font-poppins text-coolGray-600 max-lg:px-6">
          Em um cenário onde a eficiência e a integração são fundamentais, a <b> Via Consultas </b> surge como a solução inovadora que você esperava.
          Estamos lançando uma plataforma digital pensada para otimizar sua prática e elevar a qualidade do atendimento às mulheres em gestação e seus bebês.
        </Text>
      </div>
      <iframe
        title="Vídeo Institucional"
        allow="fullscreen;"
        loading="lazy"
        className="z-20 h-[65%] w-2/5 rounded-3xl max-xl:h-80 max-lg:w-[85%]"
        src="https://www.youtube.com/embed/CSevrMIdMcg?si=0QBfdXNRyYPnUmg0"
      />
    </div>
  );
};

export default AboutSection;
