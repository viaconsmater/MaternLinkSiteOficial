import { router, useForm, usePage } from "@inertiajs/react";
import {
  Avatar,
  Button,
  CheckBox,
  RadioButton,
  Spinner,
  Text,
  TextField,
  TextFieldMask,
} from "@switchdreams/ui";
import axios from "axios";
import React, { useState } from "react";

import Modal from "@/components/Modal";
import { cardBrandLogo, formatIntegerCurrency } from "@/utils";
import { useAlert } from "~/contexts/Alert";

const CreditCardModal = ({ open, setOpen, dataClinic, cards }) => {
  const { showAlert } = useAlert();
  const [useSavedCard, setUseSavedCard] = useState(false);
  const [cardId, setCardId] = useState("");
  const [loading, setLoading] = useState(false);
  const [saveCard, setSaveCard] = useState(false);

  const { currentUser } = usePage().props;

  const formatDate = (date) => {
    const dateTime = new Date(date);
    dateTime.setHours(Number(time.split(":")[0]));
    dateTime.setMinutes(Number(time.split(":")[1]));
    dateTime.setSeconds(0);
    return dateTime;
  };

  const { setData, data, post } = useForm({
    // doctor_user_id: doctor.id,
    // date: formatDate(date),
    // clinic_id: doctor.clinic_id,
    // price_cents: doctor.value,
    // aditional_info: "", // aditionalInfo,
    // return_url: window.location.href,
    payment_info: {
      credit_card: {
        holder_name: "",
        number: "",
        expiry_month: "",
        expiry_year: "",
        ccv: "",
      },
      credit_card_holder_info: {
        name: currentUser.name,
        email: currentUser.email,
        cpf_cnpj: currentUser.cpf,
        postal_code: currentUser.address.cep,
        address_number: currentUser.address.number || "0",
        phone: currentUser.phone,
      },
    },
    budget_id: dataClinic.budget_id,
    budget_item_id: dataClinic.id,
  });

  const cpfCnpjMask = (v) => {
    if(!v) return;
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

  const cardTokenization = () => {
    axios.post("/credit_cards", data.payment_info).catch((e) => showAlert({ message: e.message }));
  };

  const payBudget = () => {
    // setLoading(true);
    router.post(
      `/exams/budgets/${dataClinic.budget_id}/items/${dataClinic.id}/payments/pay_credit_card`,
      data,
    );
    // post(`/consultas/credit_card`, {
    //   onError: (e) => showAlert({ message: e.response.data }),
    //   onFinish: () => setLoading(false),
    // });
  };

  return (
    <Modal open={open} setOpen={setOpen}>
      <div className="w-full max-lg:hidden">
        <Text className="text-xl font-semibold text-gray-950">Finalize sua compra</Text>
      </div>
      <div className="lg:mt-8 lg:flex lg:gap-5 lg:border-y">
        <div className="relative mb-3 flex-col items-center justify-center rounded-xl p-6 lg:w-1/3">
          <div className="mb-3 flex w-fit items-center justify-center gap-2 rounded-lg">
            <Avatar size="sm" name={currentUser.name} avatarUrl={currentUser.image} />
            <Text className="max-w-32 break-words text-sm font-normal text-gray-700">
              {currentUser.name}
            </Text>
          </div>
          <hr />
          <div className="mt-4 flex items-center justify-between font-semibold text-gray-900">
            <Text className="text-lg text-gray-950">Total:</Text>
            <Text className="text-lg text-gray-950">{dataClinic.formatted_amount}</Text>
          </div>
        </div>
        <div className="max-h-[500px] overflow-y-scroll border-l p-6 max-lg:border-t lg:w-2/3">
          <div className="flex w-full justify-between py-4">
            <div
              className="flex w-1/2 items-center gap-2"
              onClick={() => {
                setUseSavedCard(false);
                setCardId("");
                setData("payment_info", {
                  credit_card: {
                    holder_name: "",
                    number: "",
                    expiry_month: "",
                    expiry_year: "",
                    ccv: "",
                  },
                  credit_card_holder_info: {
                    name: currentUser.name,
                    email: currentUser.email,
                    cpfCnpj: currentUser.cpf,
                    postal_code: currentUser.address.cep,
                    address_number: currentUser.address.number || "0",
                    phone: currentUser.phone,
                  },
                });
              }}
            >
              <RadioButton checked={!useSavedCard} />
              <Text>Novo cartão</Text>
            </div>
            <div className="flex w-1/2 items-center gap-2" onClick={() => setUseSavedCard(true)}>
              <RadioButton checked={useSavedCard} />
              <Text>Usar cartão salvo</Text>
            </div>
          </div>
          {useSavedCard ? (
            <div className="flex flex-col gap-2">
              {cards.map((card) => {
                return (
                  <div
                    className={`flex w-full flex-col p-4 ${
                      card.id == cardId && "border-primary-300"
                    } cursor-pointer items-end justify-end rounded-xl border-2`}
                    onClick={() => {
                      setCardId(card.id);
                      setData("payment_info", { cardId: card.id });
                    }}
                    key={card.id}
                  >
                    <Text>**** **** **** {card.credit_card_number}</Text>
                    <img src={cardBrandLogo(card.credit_card_brand)} className={`size-8`} />
                  </div>
                );
              })}
            </div>
          ) : (
            <>
              <TextField
                className="w-full font-normal"
                label="Nome do titular do cartão"
                placeholder="Escreva o nome do titular"
                value={data.payment_info.credit_card.holder_name}
                onChange={(e) => {
                  setData("payment_info", {
                    ...data.payment_info,
                    credit_card: { ...data.payment_info.credit_card, holder_name: e.target.value },
                  });
                }}
              />
              <TextFieldMask
                type="text"
                className="w-full font-normal"
                label="CPF/CNPJ"
                placeholder="CPF/CNPJ"
                value={cpfCnpjMask(data.payment_info.credit_card_holder_info.cpf_cnpj)}
                onChange={(e) => {
                  if (e.target.value.length <= 18) {
                    const cpfCnpj = cpfCnpjMask(e.target.value);
                    setData("payment_info", {
                      ...data.payment_info,
                      credit_card_holder_info: {
                        ...data.payment_info.credit_card_holder_info,
                        cpf_cnpj: cpfCnpj,
                      },
                    });
                  } else {
                    setData("payment_info", {
                      ...data.payment_info,
                      credit_card_holder_info: {
                        ...data.payment_info.credit_card_holder_info,
                        cpf_cnpj: e.target.value.slice(0, -1),
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
                value={data.payment_info.credit_card.number}
                onChange={(e) => {
                  const cardNumber = e.target.value.replace(/\s/g, "");
                  setData("payment_info", {
                    ...data.payment_info,
                    credit_card: { ...data.payment_info.credit_card, number: cardNumber },
                  });
                }}
              />
              <div className="flex gap-4">
                <TextFieldMask
                  mask="99/9999"
                  type="text"
                  className="w-full font-normal"
                  label="Data de expiração"
                  placeholder="MM/AAAA"
                  onChange={(e) => {
                    const expiryMonth = e.target.value.split("/")[0];
                    const expiryYear = e.target.value.split("/")[1];
                    setData("payment_info", {
                      ...data.payment_info,
                      credit_card: {
                        ...data.payment_info.credit_card,
                        expiry_month: expiryMonth,
                        expiry_year: expiryYear,
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
                  value={data.payment_info.credit_card.ccv}
                  onChange={(e) => {
                    setData("payment_info", {
                      ...data.payment_info,
                      credit_card: { ...data.payment_info.credit_card, ccv: e.target.value },
                    });
                  }}
                />
              </div>
              <div className="mt-2 flex items-center gap-2">
                {/* <CheckBox
                  role="checkbox"
                  checked={saveCard}
                  onChange={() => {
                    setSaveCard(!saveCard);
                  }}
                /> */}
                {/* <Text>Salvar cartão para uso futuro?</Text> */}
              </div>
            </>
          )}
        </div>
      </div>
      <div className="mt-3 flex w-full gap-2 px-10 max-lg:flex-col">
        <Button
          className="rounded-full bg-error-500"
          label="Cancelar"
          onClick={() => {
            setOpen(false);
          }}
        />
        <Button
          className="rounded-full bg-primary-500 text-white"
          label={`Pagar ${dataClinic.formatted_amount}`}
          onClick={() => {
            if (saveCard) {
              cardTokenization();
            }
            payBudget();
          }}
          disabled={loading}
        />
      </div>
      {loading && (
        <div className="mt-8 flex w-full justify-center">
          <Spinner />
        </div>
      )}
    </Modal>
  );
};

export default CreditCardModal;
