import { Link } from "@inertiajs/react";
import React from "react";

const SelectedClinicsCard = ({ quantity }) => {
  return (
    <>
      <div
        className="flex flex-col items-center justify-between gap-5 rounded-2xl bg-white px-4 py-5 shadow-sm max-md:w-full sticky bottom-0"
      >
         <h1 className="font-regular text-2xl">{quantity == 0 ? 'Nenhuma' : quantity} Clínica{quantity == 0 ? '' : 's'} Selecionada{quantity == 0 ? '' : 's'} para o orçamento</h1>
         <p className="text-gray-400	">
          Escolha até 3 clínicas que você deseja enviar seus exames
          para receber um orçamento  
         </p>
         <div class="w-full">
            <Link
              href={'/exams/budgets/new'}
            >
            <a  className={"cursor-pointer Button w-full py-3  rounded-2xl justify-center items-center gap-2 inline-flex "+(quantity > 0 ? 'bg-[#008d82]' : 'bg-zinc-400')}>
              <button class="Text text-white text-base font-medium  leading-snug">
                <b>Avançar para enviar meus exames</b>
              </button>
            </a>  
          </Link>
          </div>
      </div>
    </>
  );
};

export default SelectedClinicsCard;
