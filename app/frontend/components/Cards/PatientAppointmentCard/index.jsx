import {
  ArrowLongRightIcon,
  CalendarDaysIcon,
  ClockIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { Link } from "@inertiajs/react";
import { Avatar, Badge, Button, Text } from "@switchdreams/ui";
import React from "react";

import { monthsTranslated } from "@/utils";

const PatientAppointmentCard = ({ appointment, setAppointment, setOpen }) => {
  const date = new Date(appointment.date);

  const renderButton = () => {
    if (
      appointment.payment_status === "pending" ||
      appointment.payment_status === "payment_cancelled"
    ) {
      return (
        <Link href={`consultas/${appointment.id}/payment`}>
          <Button
            variant="outlined"
            label="Detalhes do Pagamento"
            className="w-fit cursor-pointer rounded-2xl border border-primary-100 px-5 font-poppins text-sm font-medium text-primary-500 hover:bg-primary-100"
            iconSide="right"
            icon={ArrowLongRightIcon}
          />
        </Link>
      );
    } else {
      return (
        <Button
          variant="outlined"
          label="Detalhes da consulta"
          className="w-fit cursor-pointer rounded-2xl border border-primary-100 px-5 font-poppins text-sm font-medium text-primary-500 hover:bg-primary-100"
          iconSide="right"
          icon={ArrowLongRightIcon}
          onClick={() => {
            setAppointment(appointment);
            setOpen(true);
          }}
        />
      );
    }
  };

  const renderBadge = () => {
    if (appointment.payment_status === "pending") {
      return <Badge label="Pagamento Pendente" leftIcon={ClockIcon} color="warning" />;
    } else if (
      appointment.payment_status === "payment_cancelled" ||
      appointment.status === "cancelled"
    ) {
      return <Badge label="Cancelada" leftIcon={XMarkIcon} color="warning" />;
    }
  };
  return (
    <div className="flex items-center justify-between gap-2 rounded-2xl bg-white p-6 max-md:flex-col">
      <div className="flex items-center gap-4 max-md:mb-8">
        <Avatar size="xl" name={appointment.doctor_name} avatarUrl={appointment.doctor_image} />
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-center gap-1">
            <Text className="font-quickSand font-bold text-coolGray-950 max-md:text-lg" size="2xl">
              {appointment.doctor_name}
            </Text>
          </div>
          <div className="flex items-center gap-1">
            <CalendarDaysIcon className="h-5 text-coolGray-600" />
            <Text className="text-regular font-poppins text-coolGray-600" size="md">
              {`${date.getDate()} de ${monthsTranslated[date.getMonth()]} de ${date.getFullYear()} às ${appointment.approximate_start_time}`}
            </Text>
          </div>
        </div>
      </div>
      {renderBadge()}
      <div className="flex items-center gap-2 max-md:flex-col max-md:gap-5">{renderButton()}</div>
    </div>
  );
};

export default PatientAppointmentCard;
