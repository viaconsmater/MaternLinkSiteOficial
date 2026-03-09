import { CheckIcon } from "@heroicons/react/24/outline";
import { router } from "@inertiajs/react";
import { Button, Text } from "@switchdreams/ui";
import React from "react";

const StepFour = () => {
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center pb-56 pt-10">
      <div className="mb-14 flex h-4/5 w-full flex-col items-center justify-center px-6 md:w-1/3 md:p-0 ">
        <div className="flex size-20 items-center justify-center rounded-full border border-primary-50">
          <CheckIcon className="w-10 stroke-2 text-primary-500" />
        </div>
        <Text size="3xl" as="h1" className="m-0 pt-4 text-center text-3xl text-gray-950">
          Sucesso!
        </Text>
        <Text size="sm" as="h2" className="m-0 pt-4 text-center text-gray-600 md:pt-4">
          Você trocou sua senha com êxito.
        </Text>
        <Button
          className="mt-8 flex rounded-2xl border border-primary-300 bg-primary-500 px-9 py-2 text-sm font-medium text-white duration-500 hover:bg-primary-300"
          label="Continuar"
          size="lg"
          onClick={() => router.visit("/login")}
        />
      </div>
    </div>
  );
};

export default StepFour;
