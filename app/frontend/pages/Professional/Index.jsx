import { FunnelIcon } from "@heroicons/react/24/outline";
import { ChevronDownIcon, MagnifyingGlassIcon, MapPinIcon } from "@heroicons/react/24/solid";
import { Link } from "@inertiajs/react";
import { Button, Popover, Select, Spinner, Text } from "@switchdreams/ui";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import ProfessionalCard from "@/components/Cards/ProfessionalCard";
import { specialtyOptions, workAreaOptionsFetch } from "@/utils";
import Modal from 'react-modal';

const ProfessionalSearch = ({
  initial_professionals,
  states_options,
  cities_by_state_options,
  pagy,
}) => {
  const sortOptions = [
    { label: "Alfabética", value: "alphabetical" },
    { label: "Número de pacientes atendido", value: "patients_count" },
    { label: "Tempo no site", value: "created_at" },
  ];

  // Params from url
  const workSpecialtyIdFromUrl = parseInt(
    new URLSearchParams(window.location.search).get("work_specialty"),
  );
  const workAreaIdFromUrl = parseInt(new URLSearchParams(window.location.search).get("work_area"));

  const [professionals, setProfessionals] = useState(initial_professionals);
  const [sort, setSort] = useState(sortOptions[0]);
  const [workArea, setWorkArea] = useState(""); // Inicializado como string vazia
  const [specialty, setSpecialty] = useState(""); // Mudado de null para ""
  const [state, setState] = useState(""); // Mudado de null para ""
  const [city, setCity] = useState(""); // Mudado de [] para ""
  const [cityOptions, setCityOptions] = useState([]);
  const [allStates, setAllStates] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [workAreaOptions, setWorkAreaOptions] = useState([]);
  const [specialtiesOptions, setSpecialtiesOptions] = useState([]);
  const [openReviews, setOpenReviews] = useState(false);
  const [reviews, setReviews] = useState([]);
  // Pagination
  const [page, setPage] = useState(0);
  const [maxPages, setMaxPages] = useState(pagy.pages);
  const [count, setCount] = useState(pagy.count);
  const [firstLoad, setFirstLoad] = useState(true);

  const elementRef = useRef(null);

  const formatDate = (date) => {
    const dateTime = new Date(date);
    return dateTime.toLocaleString();
  };

  const openReviewsModal = (reviewData) => {
    if(reviewData.reviews.length > 0){
      setOpenReviews(true);
      setReviews(reviewData.reviews);
    } 
  };

  useEffect(() => {
    let statesArr = states_options.map((item) => ({
      value: item.state,
      label: item.state,
    }));
    setAllStates(statesArr);
  }, []);

  const selectState = (selectedState) => {
    let citiesData = cities_by_state_options[selectedState.value].map((item) => ({
      value: item,
      label: item,
    }));
    setCityOptions(citiesData);
    setState(selectedState);
  };

  useEffect(() => {
    // Set select inputs
    workAreaOptionsFetch(setWorkAreaOptions);
    specialtyOptions(setSpecialtiesOptions);
    // Set state
    const state = states_options.find(
      (option) => option.state == new URLSearchParams(window.location.search).get("state"),
    );
    const getCity = new URLSearchParams(window.location.search).get("city");
    if (state) {
      selectState({ value: state.state, label: state.state });
    }
    if (getCity) {
      setCity({ value: getCity, label: getCity });
    }
  }, []);

  // Set work area from URL
  useEffect(() => {
    if (workAreaOptions && workAreaOptions.length > 0) {
      const workArea = workAreaOptions.find((option) => option.value == workAreaIdFromUrl);
      if (workArea) {
        setWorkArea(workArea);
      }
    }
  }, [workAreaOptions]);

  // Set specialty from URL
  useEffect(() => {
    if (specialtiesOptions && specialtiesOptions.length > 0) {
      const specialty = specialtiesOptions.find((option) => option.value == workSpecialtyIdFromUrl);
      if (specialty) {
        setSpecialty(specialty);
      }
    }
  }, [specialtiesOptions]);

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

  useEffect(() => {
    if (firstLoad) {
      setPage(1);
      setFirstLoad(false);
    }
  }, [specialty, sort, state]);

  return (
    <>
      <Modal
        isOpen={openReviews}
        onRequestClose={() => setOpenReviews(false)}
        className="w-full max-w-lg mx-auto my-6 bg-white rounded-lg shadow-2xl"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
      >
        <div className="relative px-3"> 
          <div className="sticky top-0 bg-white z-10 py-4 shadow-md">
            <button
              onClick={() => setOpenReviews(false)}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
              aria-label="Fechar"
            >
              &times;
            </button>
            <h2 className="text-xl font-semibold text-center mb-4">Avaliações</h2>
          </div>
        </div>
        <div className="space-y-4 max-h-[60vh] overflow-scroll p-6">
          {reviews.map((review, index) => (
            <div key={index} className="bg-gray-50 border border-gray-200 rounded-lg shadow-md p-4">
              <div className="text-gray-500 text-sm text-center mb-1">
                {formatDate(review?.created_at)}
              </div>
              <div className="text-center text-gray-800 text-lg font-semibold mb-2">
                {'Avaliação'}
              </div>
              <div className="flex justify-center mb-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    className={`cursor-pointer transition-colors duration-200 text-2xl ${
                      review?.rating >= star ? 'text-yellow-500' : 'text-gray-300'
                    }`}
                  >
                    ★
                  </span>
                ))}
              </div>
              <div className="text-gray-600 text-center leading-relaxed max-h-[40vh] overflow-auto">
                {review?.description || 'Nenhuma descrição fornecida.'}
              </div>
            </div>
          ))}
        </div>
      </Modal>

      <div className="relative flex h-fit w-full justify-center max-xl:items-center max-md:px-6 xl:h-[26rem]">
        <div className="relative flex max-w-screen-big overflow-x-clip pt-20 max-xl:flex-col max-xl:items-center max-xl:justify-center">
          <div className="flex w-3/4 flex-col gap-10 max-md:w-full">
            <Text className="font-quickSand z-10 text-5xl font-semibold leading-snug text-coolGray-950 max-xl:text-center max-md:text-3xl">
              Consultas de qualidade com os melhores profissionais da sua região!
            </Text>
            <div className="flex w-full gap-4 max-xl:flex-col max-xl:items-center max-xl:justify-center">
              <div className="flex h-12 w-full items-center justify-center rounded-lg border border-coolGray-400 bg-white max-xl:h-fit max-xl:flex-col xl:w-fit">
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
                    className="w-full border-none text-sm xl:w-72"
                    label=""
                    leftIcon={FunnelIcon}
                    placeholder="Escolha ou digite a especialidade"
                    value={specialty || ""}
                    simpleValue={specialty || ""}
                    options={specialtiesOptions}
                    onChange={(e) => setSpecialty(e || "")}
                  />
                </div>
                <div className="h-3/5 w-[2px] bg-primary-25 max-xl:h-px max-xl:w-full max-xl:bg-primary-50" />
                <div className="w-full">
                  <Select
                    name="estado"
                    className="w-full border-none text-sm xl:w-64"
                    label=""
                    leftIcon={MapPinIcon}
                    placeholder="Escolha ou digite o estado"
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
                href={`/profissionais`}
                data={{
                  work_area: workArea?.value || null,
                  work_specialty: specialty?.value || null,
                  state: state?.value || null,
                  city: city?.value || null,
                }}
              >
                <Button
                  label="Buscar"
                  className="z-40 flex h-12 w-fit rounded-2xl border border-primary-300 bg-primary-500 px-7 py-2 font-poppins text-sm font-medium text-white duration-500 hover:bg-primary-300 max-xl:w-full"
                  iconSide="left"
                  icon={MagnifyingGlassIcon}
                />
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 right-0 h-48 w-[10%] rounded-tl-2xl bg-secondary-100 max-lg:hidden" />
        <div className="absolute left-0 top-0 h-48 w-[6%] rounded-br-2xl bg-secondary-100 max-lg:hidden" />
      </div>

      <div className="flex h-fit w-full justify-center bg-coolGray-100 py-8 max-xl:px-6">
        <div className="flex max-w-screen-big flex-col gap-4">
          <div className="mb-8 flex w-full items-center justify-between gap-10">
            <div className="flex gap-1">
              <Text className="font-regular font-poppins text-coolGray-600 max-md:hidden" size="sm">
                Encontramos
              </Text>
              <Text className="font-regular font-poppins text-coolGray-600" size="sm">
                {count} especialistas
              </Text>
            </div>
            <div className="flex gap-2">
              <Text className="font-regular font-poppins text-coolGray-600 max-md:hidden" size="sm">
                Ordenar por:
              </Text>
              <Popover
                button={
                  <div className="flex w-40 items-center justify-center gap-1">
                    <Text className="font-poppins font-medium text-primary-500" size="sm">
                      {sort.label}
                    </Text>
                    <ChevronDownIcon className="h-4 text-primary-600" />
                  </div>
                }
              >
                <div className="mt-8 w-40 bg-white">
                  {sortOptions.map((option, key) => {
                    return (
                      <div className="w-40" key={key}>
                        <Button label={option.label} onClick={() => setSort(option)} />
                      </div>
                    );
                  })}
                </div>
              </Popover>
            </div>
          </div>
          <div id="resultado-pesquisa" className="flex flex-col items-center gap-8">
            {isLoading ? (
              <Spinner />
            ) : (
              professionals.map((info, idx) => {
                return <ProfessionalCard key={idx} doctorInfo={info} onClickReviews={() => openReviewsModal(info)} />;
              })
            )}
            {page < maxPages && (
              <div ref={elementRef} className="flex w-full justify-center">
                <Spinner />
              </div>
            )}
          </div>
          <div className="mt-12 flex flex-col items-center justify-center gap-12 border-t border-t-coolGray-300 py-12">
            <Text size="md" className="font-regular font-poppins text-coolGray-600">
              Encontre a especialidade que você precisa!
            </Text>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {specialtiesOptions.map((Option, idx) => {
                return (
                  <div
                    key={idx}
                    className="transition-500 flex max-h-10 cursor-pointer items-center justify-center rounded-2xl border border-primary-100 px-8 py-4 text-primary-500 transition-all hover:bg-primary-500 hover:text-white max-md:px-2 xl:px-12"
                    onClick={() => {
                      window.scroll({ top: 0, behavior: "smooth" });
                      setSpecialty(Option.value);
                    }}
                  >
                    <Text className="text-center font-poppins font-medium" size="sm">
                      {Option.label}
                    </Text>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfessionalSearch;