import {
  CalendarDaysIcon,
  FaceSmileIcon,
  HeartIcon,
  StarIcon,
  // StarIcon,
} from "@heroicons/react/24/outline";
import { router, usePage } from "@inertiajs/react";
import { Avatar, Text } from "@switchdreams/ui";
import React, { useState } from "react";
import { ErrorBoundary } from "react-error-boundary";

import Modal from "@/components/Modal";
import { useAlert } from "@/contexts/Alert";
import { extractTime, imagePath, monthsTranslated, weekDaysTranslated } from "@/utils";

const ExamCard = ({ doctorInfo, selected, onClick, onClickReviews, onClickImages }) => {
  console.log('DADOS DOUTOS', doctorInfo)
  const { currentUser } = usePage().props;
  const { showAlert } = useAlert();
  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState("");
  const [currentDay, setCurrentDay] = useState(new Date());
  const today = new Date();
  const tomorrow = new Date(today);
  const [openReviews, setOpenReviews] = useState(true);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const loadMoreRight = () => {
    const newDay = new Date(currentDay);
    newDay.setDate(newDay.getDate() + 3);
    setCurrentDay(newDay);
  };

  const loadMoreLeft = () => {
    const newDay = new Date(currentDay);
    newDay.setDate(newDay.getDate() - 3);
    setCurrentDay(newDay);
  };

  const HOUR_LIMIT_TO_SCHEDULE = 2;

  // How to returns the next 6 days based on currentDay state
  const calcNextSixDays = () => {
    const nextSixDays = [];
    for (let i = 0; i < 6; i++) {
      const newDay = new Date(currentDay);
      newDay.setDate(newDay.getDate() + i);
      nextSixDays.push(newDay);
    }
    return nextSixDays;
  };

  const nextSixDays = calcNextSixDays();

  const getWeekDay = (currentDate) => {
    const weekDays = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
    return weekDays[currentDate.getDay()];
  };

  const buildSchedule = (availabilities, day_appointments, date) => {
    const schedule = [];

    const isToday = isSameDay(date, new Date());
    const todayLimitTime =
      convertTimeToNumber(extractTime(new Date())) + 60 * HOUR_LIMIT_TO_SCHEDULE;

    // Generate all time slots from 6:00 to 22:00 in 30-minute intervals
    for (let hour = 6; hour <= 22; hour++) {
      for (let minute = 0; minute <= 30; minute += 30) {
        const time = `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`;
        schedule.push({ time, status: "unavailable" });
      }
    }

    // Check each availability range against the schedule
    availabilities.forEach((range) => {
      // if(isToday) {
      //   const startTime = convertTimeToNumber(range.start_time);
      // } else {
      // }
      const availabilityStartTime = convertTimeToNumber(range.start_time);
      const availabilityEndTime = convertTimeToNumber(range.end_time);
      schedule.forEach((availability) => {
        const scheduleTime = convertTimeToNumber(availability.time);
        if (scheduleTime >= availabilityStartTime && scheduleTime < availabilityEndTime) {
          // Do not include past times if for today's availabilities
          if (!(isToday && todayLimitTime >= scheduleTime)) {
            availability.status = "available";
          }
        }
      });
    });

    day_appointments.forEach((appointment) => {
      const startTime = convertTimeToNumber(appointment.approximate_start_time);
      for (let i = 0; i < schedule.length; i++) {
        const scheduleTime = convertTimeToNumber(schedule[i].time);
        if (scheduleTime == startTime) {
          schedule[i].status = "scheduled"; // Mark overlapping time slots as scheduled
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

  const getDayHeader = (idx, day) => {
    if (isSameDay(day, today)) {
      return "Hoje";
    } else if (isSameDay(day, tomorrow)) {
      return "Amanhã";
    } else {
      return weekDaysTranslated[day.getDay()];
    }
  };

  const changeSelect = () => {
    usePage().props.handleSelect("alou");
  };

  return (
    <ErrorBoundary fallback={<div>Aconteceu algum problema para exibir o profissional...</div>}>
      {selectedDate && (
        <Modal
          confirmLabel="continuar"
          cancelLabel="cancelar"
          open={open}
          setOpen={setOpen}
          onClickConfirm={() =>
            router.get("/consultas/new", {
              date: selectedDate,
              time: selectedTime,
              doctor_id: doctorInfo.id,
            })
          }
          onClickCancel={() => setOpen(false)}
        >
          <div className="flex size-full flex-col items-center justify-center">
            <div className="flex size-20 items-center justify-center rounded-full bg-secondary-25">
              <CalendarDaysIcon className="h-8 text-secondary-700" />
            </div>
            <Text className="my-5 flex max-w-md flex-wrap justify-center gap-2 text-center font-quicksand text-3xl font-bold text-coolGray-900">
              Agendar consulta para o dia{" "}
              <Text className="text-center font-quicksand text-3xl font-bold text-secondary-600">
                {selectedDate.getDate()} de {monthsTranslated[selectedDate.getMonth()]}
              </Text>{" "}
              às{" "}
              <Text className="text-center font-quicksand text-3xl font-bold text-secondary-600">
                {selectedTime}
              </Text>
              ?
            </Text>
            <Text className="font-regular text-center font-poppins text-lg text-coolGray-600">
              Você será direcionado para etapa de checkout.
            </Text>
          </div>
        </Modal>
      )}
      <div className="flex h-fit w-full rounded-2xl bg-white shadow-lg max-xl:flex-col ">
        <div className="min-w-100 flex flex-col gap-5 px-3 py-6">
          <div className="min-w-100 flex items-center gap-4 px-6">
            
            <Avatar
              size="lg"
              name={doctorInfo.name}
              avatarUrl={doctorInfo.image}
              className="bg-primary-25"
            />
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-1">
                <Text
                  className="font-quickSand font-bold text-coolGray-950 max-md:text-lg"
                  size="2xl"
                >
                  {doctorInfo.name}
                </Text>
                {doctorInfo.verified && (
                  <img src={imagePath("valid.svg")} alt="icone de verificado" />
                )}
              </div>
              <Text className="text-regular font-poppins text-coolGray-600" size="sm">
                {doctorInfo.description}
              </Text>
              <Text
                className="cursor-pointer font-poppins font-medium text-secondary-700"
                size="md"
                onClick={onClickImages}
              >
                Ver mais fotos
              </Text>
            </div>
          </div>
          <div className="px-6">
            <div className="flex gap-4 max-md:flex-col">
              <div className="font-regular flex items-center gap-1 font-poppins text-sm text-coolGray-600">
                <HeartIcon className="w-4 text-secondary-500" />
                <Text className="font-poppins font-medium text-secondary-700" size="sm">
                  {doctorInfo.months_registered} meses
                </Text>
                no via consultas
              </div>
              <div className="font-regular text-md flex items-center gap-1 font-poppins text-sm text-coolGray-600">
                <FaceSmileIcon className="w-4 text-secondary-500" />
                <Text className="font-poppins font-medium text-secondary-700" size="sm">
                  {doctorInfo.patients_treated} pacientes
                </Text>
                atendidos
              </div>
              <div
                onClick={onClickReviews}
                className="font-regular text-md flex cursor-pointer items-center gap-1 font-poppins text-sm text-coolGray-600"
              >
                <StarIcon className="w-4 text-secondary-500" />
                <Text className="font-poppins font-medium text-secondary-700" size="sm">
                  {doctorInfo.reviews.length}
                </Text>
                Avaliações
              </div>
            </div>
          </div>
          <Text
            className="font-regular max-h-32 w-full overflow-y-scroll px-6 font-poppins text-coolGray-800"
            size="md"
          >
            {doctorInfo.doctor_description}
          </Text>
          <div className="flex items-center gap-1 px-6">
            {/* <Text className="font-poppins font-semibold text-coolGray-700" size="lg">
              {formatIntegerCurrency(doctorInfo.value)}
            </Text> */}

            {/* <Text className="font-regular font-poppins text-coolGray-700" size="md">
             Ver Fotos
            </Text> */}
          </div>
          <div class="w-full">
            <div
              onClick={onClick}
              className={
                " Button inline-flex w-full cursor-pointer  items-center justify-center gap-2 rounded-2xl py-3 " +
                (doctorInfo.selected !== true ? "bg-[#008d82]" : "bg-[#A30000]")
              }
            >
              <button class="Text text-base font-medium leading-snug  text-white">
                {doctorInfo.selected !== true
                  ? "Adicionar para o Orçamento"
                  : "Remover do Orçamento"}
              </button>
            </div>
          </div>

          <div className="flex gap-4 border-t border-t-coolGray-200 px-6 pt-6">
            <div>
              <Text className="text-regular font-poppins text-sm text-coolGray-600" size="sm">
                {doctorInfo.address.neighborhood}{" "}
                {/* {doctorInfo.address.street},{" "}
                {doctorInfo.address.number}, {doctorInfo.address.city} - {doctorInfo.address.state}{" "}
                - {doctorInfo.address.cep} */}
              </Text>
            </div>
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default ExamCard;
