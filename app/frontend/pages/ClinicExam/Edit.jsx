import { router } from "@inertiajs/react";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";

import Modal from "@/components/Modal";
import SimpleClinicCard from "@/components/Cards/SimpleClinicCard";

import { useAlert } from "@/contexts/Alert";
import { imagePath } from "@/utils";

const Edit = ({ data }) => {
  const sortOptions = [
    { label: "Alfabética", value: "alphabetical" },
    { label: "Número de pacientes atendido", value: "patients_count" },
    { label: "Tempo no site", value: "created_at" },
  ];  
  console.log(data);
  const { showAlert } = useAlert();
  const [open, setOpen] = useState(false);
  const [clinics, setClinics] = useState([]);
  const [files, setFiles] = useState([]);
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState(null);
  const elementRef = useRef(null);

  useEffect(() => {

  }, [])
 
  const redirectExams = () => {
    router.visit('/orcamento/1')
  }

  const onFileChange = (event) => {
      setFiles(event.target.files)
  }; 

  const sendData = async () => {
    const formData = new FormData();
    formData.append('additional_description', description);
    formData.append('amount', amount);
    router.patch('/clinics/exams/budgets/'+data.id, formData)
  }

  const responseContent = () => {
    return (<>
      <div className="inline-block w-full relative">
                <div className="flex flex-col items-center justify-center gap-4 self-stretch bg-white px-8 py-6">
                    <div className="inline-flex items-center justify-center px-[48.50px]">
                      <img className="origin-top-left " src={imagePath("download.png")} />
                    </div>
                    <div className="text-md font-['Quicksand'] font-medium text-center text-[#101828]">
                      Faça o download
                      <br />
                      dos arquivos de pedido médico do paciente
                    </div>
                  </div>
                  <div className="text-md font-['Quicksand'] font-medium text-[#101828] px-5">
                  {
                      data.attachments.map((item, i) => (
                        <>
                          <a className="border border-primary-400 py-1 px-4" href={item} download>Clique Aqui para Baixar Pedido Médico {i +1} </a> <br/>
                        </>
                      ))
                    }
                    </div>
              </div>
              <div className="flex  flex-col items-center justify-center gap-4 self-stretch bg-white p-5 py-6"> 
              <div className="self-stretch font-['Poppins'] text-sm font-medium leading-tight text-[#1d2939]">
                  Valor do Orçamento (R$)
                </div>
                <div className="inline-flex shrink grow basis-0 items-start justify-start gap-2 self-stretch rounded-xl border border-[#d0d5dd] bg-white px-3 py-4">
                  <input
                    onChange={(e) => setAmount(e.target.value)}
                    type="number"
                    placeholder="Digite o valor do orçamento"
                    className="shrink grow basis-0 self-stretch  font-['Poppins'] text-base font-normal leading-snug text-[#98a1b2]"
                  />
                </div>
                <div className="self-stretch font-['Poppins'] text-sm font-medium leading-tight text-[#1d2939]">
                  Informações adicionais (opcional)
                </div>
                <div className="inline-flex shrink grow basis-0 items-start justify-start gap-2 self-stretch rounded-xl border border-[#d0d5dd] bg-white px-3 py-4">
                  <textarea
                    onChange={(e) => setDescription(e.target.value)}
                    rows="5"
                    placeholder="Dê uma descrição, escreva informações importantes ou compartilhe qualquer coisa que você  achar necessário."
                    className="shrink grow basis-0 self-stretch  font-['Poppins'] text-base font-normal leading-snug text-[#98a1b2]"
                  />
                </div>
                <button style={{backgroundColor: (!(amount > 0)) ? '#a4a4a4' : '#008d82' }} onClick={sendData} className={`inline-flex  items-center justify-center gap-2 self-stretch rounded-2xl px-[34px] py-2`}>
                  <div className="font-['Poppins'] text-base font-medium leading-snug text-white">
                    {
                      (!(amount > 0)) ? (<>Preencha todas as informações</>) : (<>Enviar Orçamento</>)
                    }
                  </div>
                </button>
              </div>
    </>)
  }

  const formatDate = (date) => {
    const dateTime = new Date(date);
    return dateTime.toLocaleString();
  };

  const waitingStatus = () => {
    return (<>
      <div className="w-full min-h-max	min-h-72">
          <div className="flex flex-col items-center justify-center gap-1 self-stretch bg-white px-8 py-6">
              <div className="inline-flex items-center justify-center mt-5">
                <img className="origin-top-left " src={imagePath("waiting.svg")} />
              </div>
              <div className="text-md font-['Quicksand'] font-bold text-center text-[#101828]">
                  Aguardando Retorno do Orçamento
              </div>
              <div className="text-md font-['Quicksand'] font-medium text-center text-[#101828]">
              O cliente não aceitou o orçamento ainda, mas,<br/>
              ele pode ser aceito a qualquer momento. Aguarde.
              </div>
            </div>
        </div>
    </>)
  }

  const paidStatus = () => {
    return (<>
      <div className="w-full min-h-max	min-h-72">
          <div className="flex flex-col items-center justify-center gap-1 self-stretch bg-white px-8 py-6">
              <div className="inline-flex items-center justify-center mt-5">
                <img className="origin-top-left " src={imagePath("check-circle.svg")} />
              </div>
              <div className="text-md font-['Quicksand'] font-bold text-center text-[#101828]">
                O orçamento foi aceito e pago pelo cliente!
              </div>
              <div className="text-md font-['Quicksand'] font-medium text-center text-[#101828]">
                Entre em contato com o paciente o quanto antes para<br />
                informar sobre os horários de atendimento do seu estabelecimento.
              </div>
              <div className="text-md font-['Quicksand'] font-bold text-center text-[#101828]">
                Valor Pago: {data.formatted_amount}
              </div>
              <div className="text-md mt-3 font-['Quicksand'] text-center text-[#101828]">
                <b>Dados do paciente</b>
              </div>
              <div className="text-md font-['Quicksand'] text-center text-[#101828]">
                <b>Nome do paciente:</b> {data.user_name}
              </div>
              <div className="text-md font-['Quicksand'] text-center text-[#101828]">
                <b>Telefone:</b> {data.user_phone}
              </div>
              <div className="text-md font-['Quicksand'] text-center text-[#101828]">
                <b>E-mail:</b> {data.user_emai}
              </div>
            </div>
        </div>
    </>)
  }

  return (
    <>
    <Modal
        modalOpen={open}
        open={open}
        setOpen={setOpen}
        confirmLabel="Voltar"
        onClickConfirm={() => redirectExams()}
      >
        <div className="mt-8 text-center">
          <div className="flex items-center justify-center">
            <img src={imagePath("check-circle.svg")} className="rounded-lg" alt="Sucesso" />
          </div>
          <div className="text-2xl mt-4">Orçamentos Enviados com Sucesso</div>
          <div className="mt-2 text-gray-500">Aguarde a confirmação das clínicas, você será notificado por e-mail</div>
        </div>
      </Modal>

      <div className="relative flex flex-col lg:flex-row h-fit w-full justify-center mt-10 max-md:px-6">
        <div className="max-w-sm rounded-lg shadow-lg pb-4 mb-5 lg:mb-0">
          <div className="px-6 py-4 border-b border-[#eaecf0]">
            <div className="font-medium text-xl mb-2">Responder Orçamento</div>
            <p className="text-sm text-gray-400">
              Analise o pedido médico e responda o mais rápido o possível.
              O paciente será notificado via E-mail.
            </p>
          </div>
          <SimpleClinicCard name={data.user_name} />
          <div className="mt-3 px-5 text-black text-center text-sm font-bold leading-snug">Informações do Orçamento</div>
          <div className="mt-1 px-5 text-[#667085] text-sm font-normal font-['Poppins'] leading-snug truncate">{'Código: ' + data.id}</div>
          <div className="mt-1 px-5 text-[#667085] text-sm font-normal font-['Poppins'] leading-snug truncate">{'Recebido Em: ' + formatDate(data.sent_at)}</div>
          <div className="mt-1 px-5 text-[#667085] text-sm font-normal font-['Poppins'] leading-snug truncate">{'Descrição: ' + data.description}</div>
        </div>

        <div className="ml-0 lg:ml-5 max-w-lg rounded-lg shadow-lg">
          <div className="inline-flex flex-col items-start justify-start overflow-hidden rounded-2xl bg-white shadow">
            <div className="flex flex-col items-center justify-center gap-4 self-stretch border-b border-[#51cac1] bg-[#06b3a7] px-6 py-4 md:px-20 md:py-6">
              <div className="font-['Quicksand'] text-xl font-bold leading-7 text-white text-center">
                Resposta do Orçamento
              </div>
            </div>
            <div className="w-full p-4">
              {data.status === 'pending' && responseContent()}
              {data.status === 'received' && waitingStatus()}
              {data.status === 'accepted' && paidStatus()}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Edit;
