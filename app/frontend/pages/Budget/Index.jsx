import { FunnelIcon } from "@heroicons/react/24/outline";
import { ChevronDownIcon, MagnifyingGlassIcon, MapPinIcon } from "@heroicons/react/24/solid";
import { Button, Popover, Select, Spinner, Text } from "@switchdreams/ui";
import axios from "axios";
import React, { useEffect, useReducer, useRef, useState } from "react";

import ExamCard from "@/components/Cards/ExamCard";
import { stateOptions } from "@/constants/SelectOptions";
import { imagePath, specialtyOptions, workAreaOptionsFetch } from "@/utils";
import SelectedClinicsCard from "../../components/Cards/SelectedClinicsCard";
import { useAlert } from "@/contexts/Alert";

const ExamsSearch = ({ initial_professionals, pagy }) => {
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
  const [countSelected, setCountSelected] = useState(0);
  const [workArea, setWorkArea] = useState("");
  const [specialty, setSpecialty] = useState(null);
  const [state, setState] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [workAreaOptions, setWorkAreaOptions] = useState([]);
  const [specialtiesOptions, setSpecialtiesOptions] = useState([]);
  const { showAlert } = useAlert();

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


  const handleSelect = (data) => {
    console.log(data)
  }


  const getData = (action) => {
    setIsLoading(true);
    let workSpecialityParams;
    if (specialty?.label == "Todos") {
      workSpecialityParams = "";
    } else {
      workSpecialityParams = specialty?.value || workSpecialtyIdFromUrl || "";
    }
    axios
      .get(`/profissionais.json`, {
        params: {
          sort: sort.value,
          page: action == "add" ? page + 1 : 1,
          state: state?.value || "",
          work_specialty: workSpecialityParams,
          work_area_id: workArea?.value || workAreaIdFromUrl || "",
        },
      })
      .then((response) => {
        setMaxPages(response.data.pagy.pages);
        setCount(response.data.pagy.count);
        if (action == "add") {
          setProfessionals(professionals.concat(response.data.professionals));
          setPage(page + 1);
        } else if (action == "substitute") {
          setProfessionals(response.data.professionals);
          setPage(1);
        }
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    getData("substitute");
  }, [sort]);
  const [, forceUpdate] = useReducer(x => x + 1, 0);

  const selectClinic = (idx) => {
    let allData = professionals;
    allData[idx].selected = !allData[idx].selected;
    
    
    if(allData[idx].selected == true){ 
        if(countSelected < 3){
          setCountSelected(countSelected + 1)
          setProfessionals(allData); 
        }else{
          allData[idx].selected = !allData[idx].selected;
          showAlert({
            message: "Você pode selecionar no máximo três clínicas!",
            type: "warning",
          });
        }
    }else{
      setCountSelected(countSelected - 1)
      setProfessionals(allData);
    }

    forceUpdate();
  }



  useEffect(() => {
    // TODO: PERFOMANCE Improves to make only one fetch
    // Set select inputs
    workAreaOptionsFetch(setWorkAreaOptions);
    specialtyOptions(setSpecialtiesOptions);
    // Set state
    const state = stateOptions.find(
      (option) => option.value == new URLSearchParams(window.location.search).get("state"),
    );
    setState(state);
  }, []);

  // Set work area from URL
  useEffect(() => {
    if (workAreaOptions) {
      const workArea = workAreaOptions.find((option) => option.value == workAreaIdFromUrl);
      if (workArea) {
        setWorkArea(workArea);
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
    if (workArea === "") {
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
                    value={workArea}
                    options={workAreaOptions}
                    onChange={(e) => setWorkArea(e)}
                  />
                </div>
                <div className="w-full">
                  <Select
                    name="especialidade"
                    className="w-full border-none text-sm xl:w-72"
                    label=""
                    leftIcon={FunnelIcon}
                    placeholder="Escolha ou digite a especialidade"
                    value={specialty}
                    simpleValue={specialty}
                    options={specialtiesOptions}
                    onChange={(e) => setSpecialty(e)}
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
                    value={state}
                    options={stateOptions}
                    onChange={(e) => setState(e)}
                  />
                </div>
              </div>
              <Button
                label="Buscar"
                className="z-40 flex h-12 w-fit rounded-2xl border border-primary-300 bg-primary-500 px-7 py-2 font-poppins text-sm font-medium text-white duration-500 hover:bg-primary-300 max-xl:w-full"
                iconSide="left"
                icon={MagnifyingGlassIcon}
                onClick={() => getData("substitute")}
              />
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
                return <ExamCard key={idx} doctorInfo={info} onClick={() => selectClinic(idx)} selected={info.selected} />;
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
