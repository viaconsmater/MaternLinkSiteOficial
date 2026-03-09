import {
  BanknotesIcon,
  BookmarkIcon,
  CalendarDaysIcon,
  CheckCircleIcon,
  CheckIcon,
  ChevronRightIcon,
  ClockIcon,
  CreditCardIcon,
  LockClosedIcon,
  MagnifyingGlassIcon,
  MapPinIcon,
  XCircleIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { Link } from "@inertiajs/react";
import { Avatar, Badge, Button, Text } from "@switchdreams/ui";

import { formatIntegerCurrency, imagePath, monthsTranslated } from "@/utils";
import CreditCardModal from "./Modals/creditCardModal";
import { useState } from "react";

const Payment = ({ data }) => { 
  const [openCard, setOpenCard] = useState(false);

  return (
    <>
    <CreditCardModal
        open={openCard}
        setOpen={setOpenCard}
        dataClinic={data}  
        cards={[]}
      />
      <div className="flex w-full max-w-screen-big gap-8 px-5 py-14 max-md:flex-col">
        <div className="h-fit w-1/2 rounded-lg border border-coolGray-300 max-md:w-full">
          <div className="w-full border-b border-coolGray-300 px-6 py-8 ">
            <Text className="font-quicksand text-2xl font-semibold text-coolGray-950">
              Método de pagamento
            </Text>
          </div>
          <div className="flex flex-col gap-4 p-6">
           <Link href={'/exams/budgets/'+data.budget_id+'/items/'+data.id+'/payments/pix'}>
              <div
                className="boder-coolGray-300 flex cursor-pointer items-center justify-between rounded-3xl border p-6"
              
              >
                <div className="flex items-center gap-3">
                  <img src={imagePath("pix.svg")} />
                  <Text className="font-poppins text-xl font-medium text-coolGray-950">Pix</Text>
                </div>
                <ChevronRightIcon className="h-6 text-coolGray-950" />
              </div>
           </Link>
            {/* <div className="boder-coolGray-300 flex items-center justify-between rounded-3xl border p-6">
             <div className="flex items-center gap-3">
               <img src={imagePath("barcode.svg")} />
               <Text className="font-poppins text-xl font-medium text-coolGray-400">Boleto</Text>
             </div>
             <ChevronRightIcon className="h-6 text-coolGray-400" />
            </div> */}
            <div
            onClick={setOpenCard}
              className="boder-coolGray-300 flex cursor-pointer items-center justify-between rounded-3xl border p-6"
              
            >
              <div  className="flex items-center gap-3">
                <CreditCardIcon className="h-11 text-coolGray-950" />
                <Text className="font-poppins text-xl font-medium text-coolGray-950">
                  Cartão de crédito
                </Text>
              </div>
              <ChevronRightIcon className="h-6 text-coolGray-950" />
            </div>
            <div className="flex gap-2">
              <LockClosedIcon className="h-4 text-secondary-600" />
              <Text size="sm" className="font-regular font-poppins text-coolGray-600">
                Sua transação está protegida com criptografia de ponta.
              </Text>
            </div>
          </div>
        </div>
        <div className="flex w-2/5 flex-col gap-6 rounded-lg border border-coolGray-300 px-6 py-8 max-md:w-full">
          <div className="flex items-center gap-4">
            <Avatar size="xl" name="Jóse Montenegro" scr={data.clinic.image} />
            <div className="flex flex-col gap-4">
              <div className="flex gap-1">
                <Text
                  className="font-quickSand font-bold text-coolGray-950 max-md:text-lg"
                  size="2xl"
                >
                  {data.clinic.name}
                </Text>
                {/* {doctor.verified && <img src={imagePath("valid.svg")} alt="icone de verificado" />} */}
              </div>
              <Text className="text-regular font-poppins text-coolGray-600" size="sm">
                {data.description}
              </Text>
            </div>
          </div>
          <div className="flex items-center gap-4 rounded-lg border border-coolGray-300 p-4">
            <MapPinIcon className="h-6 text-coolGray-950" />
            <div>
              <Text className="font-quicksand font-semibold text-coolGray-950" size="lg">
                {data.clinic.name}
              </Text>
              <Text className="font-regular font-poppins text-sm text-coolGray-600">
                {data.clinic.address.neighborhood} {data.clinic.address.street},{" "}
                {data.clinic.address.number}, {data.clinic.address.city} - {data.clinic.address.state}{" "}
                - {data.clinic.address.cep}
              </Text>
            </div>
          </div>
          <div className="flex items-center gap-4 rounded-lg border border-coolGray-300 p-4">
            <BanknotesIcon className="h-6 text-coolGray-950" />
            <div>
              <Text className="font-quicksand font-semibold text-coolGray-950" size="lg">
                {data.formatted_amount}
              </Text>
              <Text className="font-regular font-poppins text-sm text-coolGray-600">Valor</Text>
            </div>
          </div>
          <Text className="font-regular px-12 text-center font-poppins text-sm text-coolGray-600">
            A Clínica entrará em contato com você para orientar sobre os procedimentos necessários.
          </Text>
        </div>
      </div>
    </>
  );
};

export default Payment;
