import {
  CalendarDaysIcon,
  ClockIcon,
  CurrencyDollarIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";
import { Avatar, Text } from "@switchdreams/ui";
import React from "react";

import Modal from "@/components/Modal";
import { formatIntegerCurrency, imagePath } from "@/utils";

const AppointmentModal = ({ appointments, open, setOpen }) => {
  const date = new Date(appointments.date);
  return (
    <Modal open={open} setOpen={setOpen} padding={true}>
      <div className="mt-8 flex w-full justify-between border-b border-coolGray-300 pb-6 max-md:flex-col max-md:justify-start">
        <div className="flex gap-2 max-md:flex-col">
          <Avatar
            size="lg"
            name={appointments.patient_name}
            avatarUrl={appointments.image}
            className="bg-primary-25"
          />
          <div className="w-[22rem] max-md:w-full">
            <Text className="font-quicksand font-bold text-coolGray-950" size="2xl">
              {appointments.patient_name}
            </Text>
            <Text className="font-regular flex gap-1 font-poppins text-coolGray-600" size="md">
              {appointments.patient_gender}, {appointments.patient_age} anos
            </Text>
          </div>
        </div>
        <div>
          <Text className="font-quicksand font-bold text-coolGray-950" size="3xl">
            {formatIntegerCurrency(appointments.transfer_value_cents)}
          </Text>
          <Text className="w-full text-left font-quicksand text-coolGray-600" size="xs">
            (Valor sem taxas: {formatIntegerCurrency(appointments.price_cents)})
          </Text>
        </div>
      </div>
      <div className="mt-8 flex w-full justify-between border-b border-coolGray-300 pb-6">
        <div className="flex items-center justify-center gap-5">
          <MapPinIcon className="h-7" />
          <div className="w-[22rem] max-md:w-full">
            <Text className="font-quicksand font-semibold text-coolGray-950" size="lg">
              {appointments.location}
            </Text>
            <Text className="font-regular font-poppins text-coolGray-600" size="sm">
              Local
            </Text>
          </div>
        </div>
        <img src={imagePath("clinicLogo.svg")} className="rounded-lg" />
      </div>
      <div className="mt-8 flex w-full items-center gap-5  border-b border-coolGray-300 pb-6">
        <CalendarDaysIcon className="h-7" />
        <div className="w-[22rem] max-md:w-full">
          <Text className="font-quicksand font-semibold text-coolGray-950" size="lg">
            {`${date.getDate()}/${date.getMonth() < 10 ? "0" : ""}${date.getMonth()}/${date.getFullYear()}`}
          </Text>
          <Text className="font-regular font-poppins text-coolGray-600" size="sm">
            Data
          </Text>
        </div>
      </div>
      <div className="mt-8 flex w-full items-center gap-5 border-b border-coolGray-300 pb-6">
        <ClockIcon className="h-7" />
        <div className="w-[22rem] max-md:w-full">
          <Text className="font-quicksand font-semibold text-coolGray-950" size="lg">
            {`${date.getHours() < 10 ? "0" : ""}${date.getHours()}:${date.getMinutes() < 10 ? "0" : ""}${date.getMinutes()}`}
          </Text>
          <Text className="font-regular font-poppins text-coolGray-600" size="sm">
            Horário
          </Text>
        </div>
      </div>
      <div className="mt-8 flex w-full items-center gap-5 border-b border-coolGray-300 pb-6">
        <CurrencyDollarIcon className="h-7" />
        <div className="w-[22rem] max-md:w-full">
          <Text className="font-quicksand font-semibold text-coolGray-950" size="lg">
            {appointments.payment_method == "pix" ? "PIX" : "cartão de crédito"}
          </Text>
          <Text className="font-regular font-poppins text-coolGray-600" size="sm">
            Método de pagamento
          </Text>
        </div>
      </div>
      <div className="mt-8 flex w-full flex-col gap-2 pb-6">
        <Text className="font-quicksand font-semibold text-coolGray-900" size="md">
          Informações adicionais do paciente:
        </Text>
        <Text className="font-regular font-poppins text-coolGray-500" size="md">
          {appointments.aditional_info}
        </Text>
      </div>
    </Modal>
  );
};

export default AppointmentModal;
