import { Transition } from "@headlessui/react";
import { usePage } from "@inertiajs/react";
import { Toast } from "@switchdreams/ui";
import React, { createContext, useEffect, useState } from "react";

const alertContextDefaultValue = {
  showAlert: () => {},
};

export const AlertContext = createContext(alertContextDefaultValue);

export const AlertProvider = ({ children }) => {
  const [content, setContent] = useState({
    title: "",
    message: "",
    type: "error",
  });
  const [isOpen, setIsOpen] = useState(false);

  /**
   * Displays an alert with specified message, title, and type.
   * @param {Object} options - Options for displaying the alert.
   * @param {string} options.message - The alert message.
   * @param {?string} options.title - The alert title (optional).
   * @param {("primary"|"success"|"warning"|"error")} [options.type="error"] - The alert type (optional, default: "error").
   * @returns {void}
   */
  const showAlert = ({ message, title = null, type = "error" }) => {
    setContent({
      title,
      message,
      type,
    });
    if (message !== "") {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        setIsOpen(false);
      }, 5000);
    }
  }, [isOpen]);

  const { errors } = usePage().props;

  useEffect(() => {
    if (errors) showAlert({ message: errors });
  }, [errors]);

  return (
    <AlertContext.Provider
      value={{
        showAlert,
      }}
    >
      <Transition
        show={isOpen}
        enter="transition-opacity duration-75"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-150"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="fixed right-4 top-4 z-50">
          <Toast
            color={content.type}
            message={content.message}
            onClose={() => setIsOpen(false)}
            title={content.title}
            variant="tonal"
          />
        </div>
      </Transition>
      {children}
    </AlertContext.Provider>
  );
};

export const useAlert = () => {
  const context = React.useContext(AlertContext);
  if (context === undefined) {
    throw new Error("useAlert must be used within a AlertProvider");
  }
  return context;
};
