import { Link, router } from "@inertiajs/react";
import { SelectBox, Text } from "@switchdreams/ui";
import React from "react";

const ConfigurationSidebar = ({ page_name }) => {
  const elementColor = (requested_page) => {
    if (requested_page === page_name) {
      return "text-secondary-950 bg-secondary-25";
    } else {
      return "text-gray-600";
    }
  };

  const renderSelectOption = (value, label) => {
    return (
      <div className="flex w-[90%] justify-between">
        <div className="flex items-center gap-2">
          <Text className={`text-md font-medium ${elementColor(value)}`}>{label}</Text>
        </div>
      </div>
    );
  };

  const renderOption = (option) => {
    return (
      <Link
        key={option.value}
        className={`flex w-52 cursor-pointer items-center gap-2 rounded-lg px-2 py-3 duration-300 hover:bg-secondary-50 ${elementColor(
          option.value,
        )}`}
        href={`/configurations/${option.value}`}
      >
        <Text className="text-md whitespace-nowrap font-medium">{option.word}</Text>
      </Link>
    );
  };

  const Options = [
    // {
    //   value: "plan",
    //   word: "Planos de Assinatura",
    //   label: renderSelectOption("advanced", "Opções avançadas"),
    // },
    {
      value: "password",
      word: "Alterar Senha",
      label: renderSelectOption("advanced", "Opções avançadas"),
    },
  ];

  return (
    <>
      <div className="flex h-screen flex-col gap-2 border-x border-gray-100 px-6 py-12 max-lg:hidden">
        {Options.map(renderOption)}
      </div>
      <div className="flex w-full items-center justify-center pt-8 lg:hidden">
        <div className="w-full px-6 pb-8">
          <SelectBox
            options={Options}
            value={page_name}
            className="rounded-xl bg-secondary-25"
            onChange={(e) => {
              router.get(`/configurations/${e}`);
            }}
          />
        </div>
      </div>
    </>
  );
};

export default ConfigurationSidebar;
