import { Spinner, Text } from "@switchdreams/ui";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";

import AppointmentPatientCard from "@/components/Cards/AppointmentPatientCard";

import PatientAppointmentCard from "../../components/Cards/PatientAppointmentCard";
import AppointmentPatientModal from "../User/modal/AppointmentPatientModal";

const Appointment = ({ appointment_history, next_appointments, pagy }) => {
  const [appointment, setAppointment] = useState({
    name: "",
    image: "",
    gender: "",
    age: "",
    value: "",
    location: "",
    date: "",
  });
  const [open, setOpen] = useState(false);
  const [nextPage, setNextPage] = useState(2);
  const [appointments, setAppointments] = useState(appointment_history);
  const maxPages = pagy.pages;

  const getMoreAppointments = () => {
    axios
      .get(`/minhas_consultas.json?page=${nextPage}`)
      .then((response) => setAppointments(appointments.concat(response.data)))
      .finally(() => setNextPage(nextPage + 1));
  };

  const elementRef = useRef(null);

  function onIntersection(entries) {
    const firstEntry = entries[0];
    if (firstEntry.isIntersecting && nextPage <= maxPages) {
      getMoreAppointments();
    }
  }

  useEffect(() => {
    const observer = new IntersectionObserver(onIntersection);
    if (observer && elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  });

  return (
    <>
      <AppointmentPatientModal info={appointment} open={open} setOpen={setOpen} />
      <div className="flex w-full justify-center bg-coolGray-100 max-lg:h-fit">
        <div className="mt-12 w-full max-w-screen-big max-xl:px-5">
          <Text className="mb-8 font-quicksand font-semibold text-coolGray-950" size="2xl">
            Próxima consulta
          </Text>
          <AppointmentPatientCard
            info={next_appointments[0] || null}
            setAppointment={setAppointment}
            setOpen={setOpen}
          />

          {next_appointments.length > 1 && (
            <>
              <Text className="my-12 font-quicksand font-semibold text-coolGray-950" size="2xl">
                Próximas Consultas
              </Text>
              <div className="mb-12 flex w-full flex-col gap-4">
                {next_appointments.slice(1).map((info, idx) => {
                  return (
                    <PatientAppointmentCard
                      appointment={info}
                      key={idx}
                      setAppointment={setAppointment}
                      setOpen={setOpen}
                    />
                  );
                })}
              </div>
            </>
          )}

          <Text className="my-12 font-quicksand font-semibold text-coolGray-950" size="2xl">
            Histórico de consultas
          </Text>
          <div className="mb-12 flex w-full flex-col gap-4">
            {appointments.map((info, idx) => {
              return (
                <PatientAppointmentCard
                  appointment={info}
                  key={idx}
                  setAppointment={setAppointment}
                  setOpen={setOpen}
                />
              );
            })}
            {nextPage <= maxPages && (
              <div ref={elementRef} className="flex w-full justify-center">
                <Spinner />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Appointment;
