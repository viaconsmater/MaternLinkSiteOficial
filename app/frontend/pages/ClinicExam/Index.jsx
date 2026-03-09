import { Link, router } from "@inertiajs/react";
import React, { useRef, useState } from "react";

import { useAlert } from "@/contexts/Alert";

const List = ({ data, pagy }) => {
  const sortOptions = [
    { label: "Alfabética", value: "alphabetical" },
    { label: "Número de pacientes atendido", value: "patients_count" },
    { label: "Tempo no site", value: "created_at" },
  ];


  const { showAlert } = useAlert();
  const [open, setOpen] = useState(false);

  const elementRef = useRef(null);
 

  const openModal = () => {
    setOpen(true);
  }

  const redirectExams = () => {
    router.visit('/orcamento/1')
  }

  const selectClinic = (item) => {
    setOpen(true)
  }

  const formatDate = (date) => {
    const dateTime = new Date(date);
    return dateTime.toLocaleString();
  };

  return (
    <> 
      <div className="w-full lg:w-9/12 mt-10 mb-10">
  <div className="w-full rounded-lg shadow-lg px-4">
    <div className="px-6 py-4 border-b border-[#eaecf0]">
      <div className="font-medium text-2xl mb-2">Pedidos Recebidos</div>
      <p className="text-md text-gray-400">
        Lista de pedidos de exames recebidos
      </p>
    </div>
    {data.map((item, i) => (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 px-2 py-5">
        <div>Código: <br />#{item.id}</div>
        <div className="truncate max-w-xs">Paciente: <br /> {item.user_name}</div>
        <div>Data recebimento: <br /> {formatDate(item.sent_at)}</div>
        <div className="col-span-1 sm:col-span-2 lg:col-end-7 lg:col-span-2">
          <Link href={`/clinics/exams/budgets/${item.id}/edit`}>
            <button className="py-3 px-4 w-full inline-flex bg-[#06B3A7] items-center justify-center gap-2 rounded-2xl">
              <div className="font-['Poppins'] text-base font-medium leading-snug text-white">
                {item.status == 'accepted' ? 'Aceito - Visualizar' : 'Responder'}
              </div>
            </button>
          </Link>
        </div>
      </div>
    ))}
  </div>
</div>
    </>
  );
};

export default List;
