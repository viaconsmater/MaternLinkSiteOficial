import { Link } from "@inertiajs/react";
import { Button, Text } from "@switchdreams/ui";
import React from "react";

const pricingData = [
  {
    type: "Mensal",
    name: "ideal para iniciar",
    tax: "7.5%",
  },
  {
    type: "Trimestral",
    name: "Três meses com taxa reduzida",
    tax: "5%",
    installments: "Até 3x de",
  },
  {
    type: "Semestral",
    name: "Plano Ideal + Popular",
    tax: "5%",
    installments: "Até 6x de",
  },
  {
    type: "Anual",
    name: "Compromisso anual com excelência",
    tax: "5%",
    installments: "Até 12x de",
  },
];

const calculateValue = (type, number) => {
  const prices = {
    Mensal: ["150,00", "150,00", "150,00", "150,00"],
    Trimestral: ["150,00", "140,00", "130,00", "120,00"],
    Semestral: ["125,00", "115,00", "110,00", "105,00"],
    Anual: ["100,00", "95,00", "90,00", "80,00"],
  };
  const index = Math.min(number, prices[type].length - 1);
  return prices[type][index];
};

const handlePlanClick = (plan, count) => {
  const message = `Olá, tenho interesse no plano ${plan.type}, ${professionalCount(count)} profissionais`;
  const whatsappURL = `https://wa.me//61996652148?text=${encodeURIComponent(message)}`;
  window.location.href = whatsappURL;
};

const professionalCount = (count) => {
  switch (count) {
    case 0:
      return "para até 05";
    case 1:
      return "para até 10";
    case 2:
      return "para até 25";
    case 3:
      return "para até 50";
    default:
      return "para até 05";
  }
};

const PaymentSection = () => {
  const number = 0;

  return (
    <div className="flex w-[98%] flex-col items-center gap-10">
      <div className="flex w-full flex-col items-center justify-center gap-3 px-9 text-center bg-primary-400 py-10 rounded-2xl text-primary-50">
        {/* <Text className="font-poppins text-lg font-semibold text-secondary-900">
          PLANOS DE PAGAMENTO
        </Text> */}
        {/* <Text className="font-quickSand text-5xl font-semibold text-coolGray-950">
          Escolha o plano ideal para as suas necessidades profissionais
        </Text> */}
        <Text className="font-poppins text-lg font-semibold text-secondary-25">
          Como funciona?
        </Text>
        <Text className="font-poppins text-lg font-semibold ">
          A Via Consultas não cobra taxa de adesão, nem mensalidades.
        </Text>
        <Text className="font-poppins text-lg font-semibold ">
          Será aplicada apenas uma taxa de operação da plataforma, de 10% sobre cada aquisição de serviço pelo usuário. 
        </Text>
        <Text className="font-poppins text-lg font-semibold ">
          Esta taxa será debitada automaticamente no ato do pagamento pelo usuário. Ou seja, a Clínica ou profissional receberá 90% líquido do valor pago pelo usuário.  
          Esta taxa tem como função a manutenção dos custos operacionais da plataforma, como marketing e outros serviços.
        </Text>
      </div>
      <div className="flex w-[96%] flex-wrap items-center justify-center gap-5 3xl:max-w-[130rem]">
        
        {/* {pricingData.map((pricing, idx) => (
          <div
            key={idx}
            className={`relative flex h-[22rem] w-72 flex-col justify-between overflow-hidden rounded-2xl ${pricing.type === "Semestral" ? "bg-primary-500" : "bg-white"} px-8 pb-3 pt-10 shadow-lg 2xl:w-1/5`}
          >
            <div className="flex flex-col gap-4">
              <Text
                className={`${pricing.type === "Semestral" ? "text-white" : "text-coolGray-950"} font-poppins text-xl font-semibold`}
              >
                {pricing.type}
              </Text>
              <Text
                className={`font-regular w-4/5 font-poppins text-sm ${pricing.type === "Semestral" ? "text-primary-50" : "text-coolGray-600"}`}
              >
                {pricing.name}
              </Text>
            </div>
            <div>
              <div className="mb-6">
                <Text
                  className={`text-md mt-2 font-poppins font-bold ${pricing.type === "Semestral" ? "text-secondary-350" : "text-primary-600"}`}
                >
                  {pricing.installments}
                </Text>
                <div className="mb-1 flex items-end gap-2">
                  <Text
                    className={`font-poppins text-2xl font-semibold ${pricing.type === "Semestral" ? "text-primary-25" : "text-coolGray-900"}`}
                  >
                    R$
                  </Text>
                  <Text
                    className={`font-poppins text-4xl font-semibold ${pricing.type === "Semestral" ? "text-primary-25" : "text-coolGray-900"}`}
                  >
                    {pricing.value || calculateValue(pricing.type, number)}
                  </Text>
                </div>
                <Text
                  className={`font-regular font-poppins text-sm ${pricing.type === "Semestral" ? "text-primary-50" : "text-coolGray-600"}`}
                >
                  Por profissional
                </Text>
              </div>
              <div className="flex w-full flex-col items-center justify-center">
                <Button
                  onClick={() => handlePlanClick(pricing, number)}
                  label={`Escolher ${pricing.type}`}
                  className={`flex max-w-60 rounded-2xl font-poppins ${pricing.type === "Semestral" ? "bg-primary-25 text-primary-500" : "bg-primary-500 text-white"} px-6 py-2 text-sm font-medium duration-500 hover:bg-primary-100`}
                />
                <Text
                  className={`font-regular mt-2 w-[90%] text-center font-poppins text-xs ${pricing.type === "Semestral" ? "text-primary-50" : "text-coolGray-600"}`}
                >
                  +Taxa de operação de {pricing.tax} sobre o valor de cada atendimento
                </Text>
              </div>
            </div>
            {pricing.type === "Semestral" && (
              <div className="absolute right-[-18px] top-4 w-fit rotate-45 bg-secondary-300 px-5 font-poppins">
                <Text className="text-xs font-semibold text-primary-500">Popular</Text>
              </div>
            )}
          </div>
        ))} */}

        <div className="pt-5 text-center">
          <Text className="text-center font-poppins text-3xl font-semibold">
            Cadastre-se e conheça tudo que a Via Consultas tem a oferecer!
          </Text>
          <Link href="/sign_up" className="mx-auto w-fit">
            <Button
              label="Faça seu cadastro agora!"
              className={`mx-auto mt-5 flex max-w-60 rounded-2xl bg-primary-500 px-6 py-2 font-poppins text-sm font-medium text-white duration-500 hover:bg-primary-100`}
              variant="primary"
            />
          </Link>
          <Text className="mx-auto w-fit pt-2 font-poppins text-xs font-semibold text-coolGray-600">
            Taxa de operação de 10% sobre o valor de cada atendimento
          </Text>
        </div>
      </div>
    </div>
  );
};

export default PaymentSection;
