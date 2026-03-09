import { Link } from "@inertiajs/react";
import { Button, Text } from "@switchdreams/ui";
import React from "react";

import { imagePath } from "../../utils";

const AddressInfo = ({ clinic }) => {
  return (
    <>
      <div className="flex w-full flex-col items-center justify-center pt-10 text-center lg:w-[29rem]">
        <img src={imagePath("checkSignUp.svg")} />
        <Text className="font-quickSand my-4 text-3xl font-semibold text-primary-400">
          Cadastro finalizado!
        </Text>
        <Text className="font-regular text-sm text-coolGray-600">
          Parabéns pelo sucesso do seu cadastro!
        </Text>
        <Text className="font-regular mb-12 text-sm text-coolGray-600">
          Bem-vindo à família <b>Via Consultas</b>!
        </Text>
        <Link href={clinic ? "/clinica" : "/"}>
          <Button
            label="Voltar à tela inicial"
            className="mb-5 flex w-fit rounded-2xl bg-primary-500 px-6 py-2 text-sm font-medium text-white duration-500 hover:bg-primary-600"
          />
        </Link>
      </div>
    </>
  );
};

export default AddressInfo;
