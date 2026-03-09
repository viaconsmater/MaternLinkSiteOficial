import { Link, router } from "@inertiajs/react";
import { Button, Text } from "@switchdreams/ui";
import React, { useRef } from "react";

import ClickBack from "@/components/ClickBack";

const StepTwo = ({ sid }) => {
  const inputs = useRef([]);

  const handleInput = (index, event) => {
    const inputElement = event.target;
    const value = inputElement.value;

    if (value.length === 1) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleBackspace = (index, event) => {
    const inputElement = event.target;
    if (event.keyCode === 8 && !inputElement.value) {
      inputs.current[index - 1]?.focus();
    }
  };

  const submitStepTwoData = (e) => {
    e.preventDefault();

    let code = "";
    inputs.current.forEach((input) => {
      code = code + input.value;
    });

    router.post("/reset_password/check_code", {
      sid: sid,
      code: parseInt(code),
    });
  };

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center">
      <Link className="absolute left-0 top-10 w-full" href={`step_one`}>
        <ClickBack />
      </Link>
      <div className="relative flex size-full flex-col items-center justify-center px-4 md:px-28">
        <div className="flex h-4/5 w-full flex-col justify-center pb-28 md:w-1/3">
          <Text size="sm" as="md" className="m-0 pt-5 text-center text-gray-600 md:pt-10">
            Esqueceu sua senha?
          </Text>
          <div className="flex justify-center gap-2">
            <Text size="3xl" as="h1" className="m-0 flex-none pb-8 pt-4 text-center text-gray-800">
              Insira o
            </Text>
            <Text size="3xl" as="h1" className="m-0 pt-4 text-center text-primary-500">
              código
            </Text>
          </div>
          <div className="flex h-auto w-full justify-between md:justify-center md:gap-3.5">
            {[...Array(6)].map((_, index) => (
              <input
                className="text-md my-2 size-[52px] rounded-md border p-2 text-center hover:bg-gray-50 focus:border-2 focus:border-primary-300 focus:outline-none"
                type="text"
                maxLength={1}
                required
                key={index}
                ref={(el) => (inputs.current[index] = el)}
                onInput={(e) => handleInput(index, e)}
                onKeyDown={(e) => {
                  if (e.key === "Backspace") {
                    handleBackspace(index, e);
                  }
                }}
              />
            ))}
          </div>
          <Text size="sm" as="h1" className="m-0 pt-5 text-center text-sm text-gray-600">
            Digite o código de 6 dígitos enviado para
          </Text>
          <Button
            className="mt-8 flex rounded-2xl border border-primary-300 bg-primary-500 px-9 py-2 text-sm font-medium text-white duration-500 hover:bg-primary-300"
            label="Continuar"
            size="lg"
            onClick={submitStepTwoData}
          />
          <div className="flex w-full justify-between gap-4 pt-6">
            <div className="h-1 w-1/3 rounded-full bg-gray-100" />
            <div className="h-1 w-1/3 rounded-full bg-primary-500" />
            <div className="h-1 w-1/3 rounded-full bg-gray-100" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepTwo;
