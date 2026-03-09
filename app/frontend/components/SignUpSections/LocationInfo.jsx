import { ArrowLongLeftIcon } from "@heroicons/react/24/outline";
import { Button, SelectBox, Text, TextArea, TextField, TextFieldMask } from "@switchdreams/ui";
import React from "react";

import { useAlert } from "@/contexts/Alert";
import { pixTypeMask, pixTypeOptions, yesOrNotOptions } from "@/utils";

const LocationInfo = ({ setSection, data, setData }) => {
  const { showAlert } = useAlert();

  const nextStep = (e) => {
    e.preventDefault();
    if (
      data.clinics_attributes?.name === "" ||
      data.clinics_attributes?.cnpj === "" ||
      data.clinics_attributes?.description === "" ||
      data.clinics_attributes?.pix_key === "" ||
      data.clinics_attributes?.pix_type === ""
    ) {
      showAlert({ message: "Preencha todos os campos!", type: "warning" });
    } else {
      setSection(({ step, role }) => ({ step: step + 1, role }));
    }
  };

  return (
    <>
      <Button
        label="voltar"
        iconSide="left"
        icon={ArrowLongLeftIcon}
        className="text-primary-500"
        onClick={() => {
          setSection(({ step, role }) => ({ step: step - 1, role }));
        }}
      />
      <div className="mb-8 w-full text-center">
        <Text className="font-quickSand text-3xl font-bold text-coolGray-900">
          Continue seu cadastro
        </Text>
        <Text className="font-regular text-sm text-coolGray-600">
          {data.doctorType === "autonomy"
            ? "Insira informações sobre o seu consultório."
            : "Insira informações sobre o sua clínica"}
        </Text>
      </div>
      <form onSubmit={(e) => nextStep(e)} className="flex w-[28rem] flex-col gap-4 max-sm:w-full">
        <TextField
          name="clinicName"
          label={data.doctorType === "autonomy" ? "Nome do consultório" : "Nome da clínica"}
          className="rounded-xl"
          placeholder={
            data.doctorType === "autonomy"
              ? "Digite o nome do seu consultório"
              : "Digite o nome da sua clínica"
          }
          value={data.clinics_attributes?.name || ""}
          onChange={(e) =>
            setData({
              ...data,
              clinics_attributes: { ...data.clinics_attributes, name: e.target.value },
            })
          }
          type="text"
        />
        <TextFieldMask
          name="clinicCnpj"
          mask={"99.999.999/9999-99"}
          label="CNPJ"
          className="rounded-xl"
          placeholder={
            data.doctorType === "autonomy"
              ? "Digite o CNPJ do seu consultório"
              : "Digite o CNPJ da sua clínica"
          }
          value={data.clinics_attributes?.cnpj || ""}
          onChange={(e) =>
            setData({
              ...data,
              clinics_attributes: { ...data.clinics_attributes, cnpj: e.target.value },
            })
          }
          type="text"
        />
        <SelectBox
          options={yesOrNotOptions}
          value={data.clinics_attributes?.exam_enabled?.toString() || ""}
          name="enable_budgets"
          className="rounded-xl"
          placeholder="Selecione uma opção"
          label="Deseja receber pedidos de Exames Diagnósticos?"
          onChange={(e) =>
            setData((data) => ({
              ...data,
              clinics_attributes: {
                ...data.clinics_attributes,
                exam_enabled: e || "",
              },
            }))
          }
        />
        <SelectBox
          options={pixTypeOptions}
          label="Tipo da Chave Pix"
          className="rounded-xl"
          placeholder="O tipo da chave pix que deseja receber os pagamentos"
          value={data.clinics_attributes?.pix_type || ""}
          onChange={(e) => {
            setData((data) => ({
              ...data,
              clinics_attributes: {
                ...data.clinics_attributes,
                pix_type: e || "",
              },
            }));
          }}
        />
        <TextFieldMask
          name="clinicPixKey"
          label="Chave pix"
          mask={pixTypeMask(data.clinics_attributes?.pix_type || "")}
          className="rounded-xl"
          placeholder="Insira a chave pix que deseja receber os pagamentos"
          value={data.clinics_attributes?.pix_key || ""}
          disabled={!data.clinics_attributes?.pix_type || data.clinics_attributes?.pix_type === ""}
          onChange={(e) =>
            setData({
              ...data,
              clinics_attributes: { ...data.clinics_attributes, pix_key: e.target.value },
            })
          }
          type="text"
        />
        <TextArea
          name="clinicDescription"
          label={
            data.doctorType === "autonomy" ? "Descrição do consultório" : "Descrição da clínica"
          }
          className="h-36 rounded-xl p-3"
          placeholder={
            data.doctorType === "autonomy"
              ? "Digite uma descrição legal para atrair mais pacientes ao seu consultório"
              : "Digite uma descrição legal para atrair mais pacientes à sua clínica"
          }
          value={data.clinics_attributes?.description || ""}
          onChange={(e) =>
            setData({
              ...data,
              clinics_attributes: { ...data.clinics_attributes, description: e.target.value },
            })
          }
        />
        <Button
          label="Continuar"
          className="mb-10 flex rounded-2xl bg-primary-500 px-6 py-2 text-sm font-medium text-white duration-500 hover:bg-primary-600"
          type="submit"
        />
      </form>
    </>
  );
};

export default LocationInfo;