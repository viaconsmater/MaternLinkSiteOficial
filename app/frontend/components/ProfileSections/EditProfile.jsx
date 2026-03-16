import {
  BriefcaseIcon,
  CameraIcon,
  MapPinIcon,
  PlusIcon,
  UserCircleIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { CogIcon } from "@heroicons/react/24/solid";
import { router, useForm } from "@inertiajs/react";
import {
  Avatar,
  Button,
  SelectBox,
  Text,
  TextArea,
  TextField,
  TextFieldMask,
} from "@switchdreams/ui";
import axios from "axios";
import React, { useEffect, useReducer, useState } from "react";
import { imagePath, fetchCep, formatCurrency, currencyToCents } from "@/utils";


import { genderOptions, stateOptions } from "@/constants/SelectOptions";
import { useAlert } from "@/contexts/Alert";
import {
  monthsTranslated,
  pixTypeMask,
  pixTypeOptions,
  yesOrNotOptions,
} from "@/utils";

import AddImageModal from "../AddImageModal";





const EditProfile = ({ user, data, setData, areaOptions, clinic }) => {
  const [open, setOpen] = useState(false);
  const [selectedSpecialty, setSelectedSpecialty] = useState(null);
  const [specialtyArr, setSpecialtyArr] = useState([]);
  const [openClinicModal, setOpenClinicModal] = useState(false);
  const { showAlert } = useAlert();
  const fileForm = useForm({ image: null });
  const [files, setFiles] = useState([]);
  const fileFormClinic = useForm({ image: null });
  const [cepError, setCepError] = useState(false);
  const [loading, setLoading] = useState(false);

  const onFileChange = (event) => {
    const formData = new FormData();
    formData.append('id', user.id);
    formData.append('images[]', ...event.target.files);

    router.post('/image_upload', formData, {
      forceFormData: true,
      onSuccess: () => {
        console.log("Upload concluído com sucesso!");
      },
      onError: (errors) => {
        console.error("Erro durante o upload:", errors);
      }
    });
  };
  
  const removeImage = (id) => {
    router.post('/remove_image', {id});
  }
  
  useEffect(() => {
    console.log(files)
  }, [files])

  useEffect(() => {
    let arr = [];

    if (clinic !== null) {
      clinic.work_specialties.map((item) => {
        arr.push({ value: item.id, label: item.name });
      });
      setSpecialtyArr(arr);
    }
  }, []);

  const formatDateOfRegister = () => {
    const date = user.registered_since.split("/");
    return `${date[0]} de ${monthsTranslated[Number(date[1]) - 1]} de ${date[2]}`;
  };

  const [specialtyOptions, setSpecialtyOptions] = useState([]);

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
  
  const getSpecialties = (id) => {
    axios
      .get(`/work_specialties/${id}`)
      .then((response) => setSpecialtyOptions(response.data))
      .catch(() => showAlert({ message: "Ocorreu um erro. Tente novamente", type: "warning" }));
  };

  const updateUserImage = () => {
    fileForm.patch(`/users/${user.id}/attach_image`, {
      forceFormData: true,
      onError: (e) => {
        showAlert({ message: e });
      },
      onSuccess: () => {
        showAlert({ message: "Dados de usuário editados com sucesso!", type: "success" });
      },
    });
    setOpen(false);
  };
  
  const [, forceUpdate] = useReducer((x) => x + 1, 0);

  const updateClinicImage = () => {
    fileFormClinic.patch("/clinica/attach_image", {
      forceFormData: true,
      onError: (e) => {
        showAlert({ message: e });
      },
      onSuccess: () => {
        showAlert({ message: "Dados da clinica editados com sucesso!", type: "success" });
      },
    });
    setOpenClinicModal(false);
  };

  useEffect(() => {
    getSpecialties(data.doctor_attributes.work_area_id);
  }, []);

  const addSpecialty = () => {
    let arr = specialtyArr;
    let idsArr = [];
    data.work_specialties_options.map((item) => {
      if (item.value == selectedSpecialty) {
        arr.push(item);
        idsArr.push(item.value);
      }
    });

    arr = arr.filter(function (item, pos) {
      return arr.indexOf(item) == pos;
    });

    setSpecialtyArr(arr);
    forceUpdate();
    setSpecialtyArrIds(idsArr);
  };

  const setSpecialtyArrIds = (idsArr) => {
    specialtyArr.map((item) => {
      idsArr.push(item.value);
    });

    idsArr = idsArr.filter(function (item, pos) {
      return idsArr.indexOf(item) == pos;
    });

    setData((data) => ({
      ...data,
      clinic_attributes: {
        ...data.clinic_attributes,
        work_specialty_ids: idsArr,
      },
    }));
    forceUpdate();
  };

  return (
    <div className="flex gap-6 px-4 py-6 max-lg:flex-col">
      <AddImageModal
        setOpen={setOpen}
        open={open}
        currentImage={user.image}
        onClickConfirm={updateUserImage}
        fileForm={fileForm}
      />
      <div className="flex items-center gap-6 rounded-xl border border-coolGray-300 px-5 py-4 lg:h-fit lg:flex-col lg:px-14 lg:pt-8">
        <div
          className="relative flex items-center justify-center w-32 h-32 cursor-pointer rounded-full border-2 border-secondary-400"
          onClick={() => setOpen(true)}
        >
          <span className="absolute inset-0 overflow-hidden rounded-full">
            <img src={user.image} className="w-full h-full object-cover" />
          </span>
          <div className="absolute right-0 top-0 flex items-center justify-center w-8 h-8 rounded-full bg-secondary-400">
            <CameraIcon className="w-5 h-5 text-white" />
          </div>
        </div>
        <div className="lg:flex lg:flex-col lg:items-center lg:justify-center">
          <Text className="font-quick+nd text-center text-2xl font-semibold text-coolGray-950">
            {user.name}
          </Text>
          <Text className="font-regular font-poppins text-sm text-coolGray-600">
            {user?.doctor?.work_specialty?.name}
          </Text>
          <div className="mt-8 flex flex-col items-center justify-center border-t border-coolGray-300 pt-8 max-lg:hidden">
            <Text className="font-regular font-poppins text-xs">Cadastrado desde</Text>
            <Text className="font-regular font-poppins text-xs">{formatDateOfRegister()}</Text>
          </div>
          <div>
            <Button label="meus cartões" onClick={() => router.get("/credit_cards")} />
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:w-[70%]">
        <div className="flex flex-col items-start gap-6 rounded-xl border border-coolGray-300">
          {
            user.role !== "patient" ? (
              <div className="w-full items-center gap-3 border-b border-coolGray-300 px-5 py-4">
                <h6>A partir da sua primeira consulta ou exame uma conta ficará disponível no site do <a className="text-blue" href="https://www.asaas.com/"><b>https://www.asaas.com/</b></a></h6>
                <br/>
                <h6>Você receberá um <b>E-mail</b> da plataforma Asaas para o primeiro acesso e definição da sua senha, no endereço cadastrado na Via Consultas</h6>
                <br/>
                <h6>O Asaas é a plataforma de pagamento onde ficarão disponíveis todos os valores recebidos através das suas consultas no Via Consultas</h6>
              </div>
            ) : null
          }

          <div className="flex w-full items-center gap-3 border-b border-coolGray-300 px-5 py-4">
            <UserCircleIcon className="size-6 text-secondary-500" />
            <Text className="font-quickSand text-xl font-semibold text-coolGray-950">Pessoal</Text>
          </div>
          <div className="w-full px-6">
            <div className="flex w-full max-lg:flex-col lg:gap-6">
              <div className="lg:w-1/2">
                <TextField
                  label="Nome"
                  className="rounded-xl"
                  value={data.name || ""}
                  onChange={(e) => setData("name", e.target.value)}
                />
              </div>
              <div className="lg:w-1/2">
                <TextFieldMask
                  name="cpf"
                  mask="999.999.999-99"
                  label="CPF"
                  type="text"
                  className="rounded-xl"
                  value={data.cpf || ""}
                  onChange={(e) => setData("cpf", e.target.value)}
                />
              </div>
            </div>
            <div className="flex w-full max-lg:flex-col lg:gap-6">
              <div className="lg:w-1/2">
                <SelectBox
                  label="Gênero"
                  className="rounded-xl"
                  options={genderOptions}
                  value={data.gender || ""}
                  onChange={(e) => setData("gender", e)}
                />
              </div>
              <div className="lg:w-1/2">
                <TextFieldMask
                  name="phone"
                  mask="(99) 99999-9999"
                  label="Telefone"
                  type="text"
                  className="rounded-xl"
                  value={data.phone || ""}
                  onChange={(e) => setData("phone", e.target.value)}
                />
              </div>
            </div>
            <div className="lg:w-[48%]">
              <TextField
                label="Data de nascimento"
                className="rounded-xl"
                type="date"
                value={data.birthdate || ""}
                onChange={(e) => setData("birthdate", e.target.value)}
              />
            </div>
          </div>

          {user.role === "doctor" && (
            <>
              <div className="flex w-full items-center gap-3 border-y border-coolGray-300 px-5 py-4">
                <BriefcaseIcon className="size-6 text-secondary-500" />
                <Text className="font-quickSand text-xl font-semibold text-coolGray-950">
                  Profissional
                </Text>
              </div>
              <div className="w-full px-6">
                <div className="flex w-full max-lg:flex-col lg:gap-6">
                  <div className="lg:w-1/2">
                    <SelectBox
                      label="Conselho de Classe"
                      className="rounded-xl"
                      options={areaOptions}
                      value={data.doctor_attributes.work_area_id || ""}
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
                  </div>
                  <div className="lg:w-1/2">
                    <TextField
                      label="N° do Conselho de classe"
                      className="rounded-xl"
                      value={data.doctor_attributes.council || ""}
                      onChange={(e) => {
                        setData((data) => ({
                          ...data,
                          doctor_attributes: {
                            ...data.doctor_attributes,
                            council: e.target.value,
                          },
                        }));
                      }}
                    />
                  </div>
                </div>
                <div className="lg:w-[48%]">
                  <SelectBox
                    label="Especialidade"
                    className="rounded-xl"
                    options={specialtyOptions}
                    value={data.doctor_attributes.work_specialty_id || ""}
                    onChange={(e) => {
                      setData((data) => ({
                        ...data,
                        doctor_attributes: {
                          ...data.doctor_attributes,
                          work_specialty_id: e,
                        },
                      }));
                    }}
                  />
                </div>
              </div>
            </>
          )}
          <div className="flex w-full items-center gap-3 border-y border-coolGray-300 px-5 py-4">
            <CogIcon className="size-6 text-secondary-500" />
            <Text className="font-quickSand text-xl font-semibold text-coolGray-950">Imagens</Text>
          </div>

          <div className="w-full px-6 pb-10">
            <div className="flex w-full max-lg:flex-col lg:gap-6">
              <div className="grid grid-cols-5 gap-2">
                {[...user.user_media].map((item) => (
                  <div key={item.id} className="relative">
                    <img
                      src={item.media_url}
                      className="w-full h-32 rounded border-none object-cover shadow"
                    />
                    <button
                      onClick={() => removeImage(item.id)}
                      className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition duration-200"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="w-5 h-5"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="relative inline-block w-full">
            <div className="flex flex-col items-center justify-center gap-4 self-stretch bg-white px-8 py-6">
              <Button
                className="text-md transition-500 w-full rounded-2xl border bg-primary-500 font-poppins font-medium text-white transition-all hover:bg-blue-500 "
                label="Adicionar Imagens"
              />
              <input
                onChange={onFileChange}
                type="file"
                className="absolute top-0 size-full opacity-0"
                multiple
              />
            </div>
          </div>
          <div className="flex w-full items-center gap-3 border-y border-coolGray-300 px-5 py-4">
            <MapPinIcon className="size-6 text-secondary-500" />
            <Text className="font-quickSand text-xl font-semibold text-coolGray-950">Endereço</Text>
          </div>
          <div className="w-full px-6 pb-10">
            <div className="flex w-full max-lg:flex-col lg:gap-6">
              <div className="lg:w-1/2">
                <TextFieldMask
                  mask="99999-999"
                  label="CEP"
                  className="rounded-xl"
                  value={data.address_attributes.cep || ""}
                  onBlur={async () => {
                    await fetchCep(data, setData, setCepError, setLoading);
                    getCoordinates();
                  }}
                  onChange={(e) => {
                    setData((data) => ({
                      ...data,
                      address_attributes: {
                        ...data.address_attributes,
                        cep: e.target.value,
                      },
                    }));
                  }}
                />
              </div>
              <div className="lg:w-1/2">
                <SelectBox
                  label="Estado"
                  className="rounded-xl"
                  options={stateOptions}
                  value={data.address_attributes.state || ""}
                  onChange={(e) => {
                    setData((data) => ({
                      ...data,
                      address_attributes: {
                        ...data.address_attributes,
                        state: e,
                      },
                    }));
                  }}
                />
              </div>
            </div>
            <div className="flex w-full max-lg:flex-col lg:gap-6">
              <div className="lg:w-1/2">
                <TextField
                  name="city"
                  label="Cidade"
                  className="rounded-xl"
                  value={data.address_attributes.city || ""}
                  onChange={(e) => {
                    setData((data) => ({
                      ...data,
                      address_attributes: {
                        ...data.address_attributes,
                        city: e.target.value,
                      },
                    }));
                  }}
                />
              </div>
              <div className="lg:w-1/2">
                <TextField
                  name="neighborhood"
                  label="Bairro"
                  className="rounded-xl"
                  value={data.address_attributes.neighborhood || ""}
                  onChange={(e) => {
                    setData((data) => ({
                      ...data,
                      address_attributes: {
                        ...data.address_attributes,
                        neighborhood: e.target.value,
                      },
                    }));
                  }}
                />
              </div>
            </div>
            <div className="flex w-full max-lg:flex-col lg:gap-6">
              <div className="lg:w-1/2">
                <TextField
                  name="street"
                  label="Logradouro"
                  className="rounded-xl"
                  value={data.address_attributes.street || ""}
                  onChange={(e) => {
                    setData((data) => ({
                      ...data,
                      address_attributes: {
                        ...data.address_attributes,
                        street: e.target.value,
                      },
                    }));
                  }}
                />
              </div>
              <div className="lg:w-1/2">
                <TextField
                  name="number"
                  label="Número"
                  className="rounded-xl"
                  value={data.address_attributes.number || ""}
                  onChange={(e) => {
                    setData((data) => ({
                      ...data,
                      address_attributes: {
                        ...data.address_attributes,
                        number: e.target.value,
                      },
                    }));
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {clinic && (
          <div className="mt-6 flex flex-col items-start gap-6 rounded-xl border border-coolGray-300 pb-6">
            <div className="flex w-full items-center gap-3 border-b border-coolGray-300 px-5 py-4">
              <UserCircleIcon className="size-6 text-secondary-500" />
              <div className="flex flex-col">
                <Text className="font-quickSand text-xl font-semibold text-coolGray-950">
                  Escolha aqui as áreas de atuação da Clínica
                </Text>
              </div>
            </div>

            <div className="flex w-full px-6 max-lg:flex-col lg:gap-6">
              <div className="lg:w-1/2">
                <SelectBox
                  options={yesOrNotOptions}
                  value={data.clinic_attributes.exam_enabled.toString()}
                  name="enable_budgets"
                  className="rounded-xl"
                  placeholder="Selecione uma opção"
                  label="Deseja receber pedidos de Exames Diagnósticos?"
                  onChange={(e) =>
                    setData((data) => ({
                      ...data,
                      clinic_attributes: {
                        ...data.clinic_attributes,
                        exam_enabled: e,
                      },
                    }))
                  }
                />
              </div>
            </div>

            <div className="flex w-full px-6 max-lg:flex-col lg:gap-6">
              <div className="lg:w-full">
                <SelectBox
                  options={data.work_specialties_options ?? []}
                  name="specialty_clinic"
                  className="rounded-xl"
                  placeholder="Selecione uma opção"
                  label="Selecione as Áreas de Atuação"
                  onChange={(e) => {
                    setSelectedSpecialty(e);
                  }}
                />
              </div>
            </div>

            <div className="flex w-full px-6 max-lg:flex-col lg:gap-6">
              <div className="lg:w-full">
                <Button
                  className="text-md transition-500 w-full rounded-2xl border bg-primary-500 font-poppins font-medium text-white transition-all hover:bg-blue-500 "
                  label="Adicionar Área de Atuação"
                  onClick={addSpecialty}
                />
              </div>
            </div>

            <div className="flex w-full px-6 max-lg:flex-col lg:gap-6">
              <div className="mt-4 text-center lg:w-full">
                <h4 className="mb-3">Áreas de Atuação Selecionadas:</h4>
                {specialtyArr.map((item) => (
                  <span key={item.value} className="text-md ml-1 mt-1 inline-flex items-center rounded-md bg-blue-50 px-2 py-1 font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                    {item.label}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex w-full items-center gap-3 border-b border-coolGray-300 px-5 py-4">
              <UserCircleIcon className="size-6 text-secondary-500" />
              <div className="flex flex-col">
                <Text className="font-quickSand text-xl font-semibold text-coolGray-950">
                  Dados da Clínica
                </Text>
              </div>
            </div>

            <div className="w-full px-6">
              <AddImageModal
                setOpen={setOpenClinicModal}
                open={openClinicModal}
                currentImage={clinic.image}
                onClickConfirm={() => updateClinicImage()}
                fileForm={fileFormClinic}
              />
              <div
                className="relative flex size-28 cursor-pointer items-center justify-center rounded-full border-2 border-secondary-400"
                onClick={() => setOpenClinicModal(true)}
              >
                <Avatar
                  name={clinic.name}
                  size="2xl"
                  className="-z-10 size-28"
                  avatarUrl={clinic.image}
                />
                <div className="absolute right-0 top-0 flex size-8 items-center justify-center rounded-full bg-secondary-400">
                  <CameraIcon className="size-5 text-white" />
                </div>
              </div>
            </div>

            <div className="flex w-full px-6 max-lg:flex-col lg:gap-6">
              <div className="lg:w-1/2">
                <TextField
                  label="Nome"
                  className="rounded-xl"
                  value={data.clinic_attributes.name || ""}
                  onChange={(e) =>
                    setData((data) => ({
                      ...data,
                      clinic_attributes: {
                        ...data.clinic_attributes,
                        name: e.target.value,
                      },
                    }))
                  }
                />
              </div>
              <div className="lg:w-1/2">
                <TextFieldMask
                  name="cnpj"
                  mask="99.999.999/9999-99"
                  label="CNPJ"
                  type="text"
                  className="rounded-xl"
                  value={data.clinic_attributes.cnpj || ""}
                  onChange={(e) =>
                    setData((data) => ({
                      ...data,
                      clinic_attributes: {
                        ...data.clinic_attributes,
                        cnpj: e.target.value,
                      },
                    }))
                  }
                />
              </div>
            </div>

            <div className="w-full px-6">
              <div className="flex w-full max-lg:flex-col lg:gap-6">
                <div className="lg:w-full">
                  <TextArea
                    label="Descrição"
                    placeholder="Escreva um pouco sobre você, sua carreira, suas conquistas, suas experiências, seus objetivos, como funciona sua consulta e/ou sobre seu comprometimento com seus pacientes"
                    className="h-48 rounded-xl"
                    value={data.clinic_attributes.description || ""}
                    onChange={(e) =>
                      setData((data) => ({
                        ...data,
                        clinic_attributes: {
                          ...data.clinic_attributes,
                          description: e.target.value,
                        },
                      }))
                    }
                  />
                </div>
              </div>
            </div>

            <div className="flex w-full px-6 max-lg:flex-col lg:gap-6">
              <div className="lg:w-1/2">
                <SelectBox
                  options={pixTypeOptions}
                  name="pix_type"
                  className="rounded-xl"
                  placeholder="Selecione o tipo da chave pix"
                  label="Tipo da Chave Pix"
                  value={data.clinic_attributes.pix_type || ""}
                  onChange={(e) => {
                    setData((data) => ({
                      ...data,
                      clinic_attributes: {
                        ...data.clinic_attributes,
                        pix_type: e,
                      },
                    }));
                  }}
                />
              </div>
              <div className="lg:w-1/2">
                <TextFieldMask
                  label="Chave Pix"
                  className="rounded-xl"
                  mask={pixTypeMask(data.clinic_attributes.pix_type)}
                  value={data.clinic_attributes.pix_key || ""}
                  onChange={(e) =>
                    setData((data) => ({
                      ...data,
                      clinic_attributes: {
                        ...data.clinic_attributes,
                        pix_key: e.target.value,
                      },
                    }))
                  }
                />
              </div>
            </div>
          </div>
        )}

        {user.role === "doctor" && (
          <div className="mt-6 flex flex-col items-start gap-6 rounded-xl border border-coolGray-300">
            <div className="flex w-full items-center gap-3 border-b border-coolGray-300 px-5 py-4">
              <UserCircleIcon className="size-6 text-secondary-500" />
              <div className="flex flex-col">
                <Text className="font-quickSand text-xl font-semibold text-coolGray-950">
                  Meu Perfil
                </Text>
                <Text className="font-quickSand font-regular text-sm text-coolGray-600">
                  Essas informações aparecerão para os pacientes usuários da plataforma.
                </Text>
              </div>
            </div>

            <div className="w-full px-6">
              <div className="flex w-full max-lg:flex-col lg:gap-6">
                <div className="lg:w-full">
                  <TextArea
                    label="Sobre mim"
                    placeholder="Escreva um pouco sobre você, sua carreira, suas conquistas, suas experiências, seus objetivos, como funciona sua consulta e/ou sobre seu comprometimento com seus pacientes"
                    className="h-48 rounded-xl"
                    value={data.doctor_attributes.description || ""}
                    onChange={(e) =>
                      setData((data) => ({
                        ...data,
                        doctor_attributes: {
                          ...data.doctor_attributes,
                          description: e.target.value,
                        },
                      }))
                    }
                  />
                </div>
              </div>
            </div>

            <div className="w-full border-y border-coolGray-300 px-6 py-4">
              <div className="flex w-full max-lg:flex-col lg:gap-6">
                <div className="lg:w-full">
                  <div className="flex flex-col gap-2">
                    <label className="text-md font-regular font-poppins text-coolGray-600">
                      Valor da consulta
                    </label>

                    <input
                      type="text"
                      placeholder="R$ 0,00"
                      className="rounded-xl border border-coolGray-300 px-4 py-3 text-lg"
                      value={
                        data.doctor_attributes?.price_cents
                          ? formatCurrency(String(data.doctor_attributes.price_cents))
                          : "R$ 0,00"
                      }
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

                    <span className="text-sm text-coolGray-500">
                      Sobre o valor informado, será cobrada uma taxa de 10% de operação.
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full border-y border-coolGray-300 px-6 py-4">
              <Text className="font-quickSand pb-3 text-lg font-semibold text-coolGray-900">
                Experiências Profissionais
              </Text>
              {data.doctor_attributes.professional_experiences.map((experience, index) => (
                <div className="flex w-full lg:gap-6" key={index}>
                  <div className="lg:w-full">
                    <TextField
                      placeholder="ex: Hospital Israelita Albert Einstein, internação particular"
                      className="rounded-xl"
                      value={experience || ""}
                      onChange={(e) => {
                        let dataCopy = data.doctor_attributes.professional_experiences;
                        dataCopy[index] = e.target.value;
                        setData((data) => ({
                          ...data,
                          doctor_attributes: {
                            ...data.doctor_attributes,
                            professional_experiences: dataCopy,
                          },
                        }));
                      }}
                    />
                  </div>
                  <div className="flex cursor-pointer items-center justify-center">
                    <XMarkIcon
                      className="size-6 hover:text-primary-400"
                      onClick={() => {
                        if (data.doctor_attributes.professional_experiences.length > 1) {
                          const new_array = data.doctor_attributes.professional_experiences;
                          new_array.splice(index, 1);
                          setData((data) => ({
                            ...data,
                            doctor_attributes: {
                              ...data.doctor_attributes,
                              professional_experiences: new_array,
                            },
                          }));
                        }
                      }}
                    />
                  </div>
                </div>
              ))}
              <Button
                onClick={() => {
                  setData((data) => ({
                    ...data,
                    doctor_attributes: {
                      ...data.doctor_attributes,
                      professional_experiences: [
                        ...data.doctor_attributes.professional_experiences,
                        "",
                      ],
                    },
                  }));
                }}
                icon={PlusIcon}
                iconSide="left"
                className="text-md transition-500 mt-3 rounded-2xl border border-primary-500 font-poppins font-medium text-primary-500 transition-all hover:bg-primary-50 lg:w-60"
                label={"Adicionar Experiência"}
              />
            </div>

            <div className="w-full border-y border-coolGray-300 px-6 py-4">
              <Text className="font-quickSand pb-3 text-lg font-semibold text-coolGray-900">
                Formações Acadêmicas
              </Text>
              {data.doctor_attributes.educational_history.map((experience, index) => (
                <div className="flex w-full lg:gap-6" key={index}>
                  <div className="lg:w-full">
                    <TextField
                      placeholder="ex: Hospital Israelita Albert Einstein, internação particular"
                      className="rounded-xl"
                      value={experience || ""}
                      onChange={(e) => {
                        let dataCopy = data.doctor_attributes.educational_history;
                        dataCopy[index] = e.target.value;
                        setData((data) => ({
                          ...data,
                          doctor_attributes: {
                            ...data.doctor_attributes,
                            educational_history: dataCopy,
                          },
                        }));
                      }}
                    />
                  </div>
                  <div className="flex cursor-pointer items-center justify-center">
                    <XMarkIcon
                      className="size-6 hover:text-primary-400"
                      onClick={() => {
                        if (data.doctor_attributes.educational_history.length > 1) {
                          const new_array = data.doctor_attributes.educational_history;
                          new_array.splice(index, 1);
                          setData((data) => ({
                            ...data,
                            doctor_attributes: {
                              ...data.doctor_attributes,
                              educational_history: new_array,
                            },
                          }));
                        }
                      }}
                    />
                  </div>
                </div>
              ))}
              <Button
                onClick={() => {
                  setData((data) => ({
                    ...data,
                    doctor_attributes: {
                      ...data.doctor_attributes,
                      educational_history: [...data.doctor_attributes.educational_history, ""],
                    },
                  }));
                }}
                icon={PlusIcon}
                iconSide="left"
                className="text-md transition-500 mt-3 rounded-2xl border border-primary-500 font-poppins font-medium text-primary-500 transition-all hover:bg-primary-50 lg:w-60"
                label={"Adicionar Formação"}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EditProfile;