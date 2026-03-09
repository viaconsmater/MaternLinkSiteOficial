import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline";
import { router, useForm, usePage } from "@inertiajs/react";
import { Button, Text, TextField, TextFieldMask } from "@switchdreams/ui";
import axios from "axios";
import React, { useState } from "react";

import { useAlert } from "@/contexts/Alert";
import { cardBrandLogo } from "@/utils";

const CreditCards = ({ cards }) => {
  const { showAlert } = useAlert();
  const [showForm, setShowForm] = useState(false);
  const { currentUser } = usePage().props;
  const { setData, data, reset } = useForm({
    creditCard: {
      holderName: "",
      number: "",
      expiryMonth: "",
      expiryYear: "",
      ccv: "",
    },
    creditCardHolderInfo: {
      name: currentUser.name,
      email: currentUser.email,
      cpfCnpj: currentUser.cpf,
      postalCode: currentUser.address.cep,
      addressNumber: currentUser.address.number || "0",
      phone: currentUser.phone,
    },
  });

  const cpfCnpjMask = (v) => {
    v = v.replace(/\D/g, "");

    if (v.length <= 11) {
      v = v.replace(/(\d{3})(\d)/, "$1.$2");
      v = v.replace(/(\d{3})(\d)/, "$1.$2");
      v = v.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    } else {
      v = v.replace(/^(\d{2})(\d)/, "$1.$2");
      v = v.replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3");
      v = v.replace(/\.(\d{3})(\d)/, ".$1/$2");
      v = v.replace(/(\d{4})(\d)/, "$1-$2");
    }

    return v;
  };

  const tokenizeCard = () => {
    axios
      .post("/credit_cards", data)
      .then(() => {
        router.reload({ only: ["cards"] });
        setShowForm(false);
        reset();
        showAlert({ message: "Cartão salvo com sucesso", type: "success" });
      })
      .catch((e) => showAlert(e));
  };

  return (
    <div className="mt-24 flex w-full flex-col justify-center gap-6 sm:w-1/2">
      <Text className="text-center text-2xl">Pagamento Recorrente</Text>
      <div className="flex max-h-[400px] flex-col items-center gap-4 overflow-y-scroll p-4">
        {cards.map((card) => {
          return (
            <div
              className={`flex w-1/3 min-w-72 cursor-pointer flex-col rounded-xl border-2 p-4 hover:border-primary-300`}
              key={card.id}
            >
              <Text>**** **** **** {card.credit_card_number}</Text>
              <img src={cardBrandLogo(card.credit_card_brand)} className={`size-8`} />
            </div>
          );
        })}
      </div>
      <div className="flex w-full justify-center">
        <Button
          label="Adicionar novo cartão"
          variant="outline"
          className="m-4 w-1/6 min-w-60 rounded-full"
          icon={showForm ? MinusIcon : PlusIcon}
          iconSide="left"
          onClick={() => setShowForm(!showForm)}
        />
      </div>
      {showForm && (
        <div className="flex w-full flex-col items-center justify-center">
          <TextField
            className="w-full font-normal"
            label="Nome do titular do cartão"
            placeholder="Escreva o nome do titular"
            value={data.creditCard.holderName}
            onChange={(e) => {
              setData({
                ...data,
                creditCard: { ...data.creditCard, holderName: e.target.value },
              });
            }}
          />
          <TextFieldMask
            type="text"
            className="w-full font-normal"
            label="CPF/CNPJ"
            placeholder="CPF/CNPJ"
            value={cpfCnpjMask(data.creditCardHolderInfo.cpfCnpj)}
            onChange={(e) => {
              if (e.target.value.length <= 18) {
                const cpfCnpj = cpfCnpjMask(e.target.value);
                setData({
                  ...data,
                  creditCardHolderInfo: {
                    ...data.creditCardHolderInfo,
                    cpfCnpj: cpfCnpj,
                  },
                });
              } else {
                setData({
                  ...data,
                  creditCardHolderInfo: {
                    ...data.creditCardHolderInfo,
                    cpfCnpj: e.target.value.slice(0, -1),
                  },
                });
              }
            }}
          />
          <TextFieldMask
            mask="9999 9999 9999 9999"
            type="text"
            className="w-full font-normal"
            label="Número do cartão"
            placeholder="Escreva o número do cartão"
            value={data.creditCard.number}
            onChange={(e) => {
              const cardNumber = e.target.value.replace(/\s/g, "");
              setData({
                ...data,
                creditCard: { ...data.creditCard, number: cardNumber },
              });
            }}
          />
          <TextFieldMask
            mask="99/9999"
            type="text"
            className="w-full font-normal"
            label="Data de expiração"
            placeholder="MM/AAAA"
            onChange={(e) => {
              const expiryMonth = e.target.value.split("/")[0];
              const expiryYear = e.target.value.split("/")[1];
              setData({
                ...data,
                creditCard: {
                  ...data.creditCard,
                  expiryMonth: expiryMonth,
                  expiryYear: expiryYear,
                },
              });
            }}
          />
          <TextFieldMask
            mask="999"
            type="text"
            className="w-full font-normal"
            label="CVV"
            placeholder="CVV"
            value={data.creditCard.ccv}
            onChange={(e) => {
              setData({
                ...data,
                creditCard: { ...data.creditCard, ccv: e.target.value },
              });
            }}
          />
          <Button
            label="Adicionar"
            className="m-4 w-1/6 min-w-60 rounded-full bg-primary-500 text-white"
            onClick={() => tokenizeCard()}
          />
        </div>
      )}
    </div>
  );
};

export default CreditCards;
