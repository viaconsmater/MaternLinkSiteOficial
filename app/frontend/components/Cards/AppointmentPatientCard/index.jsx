import {
  ArrowLongRightIcon,
  CalendarDaysIcon,
  ClockIcon,
  MapIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";
import { Avatar, Button, Text } from "@switchdreams/ui";
import React from "react";

import { monthsTranslated } from "../../../utils";

const AppointmentPatientCard = ({ info, setOpen, setAppointment }) => {
  const date = info && new Date(info.date);
  return (
    <div className={`rounded-2xl bg-white`}>
      {info ? (
        <>
          <div className="flex items-center justify-between border-b border-coolGray-300 p-6 max-md:flex-col">
            <div className="flex items-center gap-4 max-md:mb-8">
              
              <Avatar size="xl" name={info.doctor_name} scr={info.doctor_image} />
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-center gap-1">
                  <Text
                    className="font-quickSand font-bold text-coolGray-950 max-md:text-lg"
                    size="2xl"
                  >
                    {info.doctor_name}
                  </Text>
                </div>
                <Text className="text-regular font-poppins text-coolGray-600" size="sm">
                  {info.doctor_specialty}
                </Text>
              </div>
            </div>
            <Button
              vairant="outlined"
              label="Detalhes da consulta"
              className="w-60 cursor-pointer rounded-2xl border border-primary-100 font-poppins text-sm font-medium text-primary-500 hover:bg-primary-100 max-md:w-full"
              iconSide="right"
              icon={ArrowLongRightIcon}
              onClick={() => {
                setOpen(true), setAppointment(info);
              }}
            />
          </div>
          <div className="mt-8 flex items-center justify-between gap-5 border-b border-coolGray-300 px-6 pb-6 max-md:flex-col">
            <div className="flex items-center  justify-center gap-5">
              <MapPinIcon className="h-7" />
              <div className="w-full">
                <Text className="font-quicksand font-semibold text-coolGray-950" size="lg">
                  {info.location}
                </Text>
                <Text className="font-regular font-poppins text-coolGray-600" size="sm">
                  Local
                </Text>
              </div>
            </div>
            <Button
              vairant="outlined"
              label="Abrir no Mapa"
              className="w-60 cursor-pointer rounded-2xl border border-primary-100 font-poppins text-sm font-medium text-primary-500 hover:bg-primary-100 max-md:w-full"
              iconSide="right"
              icon={MapIcon}
              onClick={() => window.open(`http://maps.google.com/?q=${info.location}`)}
            />
          </div>
          <div className="mt-8 flex w-full items-center gap-5  border-b border-coolGray-300 px-6 pb-6">
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
          <div className="mt-8 flex w-full items-center gap-5 px-6 pb-6">
            <ClockIcon className="h-7" />
            <div className="w-[22rem] max-md:w-full">
              <Text className="font-quicksand font-semibold text-coolGray-950" size="lg">
                {info.approximate_start_time}
              </Text>
              <Text className="font-regular font-poppins text-coolGray-600" size="sm">
                Horário
              </Text>
            </div>
          </div>
        </>
      ) : (
        <div className="flex w-full flex-col items-center justify-center gap-10 py-20 max-md:px-5">
          <Text className="text-center font-quicksand text-4xl font-semibold text-coolGray-600">
            Você não possui próximas consultas
          </Text>
          <Text className="text-md font-regular text-center font-poppins text-coolGray-600">
            Suas próximas consultas agendadas aparecerão aqui!
          </Text>
        </div>
      )}
    </div>
  );
};

export default AppointmentPatientCard;
