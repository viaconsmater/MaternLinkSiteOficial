import { XMarkIcon } from "@heroicons/react/24/outline";
import React from "react";

const DeleteFile = ({ setSelectedFile }) => {
  const handleRemoveFile = (event) => {
    event.preventDefault();
    setSelectedFile(null);
  };

  return (
    <>
      <div className="absolute right-3 top-3">
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleRemoveFile(e);
          }}
          className="size-5 border-none bg-transparent p-0 text-primary-800"
        >
          <XMarkIcon className="size-5 text-primary-800" />
        </button>
      </div>
    </>
  );
};

export default DeleteFile;
