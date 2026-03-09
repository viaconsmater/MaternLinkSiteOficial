import {
  CalendarDaysIcon,
  CheckCircleIcon,
  ChevronRightIcon,
  ClockIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";
import { Avatar, Badge, Text } from "@switchdreams/ui";
import { createColumnHelper } from "@tanstack/react-table";
import React from "react";

import { formatIntegerCurrency } from "../../utils";
import Table from "./index";

const user = (name, image) => {
  return (
    <div className="flex items-center gap-2">
      <Avatar name={name} size="lg" avatarUrl={image} />
      <Text className="text-md font-poppins font-medium text-coolGray-950">{name}</Text>
    </div>
  );
};

const status = (paymentStatus, transferStatus, updatedAt) => {
  const statusTranslate = () => {
    if (paymentStatus == "pending" && transferStatus == "waiting") {
      return {
        label: "Aguardando pagamento",
        type: "warning",
      };
    } else if (paymentStatus == "paid" && transferStatus == "waiting") {
      const paymentDate = new Date(updatedAt);
      paymentDate.setDate(paymentDate.getDate() + 30);
      const today = new Date();
      const days = Math.trunc((paymentDate - today) / (1000 * 60 * 60 * 24));
      return {
        label: `Pagamento em aproximadamente ${days} dias`,
        type: "warning",
      };
    } else if (paymentStatus == "paid" && transferStatus == "success") {
      return {
        label: "Pago",
        type: "success",
      };
    } else {
      return {
        label: "Erro",
        type: "error",
      };
    }
  };
  return (
    <div className="font-regular flex items-center gap-2 font-poppins text-sm text-coolGray-700">
      <Badge
        className="p-6 lg:p-2"
        leftIcon={statusTranslate()["type"] == "error" ? XCircleIcon : CheckCircleIcon}
        color={statusTranslate()["type"]}
        label={statusTranslate()["label"]}
      />
    </div>
  );
};

const Timer = (time) => {
  return (
    <div className="font-regular flex items-center gap-2 font-poppins text-sm text-coolGray-700">
      <ClockIcon className="h-4" />
      <Text>{time}</Text>
    </div>
  );
};

const DateFormatter = (dateObj) => {
  const date = new Date(dateObj);
  return (
    <div className="font-regular flex items-center gap-2 font-poppins text-sm text-coolGray-700">
      <CalendarDaysIcon className="h-4" />
      <Text>{`${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`}</Text>
    </div>
  );
};

const ValueFormatter = (value) => {
  return (
    <div className="font-regular flex items-center gap-2 font-poppins text-sm text-coolGray-700">
      <Text>{formatIntegerCurrency(value)}</Text>
    </div>
  );
};

const columnHelper = createColumnHelper();

const columns = [
  columnHelper.accessor("pacient", {
    header: () => "Paciente",
    cell: (info) => user(info.row.original.patient_name, info.row.original.patient_image),
  }),
  columnHelper.accessor("data", {
    header: () => "Data de sessão",
    cell: (info) => DateFormatter(info.row.original.date),
  }),
  columnHelper.accessor("hour", {
    header: () => "Horário de sessão",
    cell: (info) => Timer(info.row.original.approximate_start_time),
  }),
  columnHelper.accessor("status", {
    header: () => "Status",
    cell: (info) =>
      status(
        info.row.original.payment_status,
        info.row.original.transfer_status,
        info.row.original.updated_at,
      ),
  }),
  columnHelper.accessor("value", {
    header: () => "Valor",
    cell: (info) => ValueFormatter(info.row.original.transfer_value_cents),
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

const MonthlyIncomeTable = ({ info }) => {
  return (
    <Table
      data={info}
      columns={columns}
      defaultMessage="Sem consultas feitas"
      classNameTable="border border-coolgray-100 shadow-md rounded-lg"
    />
  );
};

export default MonthlyIncomeTable;
