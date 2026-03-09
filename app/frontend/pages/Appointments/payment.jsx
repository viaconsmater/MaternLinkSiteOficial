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

import { extractTime, formatIntegerCurrency, imagePath, monthsTranslated } from "@/utils";

const Payment = ({ appointment, qr_code, doctor }) => {
  const dateFormated = () => {
    const dateObj = new Date(appointment.date);
    return `${dateObj.getDate()} de ${monthsTranslated[dateObj.getMonth()]} de ${dateObj.getFullYear()}`;
  };

  const paymentInfo = (payment_status) => {
    if (payment_status === "pending") {
      return (
        <>
          <div className="flex w-2/5 flex-col gap-6 p-8 max-sm:w-full max-sm:items-center max-sm:text-center">
            <div>

              {/* mudar para campo de input */}

              <Text className="text-md font-regular font-poppins text-coolGray-600">
                Valor da consulta
              </Text>

              <Text className="font-quicksand text-3xl font-bold text-coolGray-950">
                {formatIntegerCurrency(appointment.price_cents)}
              </Text>


              {/* --------------------------------*/}


            </div>
            {qr_code && appointment.payment_method == "pix" && (
              <img src={`data:image/jpeg;base64,${qr_code.encodedImage}`} className="max-w-60" />
            )}
          </div>
          <div className="flex w-3/5 flex-col gap-6 border-l border-coolGray-300 p-8 max-sm:w-full max-sm:items-center max-sm:text-center">
            <Badge label="Pagamento Pendente" leftIcon={ClockIcon} color="warning" />
            {appointment.payment_method == "pix" ? (
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
    } else if (payment_status === "paid") {
      return (
        <>
          <div className="flex w-2/5 flex-col gap-6 p-8 max-sm:w-full max-sm:items-center max-sm:text-center">
            <div>
              <Text className="text-md font-regular font-poppins text-coolGray-600">
                Valor da consulta
              </Text>

              <Text className="font-quicksand text-3xl font-bold text-coolGray-950">
                {formatIntegerCurrency(appointment.price_cents)}
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
              Esta consulta já foi paga, acesse suas consultas para ver mais detalhes
            </Text>
            <Link href="/minhas_consultas">
              <Button
                label="Minhas Consultas"
                variant="outline"
                icon={CalendarDaysIcon}
                iconSide="left"
                className="w-fit rounded-2xl px-4 py-6 font-poppins text-sm font-medium text-primary-500"
              />
            </Link>
            <Text>
              Método de pagamento:{" "}
              {appointment.payment_method == "pix" ? "PIX" : "Cartão de crédito"}
            </Text>
          </div>
        </>
      );
    } else if (payment_status === "payment_cancelled") {
      return (
        <>
          <div className="flex w-2/5 flex-col gap-6 p-8 max-sm:w-full max-sm:items-center max-sm:text-center">
            <div>
              <Text className="text-md font-regular font-poppins text-coolGray-600">
                Valor da consulta
              </Text>

              <Text className="font-quicksand text-3xl font-bold text-coolGray-950">
                {formatIntegerCurrency(appointment.price_cents)}
              </Text>
              <Text className="text-md font-regular font-poppins text-coolGray-600">
                Valor da consulta
              </Text>
              <Text className="font-quicksand text-3xl font-bold text-coolGray-950">
                {formatIntegerCurrency(appointment.price_cents)}
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
                label="Buscar Profissionais"
                variant="outline"
                icon={MagnifyingGlassIcon}
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
          {paymentInfo(appointment.payment_status)}
        </div>
        <div className="flex w-2/5 flex-col gap-6 rounded-lg border border-coolGray-300 px-6 py-8 max-md:w-full">
          <div className="flex items-center gap-4">
            <Avatar size="xl" name="Jóse Montenegro" scr={doctor.image} />
            <div className="flex flex-col gap-4">
              <div className="flex gap-1">
                <Text
                  className="font-quickSand font-bold text-coolGray-950 max-md:text-lg"
                  size="2xl"
                >
                  {doctor.name}
                </Text>
                {doctor.verified && <img src={imagePath("valid.svg")} alt="icone de verificado" />}
              </div>
              <Text className="text-regular font-poppins text-coolGray-600" size="sm">
                {doctor.specialty}
              </Text>
            </div>
          </div>
          <div className="flex items-center gap-4 rounded-lg border border-coolGray-300 p-4">
            <CalendarDaysIcon className="h-6 text-coolGray-950" />
            <div>
              <Text className="font-quicksand font-semibold text-coolGray-950" size="lg">
                {dateFormated()}
              </Text>
              <Text className="font-regular font-poppins text-sm text-coolGray-600">Data</Text>
            </div>
          </div>
          <div className="flex items-center gap-4 rounded-lg border border-coolGray-300 p-4">
            <ClockIcon className="h-6 text-coolGray-950" />
            <div>
              <Text className="font-quicksand font-semibold text-coolGray-950" size="lg">
                {extractTime(new Date(appointment.date))}
              </Text>
              <Text className="font-regular font-poppins text-sm text-coolGray-600">Horário</Text>
            </div>
          </div>
          <div className="flex items-center gap-4 rounded-lg border border-coolGray-300 p-4">
            <MapPinIcon className="h-6 text-coolGray-950" />
            <div>
              <Text className="font-quicksand font-semibold text-coolGray-950" size="lg">
                {doctor.clinic_name}
              </Text>
              <Text className="font-regular font-poppins text-sm text-coolGray-600">
                {doctor.clinic_address}
              </Text>
            </div>
          </div>
          <div className="flex items-center gap-4 rounded-lg border border-coolGray-300 p-4">
            <BanknotesIcon className="h-6 text-coolGray-950" />
            <div>
              <Text className="font-quicksand font-semibold text-coolGray-950" size="lg">
                {formatIntegerCurrency(appointment.price_cents)}
              </Text>
              <Text className="font-regular font-poppins text-sm text-coolGray-600">Valor</Text>
            </div>
          </div>
          <Text className="font-regular px-12 text-center font-poppins text-sm text-coolGray-600">
            Você tem o prazo de 48 horas antes da sua consulta para realizar o reagendamento.
          </Text>
        </div>
      </div>
    </>
  );
};

export default Payment;
