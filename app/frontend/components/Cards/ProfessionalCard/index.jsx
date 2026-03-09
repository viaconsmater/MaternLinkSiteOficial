import {
  CalendarDaysIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  FaceSmileIcon,
  HeartIcon,
  // StarIcon,
} from "@heroicons/react/24/outline";
import { router, usePage } from "@inertiajs/react";
import { Avatar, Text } from "@switchdreams/ui";
import React, { useState } from "react";
import { ErrorBoundary } from "react-error-boundary";

import Modal from "@/components/Modal";
import { useAlert } from "@/contexts/Alert";
import {
  extractTime,
  formatIntegerCurrency,
  imagePath,
  monthsTranslated,
  monthsTranslatedAbreviation,
  weekDaysTranslated,
} from "@/utils";
import { StarIcon } from "@heroicons/react/24/solid";

const ProfessionalCard = ({ doctorInfo, onClickReviews, onClickImages }) => {
  const { currentUser } = usePage().props;
  const { showAlert } = useAlert();
  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState("");
  const [currentDay, setCurrentDay] = useState(new Date());

  const today = new Date();
  const tomorrow = new Date(today);
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
      <div className="flex h-fit w-full rounded-2xl bg-white shadow-lg max-xl:flex-col">
        <div className="flex flex-col gap-5 py-6">
          <div className="flex items-center gap-4 px-6">
            <Avatar size="xl" name={doctorInfo.name} avatarUrl={doctorInfo.image} />
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
                {doctorInfo.specialty}
              </Text>
            </div>
          </div>
          <div className="px-6">
            <div className="flex gap-4 max-md:flex-col">
              <div className="font-regular flex items-center gap-1 font-poppins text-sm text-coolGray-600">
                <HeartIcon className="w-4 text-secondary-500" />
                <Text className="font-poppins font-medium text-secondary-700" size="sm">
                  {doctorInfo.registered_since}
                </Text>
                no via consultas
              </div>
              <div className="font-regular text-md flex items-center gap-1 font-poppins text-sm text-coolGray-600">
                <FaceSmileIcon className="w-4 text-secondary-500" />
                <Text className="font-poppins font-medium text-secondary-700" size="sm">
                  {doctorInfo.patients} pacientes
                </Text>
                atendidos
              </div>
            </div>
            <div className="flex gap-4 max-md:flex-col mt-2">
              <div
              onClick={onClickReviews} 
              className="font-regular text-md flex cursor-pointer items-center gap-1 font-poppins text-sm text-coolGray-600">
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
            <Text className="font-poppins font-semibold text-coolGray-700" size="lg">
              {formatIntegerCurrency(doctorInfo.value)}
            </Text>
            <Text className="font-regular font-poppins text-coolGray-700" size="md">
              / consulta
            </Text>
          </div>
          <div className="flex gap-4 border-t border-t-coolGray-200 px-6 pt-6">
            <div className={`relative ${doctorInfo.size === 'lg' ? 'w-16 h-16' : 'w-16 h-16'} ${doctorInfo.className}`}>
              <div className="absolute inset-0 overflow-hidden rounded-full bg-primary-25">
                <img
                  src={doctorInfo.image}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div>
              <Text className="font-quickSand font-semibold text-coolGray-950" size="lg">
                {doctorInfo.clinic_name}
              </Text>
              <Text className="text-regular font-poppins text-sm text-coolGray-600" size="sm">
                {doctorInfo.clinic_address}
              </Text>
            </div>
          </div>
        </div>
        <div className="relative border-l border-coolGray-300 lg:min-w-[700px]">
          <ChevronLeftIcon className="absolute left-6 top-6 w-4" onClick={() => loadMoreLeft()} />

          <ChevronRightIcon
            className="absolute right-6 top-6 w-4"
            onClick={() => loadMoreRight()}
          />

          <div className="grid max-h-[320px] w-full grid-cols-3 justify-center overflow-y-auto px-9 pb-4 md:grid-cols-6">
            {nextSixDays.map((day, idx) => (
              <div
                className={
                  `sticky top-0 flex min-w-16 flex-col flex-nowrap items-center gap-3 bg-white px-5 py-4 lg:min-w-20 ` +
                  (idx > 2 ? "hidden md:flex" : "")
                }
                key={idx}
              >
                <Text className="font-regular flex-nowrap font-poppins text-coolGray-600" size="xs">
                  {day.getDate()} {monthsTranslatedAbreviation[day.getMonth()]}
                </Text>
                <Text className="font-quicksand font-semibold text-coolGray-950" size="md">
                  {getDayHeader(idx, day)}
                </Text>
              </div>
            ))}
            {nextSixDays.map((date, index) => {
              return (
                <div
                  key={index}
                  className={
                    `flex flex-col items-center gap-4 ` + (index > 2 ? "hidden md:flex" : "")
                  }
                >
                  {buildSchedule(
                    doctorInfo.availabilities.filter(
                      (availability) => availability.day_of_week == getWeekDay(date),
                    ),
                    doctorInfo.appointments.filter((appointment) =>
                      isSameDay(new Date(appointment.date), date),
                    ),
                    date,
                  ).map((time, idx) => {
                    return (
                      <div
                        key={idx}
                        className={`flex h-11 w-16 items-center justify-center rounded-md px-3 py-4 ${
                          time.status === "unavailable"
                            ? "bg-coolGray-300 text-coolGray-500"
                            : time.status === "available"
                              ? "cursor-pointer bg-secondary-25 text-coolGray-600 transition-all duration-200 hover:scale-125"
                              : "bg-secondary-400 text-white"
                        }`}
                        onClick={() => {
                          if (time.status === "available") {
                            setSelectedDate(date);
                            setSelectedTime(time.time);
                            if (currentUser && currentUser.role == "patient") {
                              setOpen(true);
                            } else {
                              showAlert({
                                message: `É necessário estar logado ${currentUser && currentUser.role == "doctor" ? "como paciente" : ""} para agendar uma consulta`,
                              });
                            }
                          }
                        }}
                      >
                        <Text className={`font-poppins font-medium`} size="sm">
                          {time.time}
                        </Text>
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default ProfessionalCard;
