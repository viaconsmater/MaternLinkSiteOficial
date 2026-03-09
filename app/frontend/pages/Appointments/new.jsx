import {
  BanknotesIcon,
  CalendarDaysIcon,
  ClockIcon,
  CreditCardIcon,
  LockClosedIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";
import { ChevronRightIcon } from "@heroicons/react/24/solid";
import { usePage } from "@inertiajs/react";
import { Avatar, Text } from "@switchdreams/ui";
import React, { useState } from "react";

import { imagePath } from "@/utils";

import { formatIntegerCurrency, monthsTranslated } from "../../utils";
import CreditCardModal from "./Modals/creditCardModal";
import PixModal from "./Modals/pixModal";

const Payments = ({ date, time, doctor, cards }) => {
  const { currentUser } = usePage().props;
  const dateFormated = () => {
    const dateObj = new Date(date);
    return `${dateObj.getDate()} de ${monthsTranslated[dateObj.getMonth()]} de ${dateObj.getFullYear()}`;
  };
  const [openPix, setOpenPix] = useState(false);
  const [openCard, setOpenCard] = useState(false);

  return (
    <>
      <CreditCardModal
        open={openCard}
        setOpen={setOpenCard}
        doctor={doctor}
        user={currentUser}
        date={date}
        time={time}
        cards={cards}
      />
      <PixModal open={openPix} setOpen={setOpenPix} date={date} time={time} doctor={doctor} />
      <div className="flex w-full max-w-screen-big gap-8 px-5 py-14 max-md:flex-col">
        <div className="h-fit w-1/2 rounded-lg border border-coolGray-300 max-md:w-full">
          <div className="w-full border-b border-coolGray-300 px-6 py-8 ">
            <Text className="font-quicksand text-2xl font-semibold text-coolGray-950">
              Método de pagamento
            </Text>
          </div>
          <div className="flex flex-col gap-4 p-6">
            <div
              className="boder-coolGray-300 flex cursor-pointer items-center justify-between rounded-3xl border p-6"
              onClick={() => setOpenPix(true)}
            >
              <div className="flex items-center gap-3">
                <img src={imagePath("pix.svg")} />
                <Text className="font-poppins text-xl font-medium text-coolGray-950">Pix</Text>
              </div>
              <ChevronRightIcon className="h-6 text-coolGray-950" />
            </div>
            {/* <div className="boder-coolGray-300 flex items-center justify-between rounded-3xl border p-6">
             <div className="flex items-center gap-3">
               <img src={imagePath("barcode.svg")} />
               <Text className="font-poppins text-xl font-medium text-coolGray-400">Boleto</Text>
             </div>
             <ChevronRightIcon className="h-6 text-coolGray-400" />
            </div> */}
            <div
              className="boder-coolGray-300 flex cursor-pointer items-center justify-between rounded-3xl border p-6"
              onClick={() => setOpenCard(true)}
            >
              <div className="flex items-center gap-3">
                <CreditCardIcon className="h-11 text-coolGray-950" />
                <Text className="font-poppins text-xl font-medium text-coolGray-950">
                  Cartão de crédito
                </Text>
              </div>
              <ChevronRightIcon className="h-6 text-coolGray-950" />
            </div>
            <div className="flex gap-2">
              <LockClosedIcon className="h-4 text-secondary-600" />
              <Text size="sm" className="font-regular font-poppins text-coolGray-600">
                Sua transação está protegida com criptografia de ponta.
              </Text>
            </div>
          </div>
        </div>
        <div className="flex w-2/5 flex-col gap-6 rounded-lg border border-coolGray-300 px-6 py-8 max-md:w-full">
          <div className="flex items-center gap-4">
            <Avatar size="xl" name="Jóse Montenegro" scr={doctor.image} />
            <div className="flex flex-col gap-4">
              <div className="flex gap-1">
                <Text
                  className="font-quickSand font-bold text-coolGray-950 max-md:text-lg"
                  size="2xl"
                >
                  {doctor.name}
                </Text>
                {doctor.verified && <img src={imagePath("valid.svg")} alt="icone de verificado" />}
              </div>
              <Text className="text-regular font-poppins text-coolGray-600" size="sm">
                {doctor.specialty}
              </Text>
            </div>
          </div>
          <div className="flex items-center gap-4 rounded-lg border border-coolGray-300 p-4">
            <CalendarDaysIcon className="h-6 text-coolGray-950" />
            <div>
              <Text className="font-quicksand font-semibold text-coolGray-950" size="lg">
                {dateFormated()}
              </Text>
              <Text className="font-regular font-poppins text-sm text-coolGray-600">Data</Text>
            </div>
          </div>
          <div className="flex items-center gap-4 rounded-lg border border-coolGray-300 p-4">
            <ClockIcon className="h-6 text-coolGray-950" />
            <div>
              <Text className="font-quicksand font-semibold text-coolGray-950" size="lg">
                {time}
              </Text>
              <Text className="font-regular font-poppins text-sm text-coolGray-600">Horário</Text>
            </div>
          </div>
          <div className="flex items-center gap-4 rounded-lg border border-coolGray-300 p-4">
            <MapPinIcon className="h-6 text-coolGray-950" />
            <div>
              <Text className="font-quicksand font-semibold text-coolGray-950" size="lg">
                {doctor.clinic_name}
              </Text>
              <Text className="font-regular font-poppins text-sm text-coolGray-600">
                {doctor.clinic_address}
              </Text>
            </div>
          </div>
          <div className="flex items-center gap-4 rounded-lg border border-coolGray-300 p-4">
            <BanknotesIcon className="h-6 text-coolGray-950" />
            <div>
              <Text className="font-quicksand font-semibold text-coolGray-950" size="lg">
                {formatIntegerCurrency(doctor.value)}
              </Text>
              <Text className="font-regular font-poppins text-sm text-coolGray-600">Valor</Text>
            </div>
          </div>
          <Text className="font-regular px-12 text-center font-poppins text-sm text-coolGray-600">
            Você tem o prazo de 48 horas antes da sua consulta para realizar o reagendamento.
          </Text>
        </div>
      </div>
    </>
  );
};

export default Payments;
