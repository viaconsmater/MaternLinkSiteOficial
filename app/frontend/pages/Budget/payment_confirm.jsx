import {
  BanknotesIcon,
  BookmarkIcon,
  CalendarDaysIcon,
  CheckCircleIcon,
  CheckIcon,
  ClockIcon,
  MagnifyingGlassIcon,
  MapPinIcon,
  XCircleIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { Link } from "@inertiajs/react";
import { Avatar, Badge, Button, Text } from "@switchdreams/ui";

import { formatIntegerCurrency, imagePath, monthsTranslated } from "@/utils";

const Payment = ({ data, qr_code, payment }) => {
  console.log(data, qr_code, payment)
  

  const paymentInfo = (status) => {
    if (status === "pending") {
      return (
        <>
          <div className="flex w-2/5 flex-col gap-6 p-8 max-sm:w-full max-sm:items-center max-sm:text-center">
            <div>
              <Text className="text-md font-regular font-poppins text-coolGray-600">
                Valor do Exame
              </Text>
              <Text className="font-quicksand text-3xl font-bold text-coolGray-950">
                {data.formatted_amount}
              </Text>
            </div>
            {qr_code && payment.payment_method == "pix" && (
              <img src={`data:image/jpeg;base64,${qr_code.encodedImage}`} className="max-w-60" />
            )}
          </div>
          <div className="flex w-3/5 flex-col gap-6 border-l border-coolGray-300 p-8 max-sm:w-full max-sm:items-center max-sm:text-center">
            <Badge label="Pagamento Pendente" leftIcon={ClockIcon} color="warning" />
            {payment.payment_method == "pix" ? (
              <>
                <Text className="font-quicksand text-2xl font-semibold text-coolGray-950">
                  Escaneie o QR Code ou copie o código PIX
                </Text>
                <Text className="text-md font-regular font-poppins text-coolGray-600">
                  Você pode utilizar a câmera do seu celular para ler o QR Code ou copiar o código e
                  pagar no aplicativo de seu banco:{" "}
                </Text>
                <Button
                  label="Copiar código PIX"
                  variant="outline"
                  icon={BookmarkIcon}
                  iconSide="left"
                  className="w-fit rounded-2xl px-4 py-6 font-poppins text-sm font-medium text-primary-500"
                  onClick={() => navigator.clipboard.writeText(qr_code.payload)}
                />
              </>
            ) : (
              <>
                <Text className="font-quicksand text-2xl font-semibold text-coolGray-950">
                  O pagamento está sendo processado pelo seu cartão de crédito
                </Text>
                <Text className="text-md font-regular font-poppins text-coolGray-600">
                  Em caso de dúvida, procure nosso suporte.
                </Text>
              </>
            )}
          </div>
        </>
      );
    } else if (status === "paid") {
      return (
        <>
          <div className="flex w-2/5 flex-col gap-6 p-8 max-sm:w-full max-sm:items-center max-sm:text-center">
            <div>
              <Text className="text-md font-regular font-poppins text-coolGray-600">
                Valor do Exame
              </Text>
              <Text className="font-quicksand text-3xl font-bold text-coolGray-950">
                {data.formatted_amount}
              </Text>
            </div>
            <CheckCircleIcon className="text-secondary-300" />
          </div>
          <div className="flex w-3/5 flex-col gap-6 border-l border-coolGray-300 p-8 max-sm:w-full max-sm:items-center max-sm:text-center">
            <Badge label="Pago" leftIcon={CheckIcon} color="success" />
            <Text className="font-quicksand text-2xl font-semibold text-coolGray-950">
              Pagamento Aprovado!
            </Text>
            <Text className="text-md font-regular font-poppins text-coolGray-600">
              Este exame já foi pago, acesse seus exames para ver mais detalhes
            </Text>
            <Link href="/exams/budgets">
              <Button
                label="Meus Exames"
                variant="outline"
                icon={CalendarDaysIcon}
                iconSide="left"
                className="w-fit rounded-2xl px-4 py-6 font-poppins text-sm font-medium text-primary-500"
              />
            </Link>
            <Text>
              Método de pagamento:{" "}
              {payment.payment_method == "pix" ? "PIX" : "Cartão de crédito"}
            </Text>
          </div>
        </>
      );
    } else if (status === "expired") {
      return (
        <>
          <div className="flex w-2/5 flex-col gap-6 p-8 max-sm:w-full max-sm:items-center max-sm:text-center">
            <div>
              <Text className="text-md font-regular font-poppins text-coolGray-600">
                Valor do Exame
              </Text>
              <Text className="font-quicksand text-3xl font-bold text-coolGray-950">
                {data.formatted_amount}
              </Text>
            </div>
            <XCircleIcon className="text-warning-300" />
          </div>
          <div className="flex w-3/5 flex-col gap-6 border-l border-coolGray-300 p-8 max-sm:w-full max-sm:items-center max-sm:text-center">
            <Badge label="Expirado" leftIcon={XMarkIcon} color="warning" />
            <Text className="font-quicksand text-2xl font-semibold text-coolGray-950">
              Pagamento Expirado!
            </Text>
            <Text className="text-md font-regular font-poppins text-coolGray-600">
              Este pagamento expirou, tente agendar a consulta novamente
            </Text>
            <Link href="/profissionais">
            <Button
                label="Meus Exames"
                variant="outline"
                icon={CalendarDaysIcon}
                iconSide="left"
                className="w-fit rounded-2xl px-4 py-6 font-poppins text-sm font-medium text-primary-500"
              />
            </Link>
          </div>
        </>
      );
    }
  };

  return (
    <>
      <div className="flex w-full max-w-screen-big gap-8 px-5 py-14 max-md:flex-col">
        <div className="flex h-fit w-3/5 rounded-lg border border-coolGray-300 max-md:w-full max-sm:flex-col-reverse">
          {paymentInfo(payment.status)}
        </div>
        <div className="flex w-2/5 flex-col gap-6 rounded-lg border border-coolGray-300 px-6 py-8 max-md:w-full">
          <div className="flex items-center gap-4">
            {/* <Avatar size="xl" name="Jóse Montenegro" scr={doctor.image} /> */}
            <div className="flex flex-col gap-4">
              <div className="flex gap-1">
                <Text
                  className="font-quickSand font-bold text-coolGray-950 max-md:text-lg"
                  size="2xl"
                >
                  {data.clinic.name}
                </Text>
                {data.clinic.verified && <img src={imagePath("valid.svg")} alt="icone de verificado" />}
              </div>
              <Text className="text-regular font-poppins text-coolGray-600" size="sm">
                {data.clinic.description}
              </Text>
            </div>
          </div>
          <div className="flex items-center gap-4 rounded-lg border border-coolGray-300 p-4">
            <CalendarDaysIcon className="h-6 text-coolGray-950" />
            <div>
              <Text className="font-quicksand font-semibold text-coolGray-950" size="lg">
              </Text>
              <Text className="font-regular font-poppins text-sm text-coolGray-600">Pagar Até</Text>
            </div>
          </div>
          <div className="flex items-center gap-4 rounded-lg border border-coolGray-300 p-4">
            <MapPinIcon className="h-6 text-coolGray-950" />
            <div>
              <Text className="font-quicksand font-semibold text-coolGray-950" size="lg">
              {data.clinic.address.neighborhood} {data.clinic.address.street},{" "}
                {data.clinic.address.number}, {data.clinic.address.city} - {data.clinic.address.state}{" "}
                - {data.clinic.address.cep}
              </Text>
              <Text className="font-regular font-poppins text-sm text-coolGray-600">
                Endereço
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
