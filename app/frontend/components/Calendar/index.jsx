import dayGridPlugin from "@fullcalendar/daygrid";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import { Button, Text } from "@switchdreams/ui";
import React, { useEffect, useState } from "react";

import AppointmentModal from "../Cards/AppointmentCard/appointmentDetailsModal";

const renderEventContent = (eventInfo) => {
  let event_border = "";
  let event_color = "";
  let event_user = "";

  const start_time = eventInfo.event.extendedProps.approximate_start_time;
  const end_time = eventInfo.event.extendedProps.approximate_end_time;

  switch (eventInfo.event.extendedProps.status) {
    case "completed":
      event_border = "border-green-300";
      event_color = "bg-green-100";
      event_user = "text-green-500";
      break;
    case "scheduled":
      event_border = "border-yellow-300";
      event_color = "bg-yellow-100";
      event_user = "text-yellow-500";
      break;
    case "cancelled":
      event_border = "border-red-300";
      event_color = "bg-red-100";
      event_user = "text-red-500";
      break;
    default:
      event_border = "border-gray-300";
      event_color = "bg-gray-100";
      event_user = "text-gray-500";
      break;
  }
  return (
    <div
      className={`flex w-full cursor-pointer items-center justify-between gap-4 overflow-hidden rounded-md border ${event_border} ${event_color} p-2`}
    >
      <div className="flex gap-3">
        <Text className="font-bold text-black">{eventInfo.event.extendedProps.patient_name}</Text>
        <Text className="text-black">
          {start_time} - {end_time}
        </Text>
      </div>
      <Text className={`font-bold ${event_user}`}>{eventInfo.event.extendedProps.user_name}</Text>
    </div>
  );
};

const CustomMoreButtonRender = (info) => {
  return (
    <Text className="mt-2 flex cursor-pointer items-center justify-center p-2 text-primary-500">
      + {info.num} consultas
    </Text>
  );
};

const Calendar = ({ events }) => {
  const [open, setOpen] = useState(false);
  const [event, setEvent] = useState(null);
  const calendarRef = React.createRef();

  let monthDefault = new Date().getMonth();
  let yearDefault = new Date().getFullYear();

  const [selectedYear, setSelectedYear] = useState(yearDefault);
  const [selectedMonth, setSelectedMonth] = useState(monthDefault);

  useEffect(() => {
    const calendarApi = calendarRef.current.getApi();
    calendarApi.gotoDate(new Date(selectedYear, selectedMonth));
  }, [selectedMonth]);

  const handleNextButtonClick = () => {
    const calendarApi = calendarRef.current.getApi();
    calendarApi.next();
    setSelectedMonth(calendarApi.getDate().getMonth());
    setSelectedYear(calendarApi.getDate().getFullYear());
  };
  const handlePrevButtonClick = () => {
    const calendarApi = calendarRef.current.getApi();
    calendarApi.prev();
    setSelectedMonth(calendarApi.getDate().getMonth());
    setSelectedYear(calendarApi.getDate().getFullYear());
  };

  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  let daysOfWeek = {};

  if (screenWidth <= 768) {
    daysOfWeek = {
      Sunday: "D",
      Monday: "S",
      Tuesday: "T",
      Wednesday: "Q",
      Thursday: "Q",
      Friday: "S",
      Saturday: "S",
    };
  } else {
    daysOfWeek = {
      Sunday: "Domingo",
      Monday: "Segunda",
      Tuesday: "Terça",
      Wednesday: "Quarta",
      Thursday: "Quinta",
      Friday: "Sexta",
      Saturday: "Sábado",
    };
  }

  const monthsTranslations = (year) => {
    return {
      0: `Janeiro de ${year}`,
      1: `Fevereiro de ${year}`,
      2: `Março de ${year}`,
      3: `Abril de ${year}`,
      4: `Maio de ${year}`,
      5: `Junho de ${year}`,
      6: `Julho de ${year}`,
      7: `Agosto de ${year}`,
      8: `Setembro de ${year}`,
      9: `Outubro de ${year}`,
      10: `Novembro de ${year}`,
      11: `Dezembro de ${year}`,
    };
  };

  const customDayHeaders = ({ date }) => {
    const dayName = date.toLocaleDateString("en-US", { weekday: "long", timeZone: "UTC" });
    return (
      <div className="border-none font-poppins text-sm font-medium text-coolGray-700">
        {daysOfWeek[dayName]}
      </div>
    );
  };

  const changeModal = async (bool) => {
    setOpen(bool);
  };

  return (
    <>
      {event && <AppointmentModal open={open} setOpen={setOpen} appointments={event} />}
      <div className="flex h-screen w-full max-w-screen-big flex-col overflow-auto rounded-lg bg-transparent pt-16 max-md:px-6 md:pt-0">
        <div className="my-10 flex w-full justify-between max-md:flex-col">
          <div className="flex w-full items-center gap-4">
            <h1 className="flex-wrap text-2xl">Calendário de eventos</h1>
          </div>
          <div className="flex items-center justify-between gap-4 pt-8 md:pt-0 ">
            <Button
              onClick={handlePrevButtonClick}
              className={`size-8`}
              label={<ChevronLeftIcon className="h-4 text-secondary-500 max-md:h-8" />}
            />
            <Text className="text-md min-w-40 text-center font-quicksand font-semibold text-coolGray-950">
              {monthsTranslations(selectedYear)[selectedMonth]}
            </Text>
            <Button
              onClick={handleNextButtonClick}
              className={`size-8`}
              label={<ChevronRightIcon className="h-4 text-secondary-500 max-md:h-8" />}
            />
          </div>
        </div>
        <div className="h-screen w-full bg-white p-6 shadow-lg">
          <FullCalendar
            events={events}
            ref={calendarRef}
            plugins={[dayGridPlugin, timeGridPlugin, timeGridPlugin]}
            initialView={"dayGridMonth"}
            dayHeaderClassNames="rounded-lg bg-white shadow-md"
            height={"100%"}
            headerToolbar={false}
            eventContent={renderEventContent}
            dayHeaderContent={customDayHeaders}
            moreLinkContent={(e) => CustomMoreButtonRender(e)}
            eventClick={(e) => {
              setEvent(events.find((obj) => obj.id == e.event._def.publicId));
              changeModal(true);
            }}
            dayMaxEventRows={3}
          />
        </div>
      </div>
    </>
  );
};

export default Calendar;
