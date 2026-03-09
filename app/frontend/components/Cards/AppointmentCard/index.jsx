import { CalendarDaysIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { Avatar, Button, Text } from "@switchdreams/ui";
import React, { useState } from "react";

import { monthsTranslated } from "../../../utils";
import AppointmentModal from "./appointmentDetailsModal";

const AppointmentCard = ({ appointments, idx }) => {
  const [open, setOpen] = useState(false);
  const date = new Date(appointments.date);
  return (
    <>
      <AppointmentModal open={open} setOpen={setOpen} appointments={appointments} />
      <div
        className="flex cursor-pointer flex-col items-center justify-between gap-5 rounded-2xl bg-white px-4 py-5 shadow-sm max-md:w-full"
        onClick={() => setOpen(true)}
      >
        <div className="flex w-full justify-between">
          <div className="flex gap-2 max-md:flex-col">
            <Avatar
              size="lg"
              name={appointments.patient_name}
              avatarUrl={appointments.image}
              className="bg-primary-25"
            />
            <div className="w-[22rem] max-md:w-full">
              <Text className="font-quicksand font-bold text-coolGray-950" size="xl">
                {appointments.patient_name}
              </Text>
              <Text className="font-regular flex gap-1 font-poppins text-coolGray-600" size="md">
                <CalendarDaysIcon className="w-4" />
                {`${date.getDate()} de ${monthsTranslated[date.getMonth() - 1]}, ${date.getFullYear()} às ${date.getHours() < 10 ? "0" : ""}${date.getHours()}:${date.getMinutes() < 10 ? "0" : ""}${date.getMinutes()}`}
              </Text>
            </div>
          </div>
          <ChevronRightIcon className="w-4" />
        </div>
        {idx === 0 && (
          <Button
            label="Próxima consulta"
            className="text-md transition-500 rounded-2xl bg-secondary-25 font-poppins font-medium text-secondary-800 transition-all hover:bg-secondary-100"
          />
        )}
      </div>
    </>
  );
};

export default AppointmentCard;
