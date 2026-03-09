import { router, usePage } from "@inertiajs/react";
import React, { useEffect, useRef, useState } from "react";

import Modal from "@/components/Modal";
import { useAlert } from "@/contexts/Alert";
import { imagePath } from "@/utils";
import SimpleClinicCard from "../../components/Cards/SimpleClinicCard";

const ExamDetails = () => {
  const sortOptions = [
    { label: "Alfabética", value: "alphabetical" },
    { label: "Número de pacientes atendido", value: "patients_count" },
    { label: "Tempo no site", value: "created_at" },
  ];


  const { showAlert } = useAlert();
  const [open, setOpen] = useState(false);
  const [clinics, setClinics] = useState([]);
  const [files, setFiles] = useState([]);
  const [description, setDescription] = useState('');
  const { data } = usePage().props;
  const elementRef = useRef(null);


  useEffect(() => {
    let data = localStorage.getItem("clinics");
    data = JSON.parse(data);

    setClinics(data);
  }, [])

  useEffect(() => {
    if(data !== undefined){
      setOpen(true)
    }
  }, [data])

  const redirectExams = () => {
    router.visit(`/exams/budgets/${data.id}`)
  }

  const onFileChange = (event) => {
      setFiles(event.target.files)
  };

  const sendData = async () => {
    if(Object.keys(files).length == 0){
      showAlert({ message: 'Você deve enviar pelo menos 1 exame' });
      return;
    }
    const formData = new FormData();
    formData.append('description', description);
    clinics.map((item) => {
      formData.append('clinic_ids[]', item.id);
    })

    Object.keys(files).map((item) => {
      formData.append('attachments[]', files[item]);
    })

    router.post('/exams/budgets', formData)
  }


  return (
    <>
     <Modal
      modalOpen={open}
      open={open}
      setOpen={setOpen}
      confirmLabel="Voltar"
      onClickConfirm={() => {redirectExams()}}
    >
      <div className="mt-8">
        <div class="text-center">
          <div class="col-span-12 flex items-center justify-center">
            <img src={imagePath("check-circle.svg")} className="rounded-lg" />
          </div>
          <div class="col-span-12 text-2xl">Orçamentos Enviados com Sucesso</div>
          <div class="col-span-12 mt-2 text-gray-500	">Aguarde a confirmação das clínicas, você será notificado por e-mail</div>
        </div>
      </div>
    </Modal>
      <div className="relative flex h-fit w-full justify-center  max-md:px-6 mt-10">
        <div class="max-w-sm rounded-lg	shadow-lg">
          <div class="px-6 py-4 border-b border-[#eaecf0]">
            <div class="font-medium text-xl mb-2">Clínicas Selecionadas</div>
            <p class="text-sm text-gray-400">
              Seus Exames serão enviados para essas clínicas e você receberá o retorno dos
              orçamentos o quanto antes
            </p>
          </div>
          {
            clinics.map((item) => (
              <>
                <SimpleClinicCard name={item.clinic_name ?? item.name} specialty={item.specialty} image={item.image}/>
              </>
            ))
          }
        </div>

        <div class="ml-5 max-w-lg rounded-lg shadow-lg ">
          <div className="inline-flex items-end justify-start">
            <div className="inline-flex flex-col items-start justify-start overflow-hidden rounded-2xl bg-white shadow">
              <div className="flex flex-col items-center justify-center gap-4 self-stretch border-b border-[#51cac1] bg-[#06b3a7] px-20 py-6">
                <div className="font-['Quicksand'] text-xl font-bold leading-7 text-white">
                  Solicite um Orçamento
                </div>
              </div>
              <div className="inline-block w-full relative">
                <div className="flex flex-col items-center justify-center gap-4 self-stretch bg-white px-8 py-6">
                    <div className="inline-flex items-center justify-center px-[48.50px]">
                      <img className="origin-top-left " src={imagePath("upload.png")} />
                    </div>
                    <div className="text-md font-['Quicksand'] font-medium text-[#101828]">
                      Clique aqui para fazer o envio do
                      <br />
                      seu pedido médico. (.jpg, .pdf, .png)
                    </div>
                  </div>
                  <input onChange={onFileChange} type="file" className="absolute w-full h-full top-0 opacity-0" multiple/>
                  <div className="text-md font-['Quicksand'] font-medium text-[#101828] px-5">
                  {
                      Object.keys(files).map((item) => (
                        <>
                          {files[item].name} <br/>
                        </>
                      ))
                    }
                    </div>
              </div>
              <div className="flex  flex-col items-center justify-center gap-4 self-stretch bg-white p-5 py-6">
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
                <button style={{backgroundColor: Object.keys(files).length == 0 ? '#a4a4a4' : '#008d82' }} onClick={sendData} className={`inline-flex  items-center justify-center gap-2 self-stretch rounded-2xl px-[34px] py-2`}>
                  <div className="font-['Poppins'] text-base font-medium leading-snug text-white">
                    {
                      Object.keys(files).length == 0 ? (<>Envie pelo menos um exame</>) : (<>Enviar Exames</>)
                    }
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </>
  );
};

export default ExamDetails;
