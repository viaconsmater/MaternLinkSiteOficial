import { FunnelIcon } from "@heroicons/react/24/outline";
import { MagnifyingGlassIcon, MapPinIcon } from "@heroicons/react/24/solid";
import { Link } from "@inertiajs/react";
import { Badge, Button, Select, Text } from "@switchdreams/ui";
import React, { useEffect, useState } from "react";

import { stateOptions } from "@/constants/SelectOptions";
import { imagePath, specialtyOptions, workAreaOptionsFetch } from "@/utils";

const HeroSection = ({ clinicSpecialtiesOptions, states_options, cities_by_state }) => {
  const [selected, setSelected] = useState("consulta");
  const [workArea, setWorkArea] = useState("");
  const [workAreaClinic, setWorkAreaClinic] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [cityOptions, setCityOptions] = useState([]);
  const [allStates, setAllStates] = useState([]);
  const [workAreaOptions, setWorkAreaOptions] = useState([]);
  const [specialtiesOptions, setSpecialtiesOptions] = useState([]);

  useEffect(() => {
    workAreaOptionsFetch(setWorkAreaOptions);
    specialtyOptions(setSpecialtiesOptions);
    getLocation();
  }, []);

  const getLocation = () => {
    // Verifica se geolocalização está disponível
    if (!navigator.geolocation) {
      console.log("Geolocalização não suportada pelo navegador");
      return;
    }

    // Solicita localização DIRETAMENTE (isso mostra o popup de permissão)
    navigator.geolocation.getCurrentPosition(
      success,
      error,
      {
        timeout: 10000,
        enableHighAccuracy: true,
        maximumAge: 0 // Não usa cache para forçar nova solicitação
      }
    );
  };

  const success = (position) => {
    setLatitude(position.coords.latitude);
    setLongitude(position.coords.longitude);
    console.log(`Latitude: ${position.coords.latitude}, Longitude: ${position.coords.longitude}`);
  };
  
  const error = (err) => {
    console.log("Não foi possível obter sua localização:", err.message);
  };

  useEffect(() => {
    let statesArr = states_options.map((item) => ({
      value: item.state,
      label: item.state,
    }));
    setAllStates(statesArr);
  }, []);

  const selectState = (selectedState) => {
    let citiesData = cities_by_state[selectedState.value].map((item) => ({
      value: item,
      label: item,
    }));
    setCityOptions(citiesData);
    setState(selectedState);
  };

  // Filter specialtiesOptions when workArea is selected
  useEffect(() => {
    if (workArea === "" || !workArea) {
      return;
    }
    // find workArea selected
    const selectedWorkArea = workAreaOptions.find((option) => option.value === workArea.value);
    const specialties =
      selectedWorkArea?.work_specialities?.map((specialty) => {
        return {
          value: specialty.id,
          label: specialty.name,
        };
      }) || [];
    setSpecialtiesOptions(specialties);
  }, [workArea]);

  return (
    <div className="flex h-auto w-full flex-col items-center justify-center overflow-x-clip bg-primary-400 max-lg:pt-16 xl:h-[39rem]">
      <div className="relative flex h-full max-w-screen-big max-xl:flex-col max-xl:items-center max-xl:justify-center">
        <div className="z-10 flex w-full flex-col justify-center gap-6 max-xl:items-center max-md:px-6 md:w-[70%]">
          <Text className="font-poppins text-lg font-semibold text-white max-xl:mt-16 max-md:text-sm">
            VIA CONSULTAS
          </Text>
          <Text className="font-quickSand text-6xl font-semibold leading-snug text-white max-xl:text-center max-md:text-5xl">
            A plataforma que conecta você à excelência no cuidado materno-infantil.
          </Text>
          <div className="flex flex-col gap-5">
            <Text className="font-regular text-md font-poppins text-coolGray-300 max-xl:text-center">
              Encontre os melhores profissionais de saúde, com valores acessíveis e agendamento
              rápido
            </Text>
          </div>
          <div className="mt-4 flex gap-2">
            <Badge
              label="Consulta"
              className={`${selected === "consulta" ? "border-primary-300 bg-primary-600" : "border border-primary-400 bg-primary-200"} cursor-pointer  text-white px-8 py-5 text-lg`}
              onClick={() => setSelected("consulta")}
            />
            <Badge
              label="Exame"
              className={`${selected === "exame" ? "border-primary-300 bg-primary-600" : "border border-primary-400 bg-primary-200"} cursor-pointer  text-white px-8 py-5 text-lg`}
              onClick={() => setSelected("exame")}
            />
          </div>

          <div className="mb-4 flex w-full gap-4 max-xl:flex-col xl:w-4/5">
            <div className="flex h-12 items-center justify-center rounded-lg bg-white max-xl:h-fit max-xl:flex-col">
              {selected == "exame" ? (
                <div className="w-full">
                  <Select
                    name="área"
                    className="w-full border-none text-sm xl:w-64"
                    label=""
                    leftIcon={MagnifyingGlassIcon}
                    placeholder="Escolha ou digite a área de atuação da Clínica"
                    value={workAreaClinic || ""}
                    options={clinicSpecialtiesOptions}
                    onChange={(e) => setWorkAreaClinic(e || "")}
                  />
                </div>
              ) : null}
              {selected !== "exame" ? (
                <>
                  <div className="w-full">
                    <Select
                      name="área"
                      className="w-full border-none text-sm xl:w-64"
                      label=""
                      leftIcon={MagnifyingGlassIcon}
                      placeholder="Escolha ou digite a área de especialidade"
                      value={workArea || ""}
                      options={workAreaOptions}
                      onChange={(e) => setWorkArea(e || "")}
                    />
                  </div>
                  <div className="w-full">
                    <Select
                      name="especialidade"
                      className="w-full border-none text-sm xl:w-64"
                      label=""
                      leftIcon={FunnelIcon}
                      placeholder="Escolha ou digite a especialidade"
                      value={specialty || ""}
                      options={specialtiesOptions}
                      onChange={(e) => setSpecialty(e || "")}
                    />
                  </div>
                </>
              ) : null}

              <div className="h-3/5 bg-primary-25 max-xl:h-px max-xl:w-full max-xl:bg-primary-50" />
              <div className="w-full">
                <Select
                  name="estado"
                  className="w-full border-none text-sm xl:w-52"
                  label=""
                  leftIcon={MapPinIcon}
                  placeholder="Escolha ou digite estado"
                  value={state || ""}
                  options={allStates}
                  onChange={(e) => selectState(e)}
                />
              </div>
              <div className="w-full">
                <Select
                  name="cidade"
                  className="z-[999] w-full border-none text-sm xl:w-52"
                  label=""
                  leftIcon={MapPinIcon}
                  placeholder="Escolha ou digite a Cidade"
                  value={city || ""}
                  options={cityOptions}
                  onChange={(e) => setCity(e || "")}
                />
              </div>
            </div>
            <Link
              href={`/${selected == "consulta" ? "profissionais" : "exames"}`}
              data={{
                work_area: workArea?.value || undefined,
                work_specialty: selected == "consulta" ? specialty?.value || undefined : workAreaClinic?.value || undefined,
                state: state?.value || undefined,
                latitude: latitude || undefined,
                longitude: longitude || undefined,
                city: city?.value || undefined,
              }}
            >
              <Button
                label="Buscar"
                className="flex h-12 w-fit rounded-2xl border border-primary-300 bg-primary-500 px-7 py-2 font-poppins text-sm font-medium text-white duration-500 hover:bg-primary-300 max-xl:w-full"
                iconSide="left"
                icon={MagnifyingGlassIcon}
              />
            </Link>
          </div>
        </div>
        <img
          src={imagePath("HeroPatientDesktop.webp")}
          className="z-5 -right-72 bottom-0 w-4/5 max-xl:hidden xl:absolute"
          alt="Médica sorrindo de braços cruzados"
        />
      </div>
    </div>
  );
};

export default HeroSection;