import { LockClosedIcon } from "@heroicons/react/24/outline";
import { Link, usePage } from "@inertiajs/react";
import { Button, Text } from "@switchdreams/ui";
import React, { useState } from "react";

import Calendar from "@/components/Calendar";
import TimeSidebar from "@/components/Sidebar";

import AppointmentsHistory from "../../components/AppointmentsComponents/AppointmentsHistory";
import NextAppointments from "../../components/AppointmentsComponents/NextAppointments";

const Appointments = ({
  doctor_availabilities,
  appointments,
  pending_appointments,
  done_appointments,
  pagy,
}) => {
  const { currentUser } = usePage().props;
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (currentUser.active_plan) {
    return (
      <>
        <TimeSidebar
          open={sidebarOpen}
          setOpen={setSidebarOpen}
          doctorAvailabilities={doctor_availabilities}
          userId={currentUser.id}
        />
        <div className="flex h-fit w-full flex-col items-center justify-center gap-3 bg-coolGray-100 pb-6 pt-12 max-xl:h-fit">
          <div className="flex max-w-screen-big gap-8 max-xl:flex-col">
            <NextAppointments
              pending_appointments={pending_appointments}
              doctor_availabilities={doctor_availabilities}
              appointments={appointments}
              setSidebarOpen={setSidebarOpen}
            />
          </div>
          <div className="flex w-full max-w-screen-big">
            <Calendar events={appointments} />
          </div>
          <AppointmentsHistory done_appointments={done_appointments} pagy={pagy} />
        </div>
      </>
    );
  } else {
    return (
      <div className="mt-16 flex items-center justify-center lg:mt-24">
        <div className="m-8 flex flex-col items-center justify-center gap-6 rounded-2xl border border-coolGray-400 p-4 lg:m-0 lg:px-40 lg:py-32">
          <div className="rounded-full border border-coolGray-300 p-4">
            <LockClosedIcon className="h-8 text-coolGray-800" />
          </div>
          <div className="flex flex-col items-center justify-center gap-2">
            <Text className="text-center font-poppins font-semibold text-coolGray-900" size="5xl">
              Agenda bloqueada
            </Text>

            <Text
              className="font-regular text-center font-poppins text-coolGray-600 lg:w-80"
              size="md"
            >
              Para liberar o acesso à agenda é necessário adquirir um plano de assinatura na
              plataforma.
            </Text>
          </div>
          <Link href="/configurations/plan">
            <Button
              label="Ver planos de assinatura"
              className="flex w-fit rounded-2xl border border-primary-400 bg-primary-500 px-6 py-2 font-poppins text-sm font-medium text-white duration-500 hover:bg-primary-100"
            />
          </Link>
        </div>
      </div>
    );
  }
};

export default Appointments;
