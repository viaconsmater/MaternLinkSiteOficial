import React, { useState } from "react";
import { imagePath } from "@/utils";
import { router } from "@inertiajs/react";

const RatingPage = ({ data }) => {
  const [rating, setRating] = useState(0)
  const [description, setDescription] = useState('')
  const ratingComments = [
    'Péssimo',
    'Ruim',
    'Razoável',
    'Bom',
    'Ótimo!'
  ];

  const sendRating = () => {
    const query = new URLSearchParams(location.search)
    
    const formData = new FormData();
    formData.append('rating', rating);
    formData.append('description', description);
    formData.append('reviewable_id', query.get('reviewable_id'));
    formData.append('reviewable_type', query.get('reviewable_type'));
    router.post('/reviews', formData)
  }

  return (
    <>
      <div className="flex h-fit w-full justify-center bg-coolGray-100 py-8 ">
        <div className="flex max-w-screen-big flex-col gap-4 ">
          <div class="max-w-lg rounded-lg shadow-lg ">
            <div className="inline-flex items-end justify-start">
              <div className="inline-flex flex-col items-start justify-start overflow-hidden rounded-2xl bg-white shadow">
                <div className="flex flex-col items-center justify-center gap-4 self-stretch border-b border-[#51cac1] bg-[#06b3a7] px-20 py-6">
                  <div className="font-['Quicksand'] text-xl font-bold leading-7 text-white">
                    Envie uma Avaliação
                  </div>
                </div>
                <div className="relative inline-block w-full">
                  <div className="flex flex-col items-center justify-center gap-4 self-stretch bg-white px-8 py-6">
                    <div className="text-xl font-['Quicksand'] font-medium text-[#101828] text-center">
                    Como você avalia <br/>
                    o atendimento recebido?
                    </div>
                  </div>
                  <div className="px-10 flex justify-between">
                  {[1, 2, 3, 4, 5].map((star) => {
                    return (  
                      <span
                        className='start'
                        style={{
                          cursor: 'pointer',
                          color: rating >= star ? 'gold' : 'gray',
                          fontSize: `35px`,
                        }}
                        onClick={() => {
                          setRating(star)
                        }}
                      >
                        {' '}
                        ★{' '}
                      </span>
                    )
                  })}
                  </div>
                </div>
                <div className="flex  flex-col items-center justify-center gap-4 self-stretch bg-white ">
                  {ratingComments[rating - 1]}
                </div>
                <div className="flex  flex-col items-center justify-center gap-4 self-stretch bg-white p-5 py-6">
                  <div className="self-stretch font-['Poppins'] text-sm font-medium leading-tight text-[#1d2939]">
                    Adicione um comentário
                  </div>
                  <div className="inline-flex shrink grow basis-0 items-start justify-start gap-2 self-stretch rounded-xl border border-[#d0d5dd] bg-white px-3 py-4">
                    <textarea
                      onChange={(e) => setDescription(e.target.value)}
                      rows="5"
                      placeholder="Dê uma descrição, escreva informações importantes ou compartilhe qualquer coisa que você  achar necessário."
                      className="shrink grow basis-0 self-stretch  font-['Poppins'] text-base font-normal leading-snug text-[#98a1b2]"
                    />
                  </div>
                  <button
                    style={{
                      backgroundColor: "#008D82",
                    }}
                    onClick={sendRating}
                    className={`inline-flex  items-center justify-center gap-2 self-stretch rounded-2xl px-[34px] py-2`}
                  >
                    <div className="font-['Poppins'] text-base font-medium leading-snug text-white">
                      <>Enviar Avaliação</>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RatingPage;
