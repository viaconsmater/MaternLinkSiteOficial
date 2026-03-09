import {
  CalendarDaysIcon,
  ClockIcon,
  CurrencyDollarIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";
import { Avatar, Text } from "@switchdreams/ui";
import React from "react";

import Modal from "@/components/Modal";
import { imagePath } from "@/utils";

import { formatIntegerCurrency, monthsTranslated } from "../../../utils";
import { Link } from "@inertiajs/react";

const AppointmentPatientModal = ({ info, open, setOpen }) => {
  const date = new Date(info.date);
  return (
    <Modal open={open} setOpen={setOpen} padding={true}>
      <div className="mt-8 flex w-full justify-between border-b border-coolGray-300 pb-6 max-md:flex-col max-md:justify-start">
        <div className="flex gap-2 max-md:flex-col">
          <Avatar
            size="lg"
            name={info?.doctor_name || ""}
            avatarUrl={info?.doctor_image || ""}
            className="bg-primary-25"
          />
          <div className="w-[22rem] max-md:w-full">
            <Text className="font-quicksand font-bold text-coolGray-950" size="2xl">
              {info?.doctor_name || ""}
            </Text>
            <Text className="font-regular flex gap-1 font-poppins text-coolGray-600" size="md">
              {info?.doctor_gender || ""}, {info?.doctor_age || ""} anos
            </Text>
          </div>
        </div>
        <Text className="font-quicksand font-bold text-coolGray-950" size="3xl">
          {formatIntegerCurrency(info?.price_cents) || ""}
        </Text>
      </div>
      <div className="mt-8 flex w-full justify-between border-b border-coolGray-300 pb-6">
        <div className="flex items-center justify-center gap-5">
          <MapPinIcon className="h-7" />
          <div className="w-[22rem] max-md:w-full">
            <Text className="font-quicksand font-semibold text-coolGray-950" size="lg">
              {info?.location || ""}
            </Text>
            <Text className="font-regular font-poppins text-coolGray-600" size="sm">
              Local
            </Text>
          </div>
        </div>
        <img src={imagePath("clinicLogo.svg")} className="rounded-lg" />
      </div>
      <div className="mt-8 flex w-full items-center gap-5 border-b border-coolGray-300 pb-6">
        <CalendarDaysIcon className="h-7" />
        <div className="w-[22rem] max-md:w-full">
          <Text className="font-quicksand font-semibold text-coolGray-950" size="lg">
            {`${date.getDate()} de ${monthsTranslated[date.getMonth()]} de ${date.getFullYear()}`}
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
            {info?.approximate_start_time}
          </Text>
          <Text className="font-regular font-poppins text-coolGray-600" size="sm">
            Horário
          </Text>
        </div>
      </div>
      <div className="mt-8 flex w-full items-center gap-5">
        <CurrencyDollarIcon className="h-7" />
        <div className="w-[22rem] max-md:w-full">
          <Text className="font-quicksand font-semibold text-coolGray-950" size="lg">
            {info?.payment_method == "pix" ? "PIX" : "cartão de crédito"}
          </Text>
          <Text className="font-regular  font-poppins text-coolGray-600" size="sm">
            Método de pagamento
          </Text>
        </div>
      </div>
      <div className="mt-8 flex w-full items-center gap-5">
        <div className="w-full max-md:w-full">
          <Text className="font-regular text-lg font-poppins text-black text-center " size="md">
          <Link href={`/reviews/new?reviewable_id=${info.doctor_id}&reviewable_type=Doctor`}>
            <b>Sua avaliação é muito importante! <br /> Clique aqui e deixe uma avaliação para a clínica</b>
          </Link>
          </Text>
        </div>
      </div>
    </Modal>
  );
};

export default AppointmentPatientModal;
