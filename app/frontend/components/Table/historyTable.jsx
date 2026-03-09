import { CalendarDaysIcon, CheckCircleIcon, UsersIcon } from "@heroicons/react/24/outline";
import { Text } from "@switchdreams/ui";
import { createColumnHelper } from "@tanstack/react-table";
import React from "react";

import Table from "./index";

const planFormatter = (name) => {
  return <Text className="text-md font-poppins font-medium text-coolGray-950">{name}</Text>;
};

const status = (statusName) => {
  return (
    <div className="font-regular flex items-center gap-2 font-poppins text-sm text-coolGray-700">
      <CheckCircleIcon className="h-4" />
      <Text>{statusName}</Text>
    </div>
  );
};

const ProfessionalNumberFormatter = (number) => {
  return (
    <div className="font-regular flex items-center gap-2 font-poppins text-sm text-coolGray-700">
      <UsersIcon className="h-4" />
      <Text>{number}</Text>
    </div>
  );
};

const DateFormatter = (date) => {
  return (
    <div className="font-regular flex items-center gap-2 font-poppins text-sm text-coolGray-700">
      <CalendarDaysIcon className="h-4" />
      <Text>{date}</Text>
    </div>
  );
};

const valueFormatter = (value) => {
  return <Text className="font-regular font-poppins text-sm text-coolGray-700">{value}</Text>;
};

const columnHelper = createColumnHelper();

const columns = [
  columnHelper.accessor("plan", {
    header: () => "Plano",
    cell: (info) => planFormatter(info.row.original.plan),
  }),
  columnHelper.accessor("profissionalNumber", {
    header: () => "Profissionais",
    cell: (info) => ProfessionalNumberFormatter(info.row.original.profissionalNumber),
  }),
  columnHelper.accessor("paymentDate", {
    header: () => "Data do Pagamento",
    cell: (info) => DateFormatter(info.row.original.paymentDate),
  }),
  columnHelper.accessor("planLimit", {
    header: () => "Vencimento do plano",
    cell: (info) => DateFormatter(info.row.original.planLimit),
  }),
  columnHelper.accessor("value", {
    header: () => "Valor",
    cell: (info) => valueFormatter(info.row.original.value),
  }),
  columnHelper.accessor("Status", {
    header: () => "Status",
    cell: (info) => status(info.row.original.status),
  }),
];

const HistoryTable = ({ info }) => {
  return (
    <Table
      data={info}
      columns={columns}
      defaultMessage="Sem pagamentos realizados"
      classNameTable="border border-coolgray-100 shadow-md rounded-lg"
    />
  );
};

export default HistoryTable;
