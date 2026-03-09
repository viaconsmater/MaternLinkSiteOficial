import { ArrowsRightLeftIcon } from "@heroicons/react/24/outline";
import { AccordionMenu, Button, RadioButton, Text } from "@switchdreams/ui";
import React, { useState } from "react";

import ConfigurationSidebar from "@/components/ConfigurationPagesSidebar";
import HistoryTable from "@/components/Table/historyTable";
import { imagePath } from "@/utils";

import { infos } from "./constants";

const Options = [
  {
    time: 1,
    title: "Mensal",
    parcelas: "",
    descripition: "Plano Padrão",
  }
  // },
  // {
  //   time: 3,
  //   title: "Trimestral",
  //   parcelas: "3x",
  //   descripition: "Três meses com taxa reduzida.",
  // },
  // {
  //   time: 6,
  //   title: "Semestral",
  //   parcelas: "6x",
  //   descripition: "Plano ideal e mais popular.",
  // },
  // {
  //   time: 12,
  //   title: "Anual",
  //   parcelas: "12x",
  //   descripition: "Compromisso anual com excelência.",
  // },
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

const plan = ({ currentUser }) => {
  const activePlan = currentUser.active_plan;
  const [number, setNumber] = useState(0);

  return (
    <div className="flex h-fit w-full justify-center bg-coolGray-100 max-lg:pt-10">
      <div className="flex w-full max-w-screen-big max-lg:h-fit max-lg:flex-col">
        <ConfigurationSidebar page_name="plan" />
        <div className="w-3/4 px-20 py-12 max-lg:w-full max-lg:px-5">
          {activePlan && (
            <>
              <Text className="mb-8 font-quicksand font-semibold text-coolGray-950" size="xl">
                Meu plano atual
              </Text>
              <div className="flex w-full flex-col items-end">
                <div className="flex w-full justify-between rounded-2xl border-2 border-secondary-300 bg-white p-6">
                  <div className="flex items-center gap-4 max-lg:flex-col max-lg:items-start">
                    <div className="flex size-fit items-center justify-center rounded-2xl bg-secondary-500 p-3">
                      <img src={imagePath("pcIcon.svg")} className="h-7" />
                    </div>
                    <div className="flex flex-col gap-3">
                      <Text className="font-quicksand font-bold text-coolGray-950" size="xl">
                        {currentUser.active_plan}
                      </Text>
                      <div className="flex items-center gap-2">
                        <Text
                          className="font-regular font-poppins text-coolGray-600 max-lg:flex-none"
                          size="sm"
                        >
                          3  profissionais adicionados
                        </Text>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end max-lg:flex-none">
                    <Text className="font-quicksand font-bold text-coolGray-950" size="3xl">
                      R$ 450,00
                    </Text>
                    <Text className="font-regular font-poppins text-coolGray-600" size="sm">
                      por mês
                    </Text>
                  </div>
                </div>
                <div className="my-4 rounded-xl border border-coolGray-300 bg-white p-2">
                  <Text className="font-regular font-poppins text-coolGray-950" size="xs">
                    Renovação em 19.08.2024
                  </Text>
                </div>
              </div>
            </>
          )}
          {activePlan ? (
            <AccordionMenu
              className="font-quicksand text-xl font-semibold text-coolGray-950"
              size="lg"
              title="Plano de assinatura"
            >
              <div>
                {/* <Text className="font-regular mb-4 font-poppins text-coolGray-600" size="sm">
                  Quantidade de profissionais na clínica:
                </Text>
                <div className="mb-4 flex flex-wrap gap-4">
                  {[0, 1, 2, 3].map((count) => (
                    <RadioButton
                      key={count}
                      size="small"
                      label={
                        (count === 0 && "até 05") ||
                        (count === 1 && "de 06 a 10") ||
                        (count === 2 && "de 11 a 25") ||
                        (count === 3 && "acima de 25")
                      }
                      checked={number === count}
                      onChange={() => setNumber(count)}
                    />
                  ))}
                </div> */}
                <div className="flex flex-col gap-2">
                  {Options.map((option, idx) => {
                    return (
                      <div
                        className="flex w-full justify-between rounded-xl bg-white p-4 max-sm:flex-col max-sm:gap-2"
                        key={idx}
                      >
                        <div className="flex items-center gap-2 max-sm:flex-col max-sm:items-start">
                          <div className="flex size-10 items-center justify-center rounded-xl border-4 border-secondary-25 bg-secondary-50 ">
                            <Text
                              className="font-quicksand font-semibold text-secondary-500"
                              size="lg"
                            >
                              {option.time}
                            </Text>
                          </div>
                          <div className="flex flex-col max-md:gap-2">
                            <div className="flex items-center gap-1 max-sm:flex-col max-sm:items-start max-sm:gap-2">
                              <Text
                                className="font-quicksand font-semibold text-coolGray-900"
                                size="lg"
                              >
                                {option.title}
                              </Text>
                              <div className="size-1 rounded-full bg-coolGray-600 max-sm:hidden" />
                              <Text
                                className="font-regular flex flex-wrap gap-1 font-poppins text-coolGray-600"
                                size="sm"
                              >
                                {option.parcelas ? `até ${option.parcelas} de` : ""}{" "}
                                <span className="text-primary-600">
                                  R$ {calculateValue(option.title, number)}
                                </span>{" "}
                                por profissional
                              </Text>
                            </div>
                            <Text className="font-regular font-poppins text-coolGray-600" size="sm">
                              {option.descripition}
                            </Text>
                          </div>
                        </div>
                        <Button
                          label="Mudar de plano"
                          iconSide="left"
                          icon={ArrowsRightLeftIcon}
                          variant="outline"
                          className="transition-500 w-fit rounded-2xl px-4 py-2 font-poppins text-sm font-medium text-primary-600 transition-all hover:bg-primary-500 hover:text-white"
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            </AccordionMenu>
          ) : (
            <>
              <Text className="mb-8 font-quicksand font-semibold text-coolGray-950" size="xl">
                Plano de assinatura
              </Text>
              <Text className="font-regular mb-4 font-poppins text-coolGray-600" size="sm">
                Quantidade de profissionais na clínica:
              </Text>
              <div className="mb-4 flex flex-wrap gap-4">
                {[0, 1, 2, 3].map((count) => (
                  <RadioButton
                    key={count}
                    size="small"
                    label={
                      (count === 0 && "até 05") ||
                      (count === 1 && "de 06 a 10") ||
                      (count === 2 && "de 11 a 25") ||
                      (count === 3 && "acima de 25")
                    }
                    checked={number === count}
                    onChange={() => setNumber(count)}
                  />
                ))}
              </div>
              <div className="flex flex-col gap-2">
                {Options.map((option, idx) => {
                  return (
                    <div
                      className="flex w-full justify-between rounded-xl bg-white p-4 max-sm:flex-col max-sm:gap-2"
                      key={idx}
                    >
                      <div className="flex items-center gap-2 max-sm:flex-col max-sm:items-start">
                        <div className="flex size-10 items-center justify-center rounded-xl border-4 border-secondary-25 bg-secondary-50 ">
                          <Text
                            className="font-quicksand font-semibold text-secondary-500"
                            size="lg"
                          >
                            {option.time}
                          </Text>
                        </div>
                        <div className="flex flex-col max-md:gap-2">
                          <div className="flex items-center gap-1 max-sm:flex-col max-sm:items-start max-sm:gap-2">
                            <Text
                              className="font-quicksand font-semibold text-coolGray-900"
                              size="lg"
                            >
                              {option.title}
                            </Text>
                            <div className="size-1 rounded-full bg-coolGray-600 max-sm:hidden" />
                            <Text
                              className="font-regular flex flex-wrap gap-1 font-poppins text-coolGray-600"
                              size="sm"
                            >
                              {option.parcelas ? `até ${option.parcelas} de` : ""}{" "}
                              <span className="text-primary-600">
                                R$ {calculateValue(option.title, number)}
                              </span>{" "}
                              por profissional
                            </Text>
                          </div>
                          <Text className="font-regular font-poppins text-coolGray-600" size="sm">
                            {option.descripition}
                          </Text>
                        </div>
                      </div>
                      <Button
                        label="Escolher plano"
                        className="flex w-fit rounded-2xl bg-primary-500 px-6 py-2 text-sm font-medium text-white duration-500 hover:bg-primary-600"
                      />
                    </div>
                  );
                })}
              </div>
            </>
          )}
          <AccordionMenu
            className="mt-8 flex-none font-quicksand text-xl font-semibold text-coolGray-950"
            size="lg"
            title="Histórico de pagamentos"
          >
            <div className="flex max-w-full overflow-x-auto">
              <HistoryTable info={infos} />
            </div>
          </AccordionMenu>
        </div>
      </div>
    </div>
  );
};

export default plan;
