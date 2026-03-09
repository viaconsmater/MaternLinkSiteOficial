import { useForm } from "@inertiajs/react";
import { Button, Text, TextField, TextFieldMask } from "@switchdreams/ui";
import axios from "axios";
import React, { useState } from "react";

import { useAlert } from "@/contexts/Alert";
import { imagePath } from "@/utils";

const whatsAppButton = () => {
  const { showAlert } = useAlert();
  const [open, setOpen] = useState(false);
  const { data, setData } = useForm({
    name: "",
    phone: "",
    email: "",
  });

  const handleSubmit = () => {
    if (!data.name || !data.phone || !data.email) {
      showAlert({ message: "Preecha todos os campos para entrar em contato", type: "warning" });
    } else {
      axios
        .post("/contacting_users", data)
        .then(() => {
          window.location.href = `https://wa.me//61996652148`;
        })
        .catch((response) => showAlert({ message: response.response.data }));
    }
  };

  return (
    <>
      <div
        className="fixed bottom-6 right-[8%] z-50 flex size-16 cursor-pointer items-center justify-center rounded-full bg-white shadow-md hover:bg-coolGray-300 md:right-12"
        onClick={() => setOpen(!open)}
      >
        <img src={imagePath("whatsapp.webp")} alt="ícone do whatsApp" className="size-8" />
      </div>
      {open && (
        <div className="fixed bottom-24 right-[8%] z-50 flex h-[22rem] w-80 flex-col gap-2 rounded-xl bg-white px-4 py-6 shadow-md md:bottom-6 md:right-32">
          <div className="flex flex-col gap-1">
            <Text className="font-quickSand text-lg font-semibold">Entre em contato conosco</Text>
            <Text className="font-regular w-4/5 font-poppins text-xs text-coolGray-600">
              Mas primeiro, preencha as seguintes informações.
            </Text>
          </div>
          <div>
            <TextField
              placeholder="Nome"
              label=""
              name="name"
              className="rounded-lg"
              value={data.name}
              onChange={(e) => setData("name", e.target.value)}
            />
            <TextField
              placeholder="Email"
              label=""
              name="email"
              className="rounded-lg"
              value={data.email}
              onChange={(e) => setData("email", e.target.value)}
            />
            <TextFieldMask
              placeholder="Telefone"
              label=""
              name="telefone"
              className="rounded-lg"
              value={data.phone}
              onChange={(e) => setData("phone", e.target.value)}
              mask="(99) 99999-9999"
            />
          </div>
          <Button
            label="Entre em contato"
            className="flex w-full rounded-2xl border border-primary-400 bg-primary-500 px-6 py-2 font-poppins text-sm font-medium text-white duration-500 hover:bg-primary-100"
            onClick={() => handleSubmit()}
          />
        </div>
      )}
    </>
  );
};

export default whatsAppButton;
