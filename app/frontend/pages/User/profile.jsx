import { useForm, usePage } from "@inertiajs/react";
import { Button, Text } from "@switchdreams/ui";
import React from "react";

import EditProfile from "@/components/ProfileSections/EditProfile";
import { useAlert } from "@/contexts/Alert";

const Profile = ({ area_options, clinic, work_specialties_options }) => {
  const { showAlert } = useAlert();
  const { currentUser } = usePage().props;
  const { setData, data, patch } = useForm({
    work_specialties_options: work_specialties_options,
    name: currentUser.name,
    cpf: currentUser.cpf,
    gender: currentUser.gender,
    phone: currentUser.phone,
    birthdate: currentUser.birthdate,
    doctor_attributes:
      currentUser.role === "doctor"
        ? {
            id: currentUser.doctor.id,
            price_cents: currentUser.doctor.price_cents,
            work_area_id: currentUser.doctor.work_area.id,
            work_specialty_id: currentUser.doctor.work_specialty.id,
            council: currentUser.doctor.council,
            description: currentUser.doctor.description,
            professional_experiences: currentUser.doctor.professional_experiences,
            educational_history: currentUser.doctor.educational_history,
          }
        : {},
    address_attributes: {
      cep: currentUser.address.cep,
      city: currentUser.address.city,
      state: currentUser.address.state,
      neighborhood: currentUser.address.neighborhood,
      street: currentUser.address.street,
      number: currentUser.address.number,
      latitude: currentUser.address.latitude,
      longitude: currentUser.address.longitude,
    },
    clinic_attributes: clinic,
  });

  const updateUser = () => {
    patch("perfil", {
      onSuccess: () => {
        showAlert({ message: "Dados atualizados com sucesso", type: "success" });
      },
      onError: (e) => {
        showAlert({ message: e, type: "warning" });
      },
    });
  };

  return (
    <>
      <div className="mt-4 w-full lg:mt-6 lg:px-40">
        <EditProfile
          user={currentUser}
          data={data}
          setData={setData}
          areaOptions={area_options}
          clinic={clinic}
        />
      </div>
      <div className="fixed bottom-0 flex w-full items-center justify-between border-t border-coolGray-300 bg-white py-3 lg:px-28 ">
        <Text className="text-md font-poppins font-medium text-coolGray-950 max-lg:hidden lg:px-14">
          Salvar alterações?
        </Text>
        <div className="flex gap-2 max-lg:w-full max-lg:items-center max-lg:justify-center lg:px-14">
          <Button
            label="Salvar alterações"
            className="flex w-40 rounded-2xl bg-primary-500 px-4 py-5 text-sm font-medium text-white duration-500 hover:bg-primary-600 max-lg:w-1/2"
            onClick={() => updateUser()}
          />
        </div>
      </div>
    </>
  );
};

export default Profile;
