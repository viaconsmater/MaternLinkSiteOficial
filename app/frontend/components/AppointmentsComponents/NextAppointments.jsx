import {
  ChevronLeftIcon,
  ChevronRightIcon,
  PencilIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import { Button, Text } from "@switchdreams/ui";
import React, { useState } from "react";

import AppointmentCard from "@/components/Cards/AppointmentCard";

import { monthsTranslated } from "../../utils";

const NextAppointments = ({
  pending_appointments,
  doctor_availabilities,
  appointments,
  setSidebarOpen,
}) => {
  const [currentDayIndex, setCurrentDayIndex] = useState(0);
  const [currentDate, setCurrentDate] = useState(new Date());

  const handlePreviousDay = () => {
    if (currentDayIndex > 0) {
      setCurrentDayIndex((prevIndex) => Math.max(prevIndex - 1, 0));
      setCurrentDate((currentDate) => {
        const newDate = new Date();
        newDate.setDate(currentDate.getDate() - 1);
        return newDate;
      });
    }
  };

  const handleNextDay = () => {
    if (currentDayIndex < 14) {
      setCurrentDayIndex((prevIndex) => prevIndex + 1);
      setCurrentDate((currentDate) => {
        const newDate = new Date();
        newDate.setDate(currentDate.getDate() + 1);
        return newDate;
      });
    }
  };

  const getDayHeader = () => {
    if (currentDayIndex == 0) {
      return "Hoje";
    } else if (currentDayIndex == 1) {
      return "Amanhã";
    } else {
      return `${currentDate.getDate()} de ${monthsTranslated[currentDate.getMonth()]}`;
    }
  };

  const getWeekDay = () => {
    const weekDays = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
    return weekDays[currentDate.getDay()];
  };

  const buildSchedule = (availabilities, day_appointments) => {
    const schedule = [];

    // Generate all time slots from 6:00 to 22:00 in 30-minute intervals
    for (let hour = 6; hour <= 22; hour++) {
      for (let minute = 0; minute <= 30; minute += 30) {
        const time = `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`;
        schedule.push({ time, status: "imposible" });
      }
    }

    // Check each availability range against the schedule
    availabilities.forEach((range) => {
      const startTime = convertTimeToNumber(range.start_time);
      const endTime = convertTimeToNumber(range.end_time);
      for (let i = 0; i < schedule.length; i++) {
        const scheduleTime = convertTimeToNumber(schedule[i].time);
        if (scheduleTime >= startTime && scheduleTime < endTime) {
          schedule[i].status = "open"; // Mark overlapping time slots as closed
        }
      }
    });

    day_appointments.forEach((appointment) => {
      const startTime = convertTimeToNumber(appointment.approximate_start_time);
      for (let i = 0; i < schedule.length; i++) {
        const scheduleTime = convertTimeToNumber(schedule[i].time);
        if (scheduleTime == startTime) {
          schedule[i].status = "closed"; // Mark overlapping time slots as imposible
        }
      }
    });

    return schedule;
  };

  const convertTimeToNumber = (timeString) => {
    // Helper function to convert "HH:MM" string to a number representing minutes since 6:00
    const [hours, minutes] = timeString.split(":");
    return parseInt(hours, 10) * 60 + parseInt(minutes, 10);
  };

  const isSameDay = (date1, date2) => {
    if (!(date1 instanceof Date) || !(date2 instanceof Date)) {
      return false;
    }

    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  };

  return (
    <>
      <div className="flex flex-col max-md:w-screen max-md:px-5">
        <Button
          label="Editar disponibilidade"
          className="mb-8 flex w-full rounded-2xl border border-primary-400 bg-primary-500 px-6 py-2 font-poppins text-sm font-medium text-white duration-500 hover:bg-primary-100 md:hidden"
          iconSide="right"
          icon={PencilIcon}
          onClick={() => setSidebarOpen(true)}
        />
        <Text className="mb-8 font-quicksand font-semibold text-coolGray-950" size="2xl">
          Próximas consultas
        </Text>
        {pending_appointments.length === 0 ? (
          <div className="flex size-full flex-col items-center justify-center gap-2 rounded-2xl border border-coolGray-400 bg-coolGray-200 px-4 py-16 lg:m-0 lg:p-8">
            <Text className="text-center font-quicksand font-semibold text-coolGray-600" size="3xl">
              Nenhuma consulta por aqui
            </Text>

            <Text
              className="font-regular text-center font-quicksand text-coolGray-600 lg:w-80"
              size="md"
            >
              Infelizmente você não possui consultas marcadas para os próximos dias
            </Text>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {pending_appointments.slice(0, 3).map((appointment, idx) => (
              <AppointmentCard key={idx} appointments={appointment} idx={idx} />
            ))}
            {pending_appointments.length > 3 && (
              <Button
                label={`+${pending_appointments.length - 3} sessões hoje`}
                variant="outline"
                className="transition-500 rounded-2xl font-poppins text-sm font-medium text-primary-600 transition-all hover:bg-primary-500 hover:text-white"
              />
            )}
          </div>
        )}
      </div>
      <div className="w-[45rem] max-md:px-5 max-sm:w-full">
        <div className="mb-5 flex justify-between">
          <Text className="font-quicksand font-semibold text-coolGray-950" size="2xl">
            Horários marcados
          </Text>
          <Button
            label="Editar disponibilidade"
            className={`${doctor_availabilities.length > 0 ? "flex" : "hidden"} w-fit rounded-2xl border border-primary-400 bg-primary-500 px-6 py-2 font-poppins text-sm font-medium text-white duration-500 hover:bg-primary-100 max-md:hidden`}
            iconSide="right"
            icon={PencilIcon}
            onClick={() => setSidebarOpen(true)}
          />
        </div>
        <div className="flex w-full flex-col gap-6 rounded-lg bg-white p-6 max-sm:px-0 max-sm:py-6">
          <div
            className={`${doctor_availabilities.length > 0 ? "flex max-md:flex-col-reverse" : "hidden"} justify-between`}
          >
            <div className="flex gap-4 max-sm:justify-between">
              <div className="flex items-center gap-1">
                <div className="size-2 rounded-full bg-secondary-400" />
                <Text>Agendado</Text>
              </div>
              <div className="flex items-center gap-1">
                <div className="size-2 rounded-full border border-coolGray-300" />
                <Text>Disponível</Text>
              </div>
              <div className="flex items-center gap-1">
                <div className="size-2 rounded-full bg-coolGray-400 " />
                <Text>Indisponível</Text>
              </div>
            </div>
            <div className="flex w-40 items-center justify-between gap-5 max-md:mb-6 max-md:w-full">
              <ChevronLeftIcon
                className={`h-4 cursor-pointer max-md:h-8 ${currentDayIndex === 0 ? "cursor-not-allowed text-coolGray-500" : "text-secondary-500 "}`}
                onClick={handlePreviousDay}
                disabled={currentDayIndex === 0}
              />
              <Text className="font-poppins text-sm font-medium text-coolGray-950 max-md:text-lg">
                {getDayHeader()}
              </Text>
              <ChevronRightIcon
                className={`h-4 cursor-pointer max-md:h-8 ${currentDayIndex === 14 ? "cursor-not-allowed text-coolGray-500" : "text-secondary-500 "}`}
                onClick={handleNextDay}
                disabled={currentDayIndex === 14}
              />
            </div>
          </div>
          <div
            className={`w-full ${doctor_availabilities.length > 0 ? "grid grid-cols-7 gap-3 max-md:grid-cols-5 max-md:gap-2 max-sm:grid-cols-4" : "flex h-96 flex-col items-center justify-center gap-8 bg-coolGray-200"}`}
          >
            {doctor_availabilities.length > 0 ? (
              buildSchedule(
                doctor_availabilities.filter(
                  (availability) => availability.day_of_week == getWeekDay(),
                ),
                appointments.filter((appointment) =>
                  isSameDay(new Date(appointment.date), currentDate),
                ),
              ).map((time, idx) => (
                <div
                  key={idx}
                  className={`flex items-center justify-center rounded-md border border-coolGray-300 p-5 max-md:px-2 max-md:py-4 ${
                    time.status === "imposible"
                      ? "bg-coolGray-300 text-coolGray-500"
                      : time.status === "open"
                        ? "text-coolGray-600"
                        : "bg-secondary-400 text-white"
                  }`}
                >
                  <Text size="md" className="font-regular font-poppins">
                    {time.time}
                  </Text>
                </div>
              ))
            ) : (
              <>
                <Text className="text-center text-2xl font-semibold text-coolGray-950 md:text-4xl ">
                  Crie a sua agenda e adicione seus horários disponíveis
                </Text>
                <Button
                  label="Criar minha agenda"
                  className="mb-8 flex w-5/6 rounded-2xl border border-primary-400 bg-primary-500 px-6 py-2 font-poppins text-sm font-medium text-white duration-500 hover:bg-primary-100 md:w-1/2"
                  iconSide="left"
                  icon={PlusIcon}
                  onClick={() => setSidebarOpen(true)}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default NextAppointments;
