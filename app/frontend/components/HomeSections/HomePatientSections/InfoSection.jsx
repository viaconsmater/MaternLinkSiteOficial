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
          src={imagePath("doctorCheckup.webp")}
          className="z-10 w-[30%] max-lg:w-3/5 rounded-[70px] shadow-lg"
          alt="médica fazendo um exame"
        />

        <div className="z-10 flex w-1/2 flex-col justify-center gap-5 max-lg:w-full max-lg:items-center max-lg:pb-5 max-lg:text-center xl:px-44">
          <Text className="font-poppins text-lg font-semibold text-secondary-900">SOBRE</Text>
          <Text className="font-quickSand text-5xl font-semibold text-coolGray-700 max-md:text-4xl">
            Mas, o que nós fazemos?
          </Text>
          <div className="flex flex-col gap-5">
            <Text className="text-md font-regular font-poppins text-coolGray-600">
              Sabemos que a jornada da gravidez exige um acompanhamento multidisciplinar e coordenado. 
              A <b>Via Consultas </b> foi desenvolvida para ser a sua ponte, conectando você a uma rede de pacientes e colegas, e simplificando o processo de cuidado.
            </Text>

            {/* 
            <Text className="text-md font-regular font-poppins text-coolGray-600">
              Ao integrar-se à Via Consultas, você terá:
              <br /> <b>Agendamento Simplificado e Inteligente:</b> Otimize sua agenda com um sistema de agendamento de consultas e exames 
              diagnósticos intuitivo e eficiente, reduzindo o tempo administrativo e focando no que realmente importa: a paciente.
            </Text>
            <Text className="text-md font-regular font-poppins text-coolGray-600">
              <b>Acesso a um Público Altamente Qualificado:</b> Conecte-se diretamente com mulheres que buscam o melhor acompanhamento para sua gestação 
              e o desenvolvimento de seus bebês, expandindo sua base de pacientes de forma estratégica.
            </Text>
            <Text className="text-md font-regular font-poppins text-coolGray-600">
              <b>Colaboração Multidisciplinar Facilitada:</b> Faça parte de um ecossistema de saúde integrado, 
              onde o acesso a outras especialidades – da ginecologia à pediatria, nutrição, fisioterapia, psicologia e muito mais – é fluido, 
              promovendo uma abordagem holística e completa para suas pacientes.
            </Text>

            <Text className="text-md font-regular font-poppins text-coolGray-600">
              <b>Reconhecimento e Visibilidade:</b>  Posicione sua expertise em 
              uma plataforma que valoriza a excelência, tornando-se referência no cuidado materno-infantil e fortalecendo sua reputação profissional.
            </Text>

            <Text className="text-md font-regular font-poppins text-coolGray-600">
              <b>Conforto e Segurança para Suas Pacientes:</b>  Ofereça às suas pacientes a tranquilidade de uma jornada de gravidez organizada e segura, com todos
               os recursos necessários ao alcance de um clique – um diferencial que reflete positivamente em sua prática.
            </Text>
                */}
          </div>
          <Link href="/sign_up">
            <Button
              label="Marque uma consulta"
              className="flex max-w-60 rounded-2xl bg-primary-500 px-6 py-2 font-poppins text-sm font-medium text-white duration-500 hover:bg-primary-100"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default InfoSection;
