import { ArrowLongLeftIcon } from "@heroicons/react/24/outline";
import { Button, SelectBox, Text, TextField } from "@switchdreams/ui";
import axios from "axios";
import React from "react";

import { useAlert } from "@/contexts/Alert";
import { formatCurrency, currencyToCents } from "@/utils";


const ProfessionalInfo = ({
  setSection,
  data,
  setData,
  areaOptions,
  specialtyOptions,
  setSpecialtyOptions,
}) => {
  const { showAlert } = useAlert();

  const getSpecialties = (id) => {
    axios
      .get(`/work_specialties/${id}.json`)
      .then((response) => setSpecialtyOptions(response.data))
      .catch(() =>
        showAlert({
          message: "Não foi possível carregar as áreas de especialidade",
          type: "warning",
        }),
      );
  };

  const nextStep = (e) => {
    e.preventDefault();
    if (
      data.doctor_attributes.council === "" ||
      data.doctor_attributes.work_area_id === "" ||
      data.doctor_attributes.work_specialty_id === null ||
      data.doctor_attributes.price_cents <= 0
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
          Insira seus dados profissionais.
        </Text>
      </div>
      <form onSubmit={(e) => nextStep(e)} className="flex w-[28rem] flex-col gap-4 max-sm:w-full">
        <SelectBox
          name="work_area_id"
          label="Conselho de classe"
          className="rounded-xl"
          placeholder="Selecione seu Conselho de Classe"
          options={areaOptions}
          value={data.doctor_attributes?.work_area_id}
          onChange={(e) => {
            setData((data) => ({
              ...data,
              doctor_attributes: {
                ...data.doctor_attributes,
                work_area_id: e,
                work_specialty_id: null,
              },
            }));
            getSpecialties(e);
          }}
        />
        <SelectBox
          name="work_specialty_id"
          label="Especialidade"
          className="rounded-xl"
          placeholder="Selecione sua especialidade"
          options={specialtyOptions}
          value={data.doctor_attributes?.work_specialty_id}
          onChange={(e) =>
            setData((data) => ({
              ...data,
              doctor_attributes: {
                ...data.doctor_attributes,
                work_specialty_id: e,
              },
            }))
          }
          disabled={specialtyOptions.length < 1}
        />
        <TextField
          name="council"
          label="Número do Conselho de classe"
          className="rounded-xl"
          placeholder="Digite o número do seu conselho de classe"
          value={data.doctor_attributes?.council}
          type="text"
          onChange={(e) =>
            setData((data) => ({
              ...data,
              doctor_attributes: {
                ...data.doctor_attributes,
                council: e.target.value,
              },
            }))
          }
        />
         {/* Trecho de mudanca onde agora sera input */}
            {/*
        <SelectBox
          options={priceOptions}
          name="price"
          className="rounded-xl"
          placeholder="Selecione o valor da consulta"
          label="Valor da consulta"
          supportText="Sobre o valor selecionado, será cobrada uma taxa de 10% de operação."
          value={data.doctor_attributes?.price_cents}
          onChange={(e) => {
            setData((data) => ({
              ...data,
              doctor_attributes: {
                ...data.doctor_attributes,
                price_cents: e,
              },
            }));
          }}
        />
        */}

         <input
          type="text"
          placeholder="R$ 0,00"
          className="rounded-xl border border-coolGray-300 px-4 py-3 text-lg"
          value={formatCurrency(String(data.doctor_attributes?.price_cents ?? 0))}
          onChange={(e) => {
            const cents = currencyToCents(e.target.value);

            setData((data) => ({
              ...data,
              doctor_attributes: {
                ...data.doctor_attributes,
                price_cents: cents,
              },
            }));
          }}
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

export default ProfessionalInfo;
