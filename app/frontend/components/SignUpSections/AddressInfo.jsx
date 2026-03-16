import { ArrowLongLeftIcon } from "@heroicons/react/24/outline";
import { Button, SelectBox, Spinner, Text, TextField, TextFieldMask } from "@switchdreams/ui";
import axios from "axios";
import React, { useState } from "react";

import { stateOptions } from "@/constants/SelectOptions";
import { useAlert } from "@/contexts/Alert";
import { fetchCep } from "@/utils";

const AddressInfo = ({ setSection, data, setData, submitSignUpData, processing }) => {
  const { showAlert } = useAlert();

  const [cepError, setCepError] = useState(false);
  const [loading, setLoading] = useState(false);

  const nextStep = (e) => {
    e.preventDefault();
    if (
      !data.address_attributes?.cep ||
      !data.address_attributes?.state ||
      !data.address_attributes?.city ||
      !data.address_attributes?.street ||
      !data.address_attributes?.latitude ||
      !data.address_attributes?.longitude ||
      !data.address_attributes?.neighborhood
    ) {
      showAlert({ message: "Preencha todos os campos!", type: "warning" });
    } else {
      submitSignUpData();
    }
  };

  const getCoordinates = async () => {
    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${data.address_attributes.cep}&key=${apiKey}`;
  
    setLoading(true);
  
    try {
      const response = await axios.get(url);
      const responseData = response.data;
  
      if (responseData.results && responseData.results.length > 0) {
        const location = responseData.results[0].geometry.location;
        console.log(location.lat, location.lng);
  
        setData((data) => ({
          ...data,
          address_attributes: {
            ...data.address_attributes,
            latitude: location.lat.toString(),
            longitude: location.lng.toString(),
          },
        }));
        console.log(data)
        return location;
      } else {
        throw new Error("Endereço não encontrado para o CEP fornecido");
      }
    } catch (error) {
      console.error("Erro ao buscar dados de geolocalização:", error);
      showAlert({ message: "Erro ao buscar localização. Verifique o CEP e tente novamente.", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button
        label="voltar"
        iconSide="left"
        icon={ArrowLongLeftIcon}
        className="text-primary-500"
        onClick={() => setSection(({ step, role }) => ({ step: step - 1, role }))}
      />
      <div className="mb-8 w-full text-center">
        <Text className="font-quickSand text-3xl font-bold text-coolGray-900">
          Finalize o cadastro
        </Text>
        <Text className="font-regular text-sm text-coolGray-600">Insira sua localização.</Text>
      </div>
      <form onSubmit={(e) => nextStep(e)} className="mx-auto flex max-w-xl flex-col gap-2">
        {loading && (
          <Spinner id="spinner" size="xl" className="absolute left-1/2 top-1/2 z-50 opacity-100" />
        )}
        <TextFieldMask
          name="cep"
          onBlur={async () => {
            setLoading(true);
            await fetchCep(data, setData, setCepError, setLoading);
            getCoordinates();
          }}
          mask="99999-999"
          label="CEP"
          className="rounded-xl"
          placeholder="Digite seu CEP"
          error={cepError}
          errorMsg="Por favor insira um CEP válido"
          value={data.address_attributes?.cep || ""}
          onChange={(e) =>
            setData((data) => ({
              ...data,
              address_attributes: {
                ...data.address_attributes,
                cep: e.target.value,
              },
            }))
          }
        />
        <SelectBox
          label="Estado"
          className="rounded-xl"
          placeholder="Selecione seu estado"
          value={data.address_attributes?.state || ""}
          options={stateOptions}
          onChange={(e) =>
            setData((data) => ({
              ...data,
              address_attributes: {
                ...data.address_attributes,
                state: e || "",
              },
            }))
          }
        />
        <TextField
          name="city"
          label="Cidade"
          className="rounded-xl"
          placeholder="Digite sua cidade"
          value={data.address_attributes?.city || ""}
          onChange={(e) =>
            setData((data) => ({
              ...data,
              address_attributes: {
                ...data.address_attributes,
                city: e.target.value,
              },
            }))
          }
        />
        <TextField
          name="neighborhood"
          label="Bairro"
          className="rounded-xl"
          placeholder="Digite seu bairro"
          value={data.address_attributes?.neighborhood || ""}
          onChange={(e) =>
            setData((data) => ({
              ...data,
              address_attributes: {
                ...data.address_attributes,
                neighborhood: e.target.value,
              },
            }))
          }
        />
        <div className="flex w-full gap-2">
          <div className="w-4/5">
            <TextField
              name="street"
              label="Logradouro"
              className="rounded-xl"
              placeholder="Digite seu logradouro"
              value={data.address_attributes?.street || ""}
              onChange={(e) =>
                setData((data) => ({
                  ...data,
                  address_attributes: {
                    ...data.address_attributes,
                    street: e.target.value,
                  },
                }))
              }
            />
          </div>
          <div className="w-1/5">
            <TextField
              name="number"
              label="Número"
              className="rounded-xl"
              placeholder="n°"
              value={data.address_attributes?.number || ""}
              onChange={(e) =>
                setData((data) => ({
                  ...data,
                  address_attributes: {
                    ...data.address_attributes,
                    number: e.target.value,
                  },
                }))
              }
            />
          </div>
        </div>
        {processing ? (
          <div className="flex justify-center">
            <Spinner id="spinner" />
          </div>
        ) : (
          <Button
            label="Criar conta"
            className="mb-10 flex rounded-2xl bg-primary-500 px-6 py-2 text-sm font-medium text-white duration-500 hover:bg-primary-600"
            type="submit"
          />
        )}
      </form>
    </>
  );
};

export default AddressInfo;