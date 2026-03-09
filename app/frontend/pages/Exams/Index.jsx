import { ChevronDownIcon, MagnifyingGlassIcon, MapPinIcon } from "@heroicons/react/24/solid";
import { Link } from "@inertiajs/react";
import { Button, Popover, Select, Spinner, Text } from "@switchdreams/ui";
import React, { useEffect, useReducer, useRef, useState } from "react";
import Modal from "react-modal";

import ExamCard from "@/components/Cards/ExamCard";
import { stateOptions } from "@/constants/SelectOptions";
import { useAlert } from "@/contexts/Alert";
import { imagePath, specialtyOptions, workAreaOptionsFetch } from "@/utils";

import SelectedClinicsCard from "../../components/Cards/SelectedClinicsCard";

const ExamsSearch = ({
  clinics,
  specialties_options,
  states_options,
  cities_by_state_options,
  pagy,
}) => {
  const sortOptions = [
    { label: "Alfabética", value: "alphabetical" },
    { label: "Número de pacientes atendido", value: "patients_count" },
    { label: "Tempo no site", value: "created_at" },
  ];
  console.log(clinics)

  // Params from url
  const workSpecialtyIdFromUrl = parseInt(
    new URLSearchParams(window.location.search).get("work_specialty_id"),
  );
  const workAreaIdFromUrl = parseInt(
    new URLSearchParams(window.location.search).get("work_specialty_id"),
  );

  const [professionals, setProfessionals] = useState(clinics);
  const [sort, setSort] = useState(sortOptions[0]);
  const [countSelected, setCountSelected] = useState(0);
  const [workAreaClinic, setWorkAreaClinic] = useState("");
  const [specialty, setSpecialty] = useState(null);
  const [state, setState] = useState(null);
  const [city, setCity] = useState([]);
  const [cityOptions, setCityOptions] = useState([]);
  const [allStates, setAllStates] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [workAreaOptions, setWorkAreaOptions] = useState([]);
  const [specialtiesOptions, setSpecialtiesOptions] = useState([]);
  const { showAlert } = useAlert();
  const [openReviews, setOpenReviews] = useState(false);
  const [openImages, setOpenImages] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [images, setImages] = useState([]);
  // Pagination
  const [page, setPage] = useState(0);
  const [maxPages, setMaxPages] = useState(pagy.pages);
  const [count, setCount] = useState(pagy.count);
  const [firstLoad, setFirstLoad] = useState(true);

  const elementRef = useRef(null);

  function onIntersection(entries) {
    const firstEntry = entries[0];
    if (firstEntry.isIntersecting && page <= maxPages) {
      getData("add");
    }
  }

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
    const observer = new IntersectionObserver(onIntersection);
    if (observer && elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  }, []);

  const openReviewsModal = (reviewData) => {
    if (reviewData.reviews.length > 0) {
      setOpenReviews(true);
      setReviews(reviewData.reviews);
    }
  };

  const openImagesModal = (imageData) => {
    if (imageData.user_media.length > 0) {
      setOpenImages(true);
      setImages(imageData.user_media);
    }
  };

  const [, forceUpdate] = useReducer((x) => x + 1, 0);

  const selectClinic = (idx, data) => {
    let allData = professionals;
    allData[idx].selected = !allData[idx].selected;

    if (allData[idx].selected == true) {
      if (countSelected < 3) {
        setCountSelected(countSelected + 1);
        setProfessionals(allData);
      } else {
        allData[idx].selected = !allData[idx].selected;
        showAlert({
          message: "Você pode selecionar no máximo três clínicas!",
          type: "warning",
        });
      }
    } else {
      setCountSelected(countSelected - 1);
      setProfessionals(allData);
    }

    forceUpdate();

    let arr = [];
    allData.map((item) => {
      if (item.selected == true) {
        arr.push(item);
      }
    });
    localStorage.setItem("clinics", JSON.stringify(arr));
  };

  const formatDate = (date) => {
    const dateTime = new Date(date);
    return dateTime.toLocaleString();
  };

  useEffect(() => {
    // TODO: PERFOMANCE Improves to make only one fetch
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
    setCity({ value: getCity, label: getCity });
  }, []);

  // Set work area from URL
  useEffect(() => {
    if (workAreaOptions) {
      const specialty = specialties_options.find((option) => option.value == workAreaIdFromUrl);
      if (specialty) {
        setWorkAreaClinic(specialty);
      }
    }
  }, [workAreaOptions]);

  // Set specialty from URL
  useEffect(() => {
    if (specialtiesOptions) {
      const specialty = specialtiesOptions.find((option) => option.value == workSpecialtyIdFromUrl);
      if (specialty) {
        setSpecialty(specialty);
      }
    }
  }, [specialtiesOptions]);

  useEffect(() => {
    if (workAreaClinic === "") {
      return;
    }

    // find workArea selected
    const selectedWorkArea = workAreaOptions.find(
      (option) => option.value === workAreaClinic.value,
    );
    const specialties =
      selectedWorkArea?.work_specialities?.map((specialty) => {
        return {
          value: specialty.id,
          label: specialty.name,
        };
      }) || [];
    setSpecialtiesOptions(specialties);
  }, [workAreaClinic]);

  useEffect(() => {
    if (firstLoad) {
      setPage(1);
      setFirstLoad(false);
    }
  }, [specialty, sort, state]);

  return (
    <>
      <Modal
        isOpen={openImages}
        onRequestClose={() => setOpenImages(false)}
        className="mx-auto my-6 w-full max-w-4xl rounded-lg bg-white shadow-2xl"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
      >
        <div className="relative px-6">
          <div className="sticky top-0 z-10 bg-white py-4 shadow-md">
            <button
              onClick={() => setOpenImages(false)}
              className="absolute right-2 top-2 text-gray-600 hover:text-gray-800"
              aria-label="Fechar"
            >
              &times;
            </button>
            <h2 className="mb-4 text-center text-2xl font-semibold">Imagens</h2>
          </div>
        </div>
        <div className="max-h-[90vh] overflow-scroll p-6">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {images.map((item, i) => (
              <div key={i} className="relative w-full pb-[75%] bg-gray-200 rounded-lg overflow-hidden">
                <img
                  src={item} // Substitua por item.path ou o caminho correto da imagem
                  className="absolute top-0 left-0 w-full h-full object-cover"
                  alt={`Imagem ${i + 1}`}
                />
              </div>
            ))}
          </div>
        </div>
      </Modal>
      <Modal
        isOpen={openReviews}
        onRequestClose={() => setOpenReviews(false)}
        className="mx-auto my-6  w-full max-w-lg rounded-lg bg-white shadow-2xl "
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
      >
        <div className="relative px-3">
          <div className="sticky top-0 z-10 bg-white py-4 shadow-md">
            <button
              onClick={() => setOpenReviews(false)}
              className="absolute right-2 top-2 text-gray-600 hover:text-gray-800"
              aria-label="Fechar"
            >
              &times;
            </button>
            <h2 className="mb-4 text-center text-xl font-semibold">Avaliações</h2>
          </div>
        </div>
        <div className="max-h-[60vh] space-y-4 overflow-scroll p-6">
          {" "}
          {/* Usar espaço vertical entre as avaliações */}
          {reviews.map((review, index) => (
            <div key={index} className="rounded-lg border border-gray-200 bg-gray-50 p-4 shadow-md">
              {" "}
              {/* Estilo melhorado */}
              <div className="mb-1 text-center text-sm text-gray-500">
                {formatDate(review?.created_at)}
              </div>
              <div className="mb-2 text-center text-lg font-semibold text-gray-800">
                {"Avaliação"}
              </div>
              <div className="mb-2 flex justify-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    className={`cursor-pointer text-2xl transition-colors duration-200 ${
                      review?.rating >= star ? "text-yellow-500" : "text-gray-300"
                    }`}
                  >
                    ★
                  </span>
                ))}
              </div>
              <div className="max-h-[40vh] overflow-auto text-center leading-relaxed text-gray-600">
                {review?.description || "Nenhuma descrição fornecida."}
              </div>
            </div>
          ))}
        </div>
      </Modal>
      <div className="relative flex h-fit w-full justify-center max-xl:items-center max-md:px-6 xl:h-[26rem]">
        <div className="relative flex max-w-screen-big overflow-x-clip pt-20 max-xl:flex-col max-xl:items-center max-xl:justify-center">
          <div className="flex w-3/4 flex-col gap-10 max-md:w-full">
            <Text className="font-quickSand z-10 text-5xl font-semibold leading-snug text-coolGray-950 max-xl:text-center max-md:text-3xl">
              Exames de qualidade com as melhores clínicas da sua região!
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
                    value={workAreaClinic}
                    options={specialties_options}
                    onChange={(e) => setWorkAreaClinic(e)}
                  />
                </div>
                <div className="h-3/5 w-[2px] bg-primary-25 max-xl:h-px max-xl:w-full max-xl:bg-primary-50" />
                <div className="h-3/5  bg-primary-25 max-xl:h-px max-xl:w-full max-xl:bg-primary-50" />
                <div className="w-full">
                  <Select
                    name="estado"
                    className="w-full border-none text-sm xl:w-52"
                    label=""
                    leftIcon={MapPinIcon}
                    placeholder="Escolha ou digite estado"
                    value={state}
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
                    value={city}
                    options={cityOptions}
                    onChange={(e) => setCity(e)}
                  />
                </div>
              </div>
              <Link
                className="z-[999]"
                href={workAreaClinic !== "" ? `/exames` : null}
                data={{
                  state: state ? state.value : null,
                  work_specialty_id: workAreaClinic ? workAreaClinic.value : null,
                  city: city ? city.value : null,
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
          <img
            src={imagePath("professional.webp")}
            className="-right-24 bottom-0 w-2/4 max-lg:hidden xl:absolute"
            alt="Médica sorrindo de braços cruzados"
          />
        </div>
        <div className="absolute bottom-0 right-0 h-48 w-[10%] rounded-tl-2xl bg-secondary-100 max-lg:hidden" />
        <div className="absolute left-0 top-0 h-48 w-[6%] rounded-br-2xl bg-secondary-100 max-lg:hidden" />
      </div>
      <div className="flex h-fit w-full justify-center bg-coolGray-100 py-8 max-xl:px-6">
        <div className="flex max-w-screen-big flex-col gap-4 ">
          <div className="mb-8 flex w-full items-center justify-between gap-10">
            <div className="flex gap-1">
              <Text className="font-regular font-poppins text-coolGray-600 max-md:hidden" size="sm">
                Encontramos
              </Text>
              <Text className="font-regular font-poppins text-coolGray-600" size="sm">
                {count} Clínicas
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
                return (
                  <ExamCard
                    key={idx}
                    doctorInfo={info}
                    onClick={() => selectClinic(idx, info)}
                    onClickReviews={() => openReviewsModal(info)}
                    onClickImages={() => openImagesModal(info)}
                    selected={info.selected}
                  />
                );
              })
            )}
            {page < maxPages && (
              <div ref={elementRef} className="flex w-full justify-center">
                <Spinner />
              </div>
            )}
          </div>
          <SelectedClinicsCard quantity={countSelected} />
          {/* <div className="mt-5 flex w-full items-center justify-center">
            <Button
              label="Ver mais"
              className="flex h-12 w-fit rounded-2xl border border-primary-300 bg-primary-500 px-7 py-2 font-poppins text-sm font-medium text-white duration-500 hover:bg-primary-300 max-xl:w-full"
            />
          </div> */}
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

export default ExamsSearch;
