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
      <div className="w-full lg:w-9/12 mt-10 mb-10 mx-auto">
        <div className="w-full rounded-lg shadow-lg px-4">
          <div className="px-6 py-4 border-b border-[#eaecf0]">
            <div className="font-medium text-2xl mb-2">Meus Exames</div>
            <p className="text-md text-gray-400">
              Lista da lista de orçamentos de exames realizados
            </p>
          </div>
          {data.map((item, i) => (
            <div className="grid grid-cols-1 md:grid-cols-5 gap-1 px-2 py-5">
              <div className="truncate">#{item.id}</div>
              <div className="truncate">Data pedido: <br />{formatDate(item.sent_at)}</div>
              <div className="truncate">Respostas Recebidas: {item.total_received}/{item.total_sent}</div> 
              <div className="col-span-1 md:col-end-7 md:col-span-2">
                <Link href={`/exams/budgets/${item.id}`}>
                  <button 
                    className="py-3 px-4 w-full inline-flex bg-[#06B3A7] items-center justify-center gap-2 self-stretch rounded-2xl">
                    <div className="font-['Poppins'] text-base font-medium leading-snug text-white">
                      Visualizar
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
