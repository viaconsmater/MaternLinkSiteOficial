import React, { useEffect, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import _ from 'lodash';
import { Avatar } from "@switchdreams/ui";
import { Link } from "@inertiajs/react";

const SimpleClinicCard = ({status,clinic, onClick}) => {
  console.log(clinic)
 const statusList = [
  {status: 'pending', name: 'Aguardando Retorno', color: '#F79009'},
  {status: 'received', name: 'Ver Orçamento Recebido', color: '#38C2B9'},
  {status: 'cancelled', name: 'Cancelado pela Clínica', color: '#850000'},
  {status: 'accepted', name: 'Aceito - Pagamento Realizado', color: '#007AFF'},
 ];
 const [statusOptions, setStatusOptions] = useState(statusList);
 const [actualStatus, setActualStatus] = useState({});

 useEffect(() => {
  let findStatus = _.find(statusOptions, {status: status});
  setActualStatus(findStatus)
 }, [])

  return (
    <ErrorBoundary fallback={<div>Aconteceu algum problema para exibir a clínica...</div>}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="w-full p-3 border-b border-[#eaecf0]">
          <div className="py-5 flex items-center gap-2">
            <Avatar
              size="lg"
              name={clinic.clinic.name}
              avatarUrl={clinic.clinic.image}
              className="bg-primary-25"
            />
            <div className="flex flex-col justify-center">
              <div className="text-[#101828] text-md font-bold font-['Quicksand']">
                {clinic.clinic.name}
              </div>
              <div className="text-[#667085] text-sm font-normal font-['Poppins'] leading-snug">
                {clinic.clinic.description}
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center items-start p-3">
          <button
            onClick={onClick}
            style={{ backgroundColor: actualStatus.color }}
            className={`py-3 px-6 min-w-[150px] max-w-[250px] inline-flex items-center justify-center gap-2 rounded-2xl`}>
            <div className="font-['Poppins'] text-base font-medium leading-snug text-white">
              {actualStatus.name}
            </div>
          </button>
        </div>
      </div>

      {status === 'accepted' && (
        <div className="grid items-center justify-center mt-4">
          <div className="max-w-2xl px-5 py-2">
            <p className="text-center">
              A Clínica entrará em contato via e-mail ou Whatsapp o quanto antes para a finalização do processo do seu Exame.
              Fique atento às notificações que serão recebidas ou entre em contato: <br />
              <b>Telefone:</b> {clinic.clinic.phone} <br />
              <b>Email:</b> {clinic.clinic.email} <br /><br />
              <Link href={`/reviews/new?reviewable_id=${clinic.clinic.id}&reviewable_type=Clinic`}>
                <b>Sua avaliação é muito importante! <br /> Clique aqui e deixe uma avaliação para a clínica</b>
              </Link>
            </p>
          </div>
        </div>
      )}
    </ErrorBoundary>
  );
};

export default SimpleClinicCard;
