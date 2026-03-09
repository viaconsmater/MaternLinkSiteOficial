import { useForm } from "@inertiajs/react";
import { Text } from "@switchdreams/ui";
import React from "react";

import Modal from "@/components/Modal";
import { useAlert } from "@/contexts/Alert";
import { imagePath } from "@/utils";

const PixModal = ({ setOpen, open, date, time, doctor }) => {
  const { showAlert } = useAlert();

  const formatDate = (date) => {
    const dateTime = new Date(date);
    dateTime.setHours(Number(time.split(":")[0]));
    dateTime.setMinutes(Number(time.split(":")[1]));
    dateTime.setSeconds(0);
    return dateTime;
  };

  const { post } = useForm({
    doctor_user_id: doctor.id,
    date: formatDate(date),
    clinic_id: doctor.clinic_id,
    price_cents: doctor.value,
    aditional_info: "", // aditionalInfo,
  });

  const createPixTransaction = () => {
    post("/consultas/pix", {
      onError: (errors) => {
        // Handle Inertia error response - errors come as object with error messages
        const errorMessage = errors?.message || errors?.error || Object.values(errors || {}).join(', ') || "Ocorreu um erro ao processar o pagamento";
        showAlert({ message: errorMessage });
      },
    });
  };

  return (
    <Modal
      confirmLabel="Concluir pagamento"
      cancelLabel="cancelar"
      open={open}
      setOpen={setOpen}
      onClickCancel={() => setOpen(false)}
      onClickConfirm={() => {
        createPixTransaction();
        setOpen(false);
      }}
    >
      <div className="flex size-full flex-col items-center justify-center">
        <div className="flex size-20 items-center justify-center rounded-full bg-secondary-25">
          <img src={imagePath("pix.svg")} className="size-11" />
        </div>
        <Text className="my-5 flex max-w-md flex-wrap justify-center gap-2 text-center font-quicksand text-3xl font-bold text-coolGray-900">
          Deseja pagar com Pix?
        </Text>
        <Text className="font-regular text-center font-poppins text-lg text-coolGray-600">
          Você será redirecionado à tela de pagamento.
        </Text>
      </div>
    </Modal>
  );
};

export default PixModal;
