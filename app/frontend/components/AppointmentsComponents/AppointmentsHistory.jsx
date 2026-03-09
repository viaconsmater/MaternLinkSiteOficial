import { Spinner, Text } from "@switchdreams/ui";
import axios from "axios";
import React, { useState } from "react";

import AppointmentTable from "@/components/Table/appointmentTable";
import { useAlert } from "@/contexts/Alert";

import Pagination from "../Pagination";

const AppointmentsHistory = ({ done_appointments, pagy }) => {
  const [tableInfo, setTableInfo] = useState(done_appointments);
  const [loading, setLoading] = useState(false);
  const { showAlert } = useAlert();
  const [page, setPage] = useState(1);
  const maxPages = pagy.pages;

  const getHistoryPage = (current_page) => {
    setLoading(true);
    axios
      .get(`/informacoes_consultas.json?page=${current_page}`)
      .then((response) => {
        setTableInfo(response.data.done_appointments);
      })
      .catch((e) => showAlert({ message: e.message }))
      .finally(() => setLoading(false));
  };

  return (
    <div className="mt-6 flex w-full max-w-screen-big flex-col max-md:px-6">
      <Text className="mb-8 font-quicksand font-semibold text-coolGray-950 " size="2xl">
        Histórico de consultas
      </Text>
      {loading ? (
        <div className="flex justify-center">
          <Spinner />
        </div>
      ) : (
        <AppointmentTable info={tableInfo} />
      )}
      {tableInfo.length > 0 && (
        <Pagination page={page} setPage={setPage} maxPages={maxPages} getData={getHistoryPage} />
      )}
    </div>
  );
};

export default AppointmentsHistory;
