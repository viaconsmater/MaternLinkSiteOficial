import { EyeIcon, EyeSlashIcon, KeyIcon } from "@heroicons/react/24/outline";
import { useForm, usePage } from "@inertiajs/react";
import { Button, CheckBox, Spinner, Text, TextField } from "@switchdreams/ui";
import React, { useState } from "react";

import ConfigurationsSidebar from "@/components/ConfigurationPagesSidebar";
import { useAlert } from "@/contexts/Alert";

export const Password = ({ type }) => {
  const { currentUser } = usePage().props;
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmShowNewPassword] = useState(false);
  const { setData, data, patch, processing } = useForm({
    current_password: "",
    new_password: "",
    confirm_new_password: "",
    end_sessions: false,
  });
  const { showAlert } = useAlert();

  const updatePassword = () => {
    patch("/configurations/password", {
      onError: (e) => {
        showAlert({ message: e });
      },
      onSuccess: () => {
        showAlert({ message: "Senha trocada com sucesso!", type: "success" });
      },
    });
  };

  return (
    <div className="flex w-screen justify-between max-lg:flex-col max-lg:items-center max-lg:justify-center lg:px-20 xl:px-48">
      <ConfigurationsSidebar type={type} page_name="password" currentUser={currentUser} />
      <div className="mt-10 w-full px-4 lg:px-12 ">
        <div className="flex items-center gap-3">
          <KeyIcon className="size-6 text-gray-500" />
          <Text size="sm" className="text-gray-600">
            TROCAR SENHA
          </Text>
        </div>
        <div className="flex flex-col pt-8 lg:pl-9">
          <form
            className="w-full"
            onSubmit={(event) => {
              event.preventDefault();
              updatePassword();
            }}
          >
            <TextField
              label="Senha atual"
              placeholder="Insira sua senha atual"
              type={showCurrentPassword ? "text" : "password"}
              rightIcon={showCurrentPassword ? EyeIcon : EyeSlashIcon}
              onClickIcon={() => setShowCurrentPassword(!showCurrentPassword)}
              value={data.current_password}
              onChange={(e) => setData("current_password", e.target.value)}
            />
            <div className="flex w-full gap-4">
              <div className="w-1/2">
                <TextField
                  label="Nova senha"
                  placeholder="Digite uma nova senha"
                  type={showNewPassword ? "text" : "password"}
                  rightIcon={showNewPassword ? EyeIcon : EyeSlashIcon}
                  onClickIcon={() => setShowNewPassword(!showNewPassword)}
                  value={data.new_password}
                  onChange={(e) => setData("new_password", e.target.value)}
                  required
                />
              </div>
              <div className="w-1/2">
                <TextField
                  label="Repita a nova senha"
                  placeholder="Digite a nova senha novamente"
                  type={showConfirmNewPassword ? "text" : "password"}
                  rightIcon={showConfirmNewPassword ? EyeIcon : EyeSlashIcon}
                  onClickIcon={() => setShowConfirmShowNewPassword(!showConfirmNewPassword)}
                  value={data.confirm_new_password}
                  onChange={(e) => setData("confirm_new_password", e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="flex items-center gap-4 pt-5">
              <CheckBox
                className="border-gray-200"
                role="checkbox"
                value={data.end_sessions}
                onChange={(e) => setData("end_sessions", e.target.checked)}
              />
              <div className="flex gap-1.5">
                <Text size="sm" className="pb-1 font-light text-gray-600">
                  Encerrar todas as sessões ativas
                </Text>
              </div>
            </div>
            <input type="submit" className="hidden" />
          </form>
          {processing && (
            <div className="flex w-full justify-center py-4">
              <Spinner />
            </div>
          )}
          <Button
            className="flex w-40 rounded-2xl bg-primary-500 px-4 py-5 text-sm font-medium text-white duration-500 hover:bg-primary-600 max-lg:w-1/2"
            label="Trocar senha"
            onClick={() => updatePassword()}
            disabled={processing}
          />
        </div>
      </div>
    </div>
  );
};

export default Password;
