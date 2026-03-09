import { Link, router } from "@inertiajs/react";
import React, { useRef, useState } from "react";

import Modal from "@/components/Modal";
import { useAlert } from "@/contexts/Alert";
import SimpleClinicCardButton from "../../components/Cards/SimpleClinicCardButton";
import { Avatar } from "@switchdreams/ui";

const Show = ({ data, pagy }) => {

  const sortOptions = [
    { label: "Alfabética", value: "alphabetical" },
    { label: "Número de pacientes atendido", value: "patients_count" },
    { label: "Tempo no site", value: "created_at" },
  ];


  const { showAlert } = useAlert();
  const [open, setOpen] = useState(false);
  const [clinic, setClinic] = useState(null);

  const elementRef = useRef(null);

  const openModal = () => {
    setOpen(true);
  }

  const redirectExams = () => {
    router.visit('/orcamento/1')
  }

  const selectClinic = (item) => {
    if(item.status == 'received'){
      setOpen(true)
      setClinic(item)
    }
  }

  const cancelBudget = () => {
    
  }

  return (
    <> 
      <Modal
        modalOpen={open}
        open={open}
        setOpen={setOpen}
        confirmLabel="Voltar"
        onClickConfirm={() => setOpen(false)}
      >
        {clinic && (
          <div className="mt-8">
            <div className="text-center">
              <div className="border-b border-[#eaecf0] w-full mb-4">
                <div className="flex items-center">
                  <div className="mr-3">
                    <Avatar
                      size="lg"
                      name={clinic.clinic.name}
                      avatarUrl={clinic.clinic.image}
                      className="bg-primary-25"
                    />
                  </div>
                  <div>
                    <div className="text-[#101828] text-xl font-bold font-['Quicksand']">
                      {clinic.clinic.name}
                    </div>
                    <div className="text-[#667085] text-md font-normal font-['Poppins'] leading-snug">
                      {clinic.clinic.description}
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-4xl mt-4">Observações</div>
              <div className="mt-2 text-gray-500">
                {clinic.additional_description || ''}
              </div>
              <div className="mt-10 text-3xl font-thin">
                Valor Total <b>{clinic.formatted_amount || ''}</b>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-10">
                <button
                  onClick={cancelBudget}
                  className="py-4 px-10 w-full inline-flex items-center justify-center gap-2 rounded-2xl border bg-white text-gray-500 font-['Poppins'] text-base font-medium"
                >
                  Cancelar
                </button>
                <Link href={`/exams/budgets/${clinic.budget_id}/items/${clinic.id}/payments/new`}>
                  <button className="py-4 px-10 w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-[#06B3A7] text-white font-['Poppins'] text-base font-medium">
                    Aceitar
                  </button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </Modal>

      <div className="w-full lg:w-9/12 mt-10 mx-auto">
        <div className="w-full rounded-lg shadow-lg">
          <div className="px-6 py-4 border-b border-[#eaecf0]">
            <div className="font-medium text-xl mb-2">Clínicas Selecionadas</div>
            <p className="text-sm text-gray-400">
              Seus Exames serão enviados para essas clínicas e você receberá o retorno dos orçamentos o quanto antes
            </p>
          </div>
          {data.map((item, i) => (
            <SimpleClinicCardButton
              key={i}
              clinic={item}
              status={item.status}
              onClick={() => selectClinic(item)}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Show;
