import {
  ArrowDownIcon,
  ArrowUpIcon,
  CalendarDaysIcon,
  ChevronDownIcon,
  PlusIcon,
} from "@heroicons/react/24/solid";
import { Link, router } from "@inertiajs/react";
import { Avatar, Badge, Button, Popover, Text } from "@switchdreams/ui";
import axios from "axios";
import React, { useEffect, useState } from "react";

import { formatIntegerCurrency, monthsTranslated } from "../../utils";

const team = ({ clinic }) => {
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [monthlyData, setMonthlyData] = useState({
    monthly_appointments: clinic.monthly_appointment,
    monthly_income: clinic.monthly_income,
    monthly_new_patients: clinic.monthly_new_patients,
    last_appointments: clinic.last_appointment,
    last_income: clinic.last_income,
    last_new_patients: clinic.last_new_patients,
  });

  const getDayLabel = (date) => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    if (
      date.getDate() == today.getDate() &&
      date.getMonth() == today.getMonth() &&
      date.getFullYear() == today.getFullYear()
    ) {
      return "Hoje";
    } else if (
      date.getDate() == tomorrow.getDate() &&
      date.getMonth() == tomorrow.getMonth() &&
      date.getFullYear() == tomorrow.getFullYear()
    ) {
      return "Amanhã";
    } else {
      return `${date.getDate()}/${date.getMonth()}`;
    }
  };
  const monthOptions = () => {
    const startDate = new Date(clinic.created_at);
    const months = [];

    // Loop through months until reaching today's year and month
    while (
      startDate.getFullYear() < today.getFullYear() ||
      (startDate.getFullYear() === today.getFullYear() && startDate.getMonth() <= today.getMonth())
    ) {
      const thisDate = new Date(startDate);
      const year = startDate.getFullYear().toString();
      const month = startDate.getMonth();

      months.push({ label: `${monthsTranslated[month]}, ${year}`, date: thisDate }); // Push month/year string

      // Move to the next month
      startDate.setMonth(startDate.getMonth() + 1);
    }

    return months;
  };

  const ratioBadge = (lastMonthValue, thisMonthValue) => {
    if (lastMonthValue == 0 || thisMonthValue == 0) {
      return "";
    }
    const ratio = thisMonthValue / lastMonthValue;
    if (ratio > 1) {
      return (
        <div className="flex items-center gap-2">
          <Badge
            label={`${Math.trunc((ratio - 1) * 100)}%`}
            leftIcon={ArrowUpIcon}
            color="secondary"
          />
          <Text className="font-regular font-poppins text-coolGray-600" size="sm">
            do mês anterior
          </Text>
        </div>
      );
    } else {
      return (
        <div className="flex items-center gap-2">
          <Badge label={`-${Math.trunc(ratio * 100)}%`} leftIcon={ArrowDownIcon} color="danger" />
          <Text className="font-regular font-poppins text-coolGray-600" size="sm">
            do mês anterior
          </Text>
        </div>
      );
    }
  };

  useEffect(() => {
    axios
      .get(`/clinica.json?date=${selectedDate}`)
      .then((response) => setMonthlyData(response.data));
  }, [selectedDate]);

  return (
    <div className="flex h-fit min-h-screen w-full justify-center bg-coolGray-100 pb-8 pt-12 max-lg:px-5">
      <div className="flex w-full max-w-screen-big justify-center gap-8 max-lg:flex-col">
        <div className="flex h-fit flex-col items-center justify-center gap-6 rounded-2xl bg-white px-6 py-8">
          <Avatar name={clinic.name} avatarUrl={clinic.image} className="size-36 bg-primary-25" />
          <div className="flex flex-col items-center gap-4">
            <Text className="text-center font-quicksand font-bold text-coolGray-950" size="2xl">
              {clinic.name}
            </Text>
            <Text className="font-regular font-poppins text-coolGray-600" size="sm">
              {clinic.description}
            </Text>
          </div>
          <Link href="/profiles">
            <Button
              variant="outlined"
              label="Editar perfil"
              className="w-60 cursor-pointer rounded-2xl border border-primary-100 font-poppins text-sm font-medium text-primary-500 hover:bg-primary-100 max-md:w-full"
            />
          </Link>
        </div>
        <div className="w-[70%] max-lg:w-full">
          <div className="flex w-full justify-between max-md:mb-8 max-md:flex-col">
            <Text
              className="mb-8 font-quicksand font-semibold text-coolGray-950 max-md:mb-2"
              size="2xl"
            >
              Rendimento mensal
            </Text>
            <Popover
              position="bottomRight"
              button={
                <div className="flex items-center justify-center gap-1">
                  <Text className="font-poppins font-medium text-primary-500" size="md">
                    {`${monthsTranslated[selectedDate.getMonth()]}, ${selectedDate.getFullYear()}`}
                  </Text>
                  <ChevronDownIcon className="h-4 text-primary-600" />
                </div>
              }
            >
              <div className="size-fit bg-white">
                {monthOptions().map((month, idx) => {
                  return (
                    <div className="w-40" key={idx}>
                      <Button label={month.label} onClick={() => setSelectedDate(month.date)} />
                    </div>
                  );
                })}
              </div>
            </Popover>
          </div>
          <div className="flex justify-between max-lg:flex-col max-lg:gap-4">
            <div className="flex w-fit flex-col gap-10 rounded-2xl bg-white py-6 pl-8 max-lg:w-full lg:pr-20">
              <Text className="font-regular font-poppins text-coolGray-600" size="md">
                Valor total recebido
              </Text>
              <div className="flex flex-col gap-4">
                <div className="flex items-end gap-2">
                  <Text size="4xl" className="font-quicksand font-bold text-coolGray-950">
                    {formatIntegerCurrency(monthlyData.monthly_income)}
                  </Text>
                </div>
                {selectedDate.getMonth() != new Date(clinic.created_at).getMonth() &&
                  ratioBadge(monthlyData.last_income, monthlyData.monthly_income)}
              </div>
            </div>
            <div className="flex w-fit flex-col gap-10 rounded-2xl bg-white px-8 py-6 max-lg:w-full">
              <Text className="font-regular font-poppins text-coolGray-600" size="md">
                Consultas realizadas
              </Text>
              <div className="flex flex-col gap-4">
                <div className="flex items-end gap-2">
                  <Text size="4xl" className="font-quicksand font-bold text-coolGray-950">
                    {monthlyData.monthly_appointments}
                  </Text>
                </div>
                {selectedDate.getMonth() != new Date(clinic.created_at).getMonth() &&
                  ratioBadge(monthlyData.last_appointments, monthlyData.monthly_appointments)}
              </div>
            </div>
            <div className="flex w-fit flex-col gap-10 rounded-2xl bg-white px-8 py-6 max-lg:w-full">
              <Text className="font-regular font-poppins text-coolGray-600" size="md">
                Novos pacientes
              </Text>
              <div className="flex flex-col gap-4">
                <div className="flex items-end gap-2">
                  <Text size="4xl" className="font-quicksand font-bold text-coolGray-950">
                    {monthlyData.monthly_new_patients}
                  </Text>
                </div>
                {selectedDate.getMonth() != new Date(clinic.created_at).getMonth() &&
                  ratioBadge(monthlyData.last_new_patients, monthlyData.monthly_new_patients)}
              </div>
            </div>
          </div>
          <div className="mb-8 mt-14 flex w-full justify-between">
            <div className="flex items-center gap-2">
              <Text className="font-quicksand font-semibold text-coolGray-950 " size="2xl">
                Equipe
              </Text>
              <Text className="font-regular font-poppins text-coolGray-600 " size="md">
                ({clinic.doctors.length})
              </Text>
            </div>
            <Button
              variant="outlined"
              label="Adicionar membros"
              iconSide="left"
              icon={PlusIcon}
              className="w-60 cursor-pointer rounded-2xl border border-primary-100 font-poppins text-sm font-medium text-primary-500 hover:bg-primary-100"
              onClick={() => router.get("/clinica/new_doctor")}
            />
          </div>
          <div className="w-full overflow-x-auto">
            <div className="w-full flex-none rounded-2xl bg-white max-md:w-max">
              {clinic.doctors.map((doctor, idx) => {
                const date = new Date(doctor.state);

                return (
                  <div className="flex border-b border-coolGray-300" key={idx}>
                    <div className="flex w-[45%] items-center gap-4 border-r border-coolGray-300 p-6 max-md:mb-8">
                      <Avatar size="xl" name={doctor.name} scr="" />
                      <div className="flex flex-col gap-4">
                        <div className="flex items-center gap-1">
                          <Link
                            className="flex-none font-quicksand font-bold text-coolGray-950 max-md:text-lg"
                            size="xl"
                            href={`clinica/informacoes_consultas/${doctor.id}`}
                          >
                            {doctor.name}
                          </Link>
                        </div>
                        <Text
                          className="text-regular flex-none font-poppins text-coolGray-600"
                          size="md"
                        >
                          {doctor.specialty}
                        </Text>
                      </div>
                    </div>
                    <div className="flex w-[55%] items-center justify-center gap-4 p-6">
                      <Text
                        className="font-regular flex-none font-poppins text-coolGray-600"
                        size="md"
                      >
                        Próxima consulta:
                      </Text>
                      {doctor.state === "working" ? (
                        <Button
                          variant="outlined"
                          label="Consulta em andamento"
                          className="w-60 cursor-pointer rounded-2xl border border-primary-100 font-poppins text-sm font-medium text-primary-500 hover:bg-primary-100 max-md:w-full"
                        />
                      ) : doctor.state === null ? (
                        <Button
                          variant="outlined"
                          label="Sem consultas agendadas"
                          className="w-60 cursor-pointer rounded-2xl border border-coolGray-400 font-poppins text-sm font-medium text-coolGray-900 max-md:w-full"
                        />
                      ) : (
                        <Button
                          variant="outlined"
                          label={`${getDayLabel(date)} às ${date.getHours() < 10 ? "0" : ""}${date.getHours()}:${date.getMinutes() < 10 ? "0" : ""}${date.getMinutes()}`}
                          icon={CalendarDaysIcon}
                          iconSide="left"
                          className="w-60 cursor-pointer rounded-2xl border border-coolGray-400 font-poppins text-sm font-medium text-coolGray-900 max-md:w-full"
                        />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default team;
