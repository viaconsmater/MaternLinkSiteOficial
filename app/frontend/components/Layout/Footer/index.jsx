import { EnvelopeIcon, PhoneIcon } from "@heroicons/react/24/solid";
import { Link } from "@inertiajs/react";
import { Text } from "@switchdreams/ui";
import React from "react";

import { imagePath } from "../../../utils";

const Footer = () => {
  const links = [{ name: "Vantagens", href: "#benefits" }];

  const renderLinks = () => {
    return (
      <>
        <a href="https://wa.me//61996652148" target="_blank" rel="noopener noreferrer">
          <Text className="font-poppins text-sm text-white max-sm:font-semibold lg:font-semibold">
            Entre em contato
          </Text>
        </a>
        <a href="/PoliticaDePrivacidade.pdf" target="_blank" rel="noopener noreferrer">
          <Text className="font-poppins text-sm text-white max-sm:font-semibold lg:font-semibold">
            Política de privacidade
          </Text>
        </a>
        <a href="/TermosParceiros.pdf" target="_blank" rel="noopener noreferrer">
          <Text className="font-poppins text-sm text-white max-sm:font-semibold lg:font-semibold">
            Termos de uso
          </Text>
        </a>
        {links.map((link, index) => {
          return (
            <Link key={index} className="appearence-none" href={link.href}>
              <Text className="font-poppins text-sm text-white max-sm:font-semibold lg:font-semibold">
                {link.name}
              </Text>
            </Link>
          );
        })}
      </>
    );
  };

  return (
    <div className="bottom-0 flex w-full flex-col items-center justify-center gap-10 bg-primary-500 px-20 py-16 max-xl:flex-col max-xl:p-5 md:h-fit">
      <div className="flex w-full items-center max-lg:flex-col max-lg:gap-6 md:justify-between">
        <img src={imagePath("LogoMobile.svg")} alt="Logo matern link no rodapé" />
        <div className="flex gap-3 max-lg:hidden xl:gap-8">{renderLinks()}</div>
        <div className="flex gap-4 max-lg:gap-8">
          <a href="https://www.linkedin.com/company/viaconsultas" target="_blank" rel="noreferrer">
            <img
              src={imagePath("Linkeldin.png")}
              className="size-6"
              alt="Logo da plataforma linkedin"
            />
          </a>
          <a href="https://www.facebook.com/meuviaconsultas" target="_blank" rel="noreferrer">
            <img
              src={imagePath("Facebook.png")}
              className="size-6"
              alt="Logo da plataforma instagram"
            />
          </a>
          <a href="https://www.instagram.com/viaconsultas.saude" target="_blank" rel="noreferrer">
            <img
              src={imagePath("Instagram.png")}
              className="size-6"
              alt="Logo da plataforma instagram"
            />
          </a>
        </div>
      </div>
      <div className="w-full border border-primary-400 max-md:w-[70%]" />
      <div className="flex flex-col items-center justify-center gap-8 lg:hidden ">
        {renderLinks()}
      </div>
      <div className="flex w-full items-center md:justify-between">
        <Text className="font-poppins text-xs text-primary-25 max-lg:hidden">
          © 2024 Via Consultas. Todos os direitos reservados. Desenvolvido por 
          <a href="https://karythongomes.com.br" target="_blank" rel="noopener noreferrer"><strong> GomesTechnology</strong></a>  &  
          <a href="https://www.youtube.com/@pobre.vencedor?sub_confirmation=1"><strong>  Luciano Lopes</strong></a>

        </Text>
        <div className="flex gap-6 max-lg:w-full max-lg:flex-col max-lg:items-center max-lg:justify-center">
          <div className="flex gap-2 font-semibold text-white">
            <PhoneIcon className="size-6" />
            <a href="https://wa.me//61996652148">
              <Text className="font-poppins">+55 (61) 99665-2148</Text>
            </a>
          </div>
          <div className="flex gap-2 font-semibold text-white">
            <EnvelopeIcon className="size-6" />
            <Text className="font-poppins">viaconsmater@gmail.com</Text>
          </div>
        </div>
      </div>
      <Text className="text-center font-poppins text-sm text-primary-25 lg:hidden">
        © 2024 Via Consultas. Todos os direitos reservados. Desenvolvido por <a href="https://karythongomes.com.br" target="_blank" rel="noopener noreferrer"><strong>GomesTechnology</strong></a>
      </Text>
    </div>
  );
};

export default Footer;
