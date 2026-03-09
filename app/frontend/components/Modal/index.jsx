import "react-spring-bottom-sheet/dist/style.css";

import { XMarkIcon } from "@heroicons/react/24/solid";
import { Button } from "@switchdreams/ui";
import React from "react";
import { BottomSheet } from "react-spring-bottom-sheet";

const Modal = ({
  confirmLabel,
  cancelLabel,
  children,
  onClickCancel,
  onClickConfirm,
  open,
  setOpen,
  cancelOutline = true,
  confirmOutline,
  iconConfirm,
  error,
  padding = true,
  loading = false,
  buttons = true,
  onClose = null,
}) => {
  const handleClose = () => {
    setOpen(false);
    if (onClose) {
      onClose();
    }
  };
  const handleDismiss = () => {
    handleClose();
  };

  return (
    <>
      <div
        className={`fixed right-0 top-0 z-50 h-full w-screen bg-gray-500 opacity-40 max-md:hidden ${
          !open && "hidden"
        }`}
        onClick={() => {
          setOpen(!open);
          if (onClose) {
            onClose();
          }
        }}
      />
      <div
        className={`fixed left-1/2 top-1/2 z-[99999] h-auto min-w-[40rem] max-w-[52rem] -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white max-md:hidden ${
          !open && "hidden"
        }`}
      >
        <div className={`relative z-50 size-full gap-12 ${padding && "p-5"}`}>
          <XMarkIcon
            className="absolute right-4 top-4 size-6 cursor-pointer text-gray-500"
            onClick={() => {
              setOpen(!open);
              if (onClose) {
                onClose();
              }
            }}
          />
          <div className="h-fit">{children}</div>
          {buttons && (
            <div className="mt-8 flex gap-4">
              <Button
                label={cancelLabel}
                onClick={onClickCancel}
                className={`w-full border ${
                  error
                    ? "border-gray-400 bg-white text-gray-400 hover:bg-gray-300"
                    : "text-primary-500"
                } rounded-lg py-3 ${cancelOutline && "btn-outline"} ${!cancelLabel && "hidden"}`}
              />
              <Button
                label={confirmLabel}
                className={`w-full ${
                  error ? "bg-error-500 hover:bg-error-400" : "bg-primary-500"
                } rounded-lg py-3 text-white ${confirmOutline && "btn-outline"} ${!confirmLabel && "hidden"}`}
                onClick={onClickConfirm}
                iconSide="left"
                disabled={loading}
                icon={iconConfirm && iconConfirm}
              />
            </div>
          )}
        </div>
      </div>
      {/* Mobile */}
      <BottomSheet
        className="z-50 bg-white md:hidden"
        open={open}
        onDismiss={handleDismiss}
        onOutsideClick={handleClose}
        snapPoints={({ maxHeight }) => [maxHeight * 0.75]}
      >
        <div className="flex flex-col items-center gap-4 p-8">
          <div className="h-fit min-h-[25rem]">{children}</div>
          {buttons && (
            <div className="mt-5 flex w-full flex-col gap-2 max-md:p-1">
              <Button
                label={cancelLabel}
                onClick={onClickCancel}
                className={`btn-outline w-full border border-primary-500 py-3 text-primary-500 ${
                  error
                    ? "border-gray-400 bg-white text-gray-400 hover:bg-gray-300"
                    : "text-primary-500"
                } ${!cancelLabel && "hidden"}`}
              />
              <Button
                label={confirmLabel}
                className={`"w-full py-3 text-white ${
                  error ? "bg-error-500 hover:bg-error-400" : "bg-primary-500"
                } ${!confirmLabel && "hidden"}`}
                iconSide="left"
                icon={iconConfirm && iconConfirm}
                onClick={onClickConfirm}
                disabled={loading}
              />
            </div>
          )}
        </div>
      </BottomSheet>
    </>
  );
};

export default Modal;
