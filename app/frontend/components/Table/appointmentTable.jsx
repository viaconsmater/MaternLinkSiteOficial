import {
  CalendarDaysIcon,
  CheckCircleIcon,
  ChevronRightIcon,
  ClockIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";
import { Avatar, Text } from "@switchdreams/ui";
import { createColumnHelper } from "@tanstack/react-table";
import React from "react";

import Table from "./index";

const user = (name) => {
  return (
    <div className="flex items-center gap-2">
      <Avatar name={name} size="lg" />
      <Text className="text-md font-poppins font-medium text-coolGray-950">{name}</Text>
    </div>
  );
};

const status = (statusName) => {
  return (
    <div className="font-regular flex items-center gap-2 font-poppins text-sm text-coolGray-700">
      {statusName == "completed" ? (
        <>
          <CheckCircleIcon className="h-4" />
          <Text>Finalizado</Text>
        </>
      ) : (
        <>
          <XCircleIcon className="h-4" />
          <Text>Cancelado</Text>
        </>
      )}
    </div>
  );
};

const Timer = (time) => {
  const date = new Date(time);
  return (
    <div className="font-regular flex items-center gap-2 font-poppins text-sm text-coolGray-700">
      <ClockIcon className="h-4" />
      <Text>{`${date.getHours() < 10 ? "0" : ""}${date.getHours()}:${date.getMinutes() < 10 ? "0" : ""}${date.getMinutes()}`}</Text>
    </div>
  );
};

const DateFormatter = (day) => {
  const date = new Date(day);
  return (
    <div className="font-regular flex items-center gap-2 font-poppins text-sm text-coolGray-700">
      <CalendarDaysIcon className="h-4" />
      <Text>{`${date.getDate()}/${date.getMonth() < 10 ? "0" : ""}${date.getMonth()}/${date.getFullYear()}`}</Text>
    </div>
  );
};

const columnHelper = createColumnHelper();

const columns = [
  columnHelper.accessor("patient", {
    header: () => "Paciente",
    cell: (info) => user(info.row.original.patient_name),
  }),
  columnHelper.accessor("data", {
    header: () => "Data de sessão",
    cell: (info) => DateFormatter(info.row.original.date),
  }),
  columnHelper.accessor("hour", {
    header: () => "Horário de sessão",
    cell: (info) => Timer(info.row.original.date),
  }),
  columnHelper.accessor("status", {
    header: () => "Status",
    cell: (info) => status(info.row.original.status),
  }),
  columnHelper.accessor("options", {
    header: "",
    cell: () => <CustomCell />,
  }),
];

const CustomCell = () => {
  return (
    <div className="flex justify-center gap-2">
      <ChevronRightIcon className="h-5" />
    </div>
  );
};

const AppointmentTable = ({ info }) => {
  return (
    <>
      {info.length > 0 ? (
        <Table
          data={info}
          columns={columns}
          defaultMessage="Sem consultas feitas"
          classNameTable="border border-coolgray-100 shadow-md rounded-lg"
        />
      ) : (
        <div className="flex w-full flex-col items-center justify-center">
          <Text className="text-4xl font-semibold text-coolGray-500">Histórico vazio</Text>
          <Text className="text-2xl font-semibold text-coolGray-500">
            Seu histórico de consultas está vazio por enquanto.
          </Text>
        </div>
      )}
    </>
  );
};

export default AppointmentTable;
