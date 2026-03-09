import { AccordionMenu, Text } from "@switchdreams/ui";
import React from "react";

const FaqSection = () => {
  return (
    <div className="mb-40 max-w-screen-big max-xl:px-6 max-lg:w-full">
      <div className="flex w-full flex-col items-center justify-center gap-5 py-20 text-center ">
        <Text className="font-poppins text-lg font-semibold text-secondary-600">
          PERGUNTAS FREQUENTES (FAQ)
        </Text>
        <Text className="font-quickSand text-5xl font-semibold text-coolGray-700 max-md:text-4xl">
          Tire suas dúvidas
        </Text>
        <Text className="text-md font-regular font-poppins text-coolGray-600">
          Bem-vindo à nossa seção de Perguntas Frequentes (FAQ)! Aqui, reunimos as dúvidas mais
          comuns dos nossos usuários para oferecer respostas claras e abrangentes. Se você tem
          perguntas sobre como funciona a <b>Via Consultas</b>, como se cadastrar, ou qualquer outro
          aspecto relacionado à nossa plataforma, você está no lugar certo! Explore as perguntas
          abaixo para encontrar as respostas que você precisa:
        </Text>
      </div>
      <AccordionMenu title="Quais são os principais benefícios de me cadastrar na plataforma Via Consultas?">
        <Text className="font-poppins text-base	">
          Ao se cadastrar no Via Consultas, você passa a fazer parte de uma plataforma especializada 
          em saúde materna e gestacional. Sua clínica ou consultório ganha mais visibilidade para 
          gestantes e famílias, com maior alcance de pacientes, agendamentos facilitados, autonomia 
          em relação a convênios, organização financeira, redução de faltas e cancelamentos, além de 
          flexibilidade na gestão da agenda. Tudo pensado para tornar o atendimento mais humano, eficiente e acolhedor.
        </Text>
      </AccordionMenu>
      <AccordionMenu title="Como funciona o processo de agendamento de consultas pelas gestantes através do Via Consultas?">
        <Text className="font-poppins text-base	">
          O agendamento de consultas no Via Consultas é simples, rápido e intuitivo. As gestantes 
          podem acessar a plataforma, encontrar profissionais e clínicas especializadas em maternidade, 
          verificar os horários disponíveis e marcar suas consultas com poucos cliques. Isso garante praticidade, 
          conforto e uma experiência segura durante todas as etapas da gestação.
        </Text>
      </AccordionMenu>
      <AccordionMenu title="Como o Via Consultas garante a segurança e privacidade dos meus dados e dos meus pacientes?">
        <Text className="font-poppins text-base	">
          No <b>Via Consultas</b>, a proteção das informações é prioridade. Utilizamos medidas avançadas 
          de segurança para garantir a privacidade dos dados de profissionais e pacientes. Seguimos 
          rigorosamente as normas de proteção de dados, oferecendo um ambiente digital confiável, 
          seguro e adequado para o cuidado com a saúde materna.
        </Text>
      </AccordionMenu>
      <AccordionMenu title="Como posso obter suporte técnico em caso de dúvidas ou problemas com a plataforma?">
        <Text className="font-poppins text-base	">
         Nossa equipe está pronta para te apoiar! Caso surja qualquer 
         dúvida ou dificuldade técnica, o suporte do <b>Via Consultas</b> está 
         disponível para oferecer um atendimento rápido, humanizado e eficiente. 
         Você pode entrar em contato pelos nossos canais de atendimento e contar 
         com uma experiência tranquila durante o uso da plataforma.
        </Text>
      </AccordionMenu>
    </div>
  );
};

export default FaqSection;
