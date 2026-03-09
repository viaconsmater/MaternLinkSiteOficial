import { ArrowDownIcon, ArrowUpIcon, ChevronDownIcon } from "@heroicons/react/24/solid";
import { Badge, Button, Popover, Spinner, Text } from "@switchdreams/ui";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";

import MonthlyIncomeTable from "@/components/Table/monthlyIncomeTable";

import { formatIntegerCurrency, monthsTranslated } from "../../utils";

const monthlyIncome = ({ professional, initial_appointments, pagy, initial_month_info }) => {
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [monthlyData, setMonthlyData] = useState(initial_month_info);
  const [appointments, setAppointments] = useState(initial_appointments);
  const [page, setPage] = useState(2);
  const maxPages = pagy.pages;

  const elementRef = useRef(null);

  function onIntersection(entries) {
    const firstEntry = entries[0];
    if (firstEntry.isIntersecting && page <= maxPages) {
      getAppointments();
    }
  }

  const getAppointments = () => {
    axios.get(`/rendimento.json?page=${page}`).then((response) => {
      setAppointments(appointments.concat(response.data));
      setPage(page + 1);
    });
  };

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

  const monthOptions = () => {
    const startDate = new Date(professional.created_at);
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
    axios.get(`/rendimento.json?date=${selectedDate}`).then((response) => {
      setMonthlyData(response.data);
    });
  }, [selectedDate]);

  return (
    <div className="flex h-fit min-h-screen w-full justify-center bg-coolGray-100 pb-8 pt-12 max-lg:px-5">
      <div className="flex w-full max-w-screen-big justify-center gap-8 max-lg:flex-col">
        <div className="w-[90%] max-lg:w-full">
          <div className="flex w-full justify-between max-md:mb-8 max-md:flex-col">
            <div className="mb-2 md:mb-8">
              <Text className="font-quicksand font-semibold text-coolGray-950" size="2xl">
                Rendimento mensal
              </Text>
              <Text className="pt-2 font-quicksand font-semibold text-coolGray-500" size="xs">
                São exibidas somente as consultas finalizadas
              </Text>
            </div>
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
              {monthOptions().map((month, idx) => {
                return (
                  <div className="w-40" key={idx}>
                    <Button label={month.label} onClick={() => setSelectedDate(month.date)} />
                  </div>
                );
              })}
            </Popover>
          </div>
          <div className="flex justify-between gap-4 max-lg:flex-col">
            <div className="flex w-full flex-col justify-between gap-10 rounded-2xl bg-white py-6 pl-8 max-lg:w-full lg:pr-20">
              <Text className="font-regular font-poppins text-coolGray-600" size="md">
                Valor total recebido
              </Text>
              <div className="flex flex-col gap-4">
                {true && ratioBadge(monthlyData.last_income, monthlyData.monthly_income)}
                <div className="flex items-end gap-2">
                  <Text size="2xl" className="font-quicksand font-bold text-coolGray-950">
                    {formatIntegerCurrency(monthlyData.monthly_income)}
                  </Text>
                </div>
              </div>
            </div>
            <div className="flex w-full flex-col justify-between gap-10 rounded-2xl bg-white py-6 pl-8 max-lg:w-full lg:pr-20">
              <Text className="font-regular font-poppins text-coolGray-600" size="md">
                Valor total a receber
              </Text>
              <div className="flex flex-col gap-4">
                {true &&
                  ratioBadge(monthlyData.last_pending_income, monthlyData.monthly_pending_income)}
                <div className="flex items-end gap-2">
                  <Text size="2xl" className="font-quicksand font-bold text-coolGray-950">
                    {formatIntegerCurrency(monthlyData.monthly_pending_income)}
                  </Text>
                </div>
              </div>
            </div>
            <div className="flex w-full flex-col justify-between gap-10 rounded-2xl bg-white px-8 py-6 max-lg:w-full">
              <Text className="font-regular font-poppins text-coolGray-600" size="md">
                Consultas realizadas
              </Text>
              <div className="flex flex-col gap-4">
                {selectedDate.getMonth() != new Date(professional.created_at).getMonth() &&
                  ratioBadge(monthlyData.last_appointments, monthlyData.monthly_appointments)}
                <div className="flex items-end gap-2">
                  <Text size="2xl" className="font-quicksand font-bold text-coolGray-950">
                    {monthlyData.monthly_appointments}
                  </Text>
                </div>
              </div>
            </div>
            <div className="flex w-full flex-col justify-between gap-10 rounded-2xl bg-white px-8 py-6 max-lg:w-full">
              <Text className="font-regular font-poppins text-coolGray-600" size="md">
                Novos pacientes
              </Text>
              <div className="flex flex-col gap-4">
                {selectedDate.getMonth() != new Date(professional.created_at).getMonth() &&
                  ratioBadge(monthlyData.last_new_patients, monthlyData.monthly_new_patients)}
                <div className="flex items-end gap-2">
                  <Text size="2xl" className="font-quicksand font-bold text-coolGray-950">
                    {monthlyData.monthly_new_patients}
                  </Text>
                </div>
              </div>
            </div>
          </div>
          <div className="mb-8 mt-14 flex w-full justify-between">
            <Text className="font-quicksand font-semibold text-coolGray-950 " size="2xl">
              Histórico de consultas
            </Text>
          </div>
          <MonthlyIncomeTable info={appointments} />
          {page <= maxPages && (
            <div ref={elementRef} className="flex w-full justify-center">
              <Spinner />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default monthlyIncome;
