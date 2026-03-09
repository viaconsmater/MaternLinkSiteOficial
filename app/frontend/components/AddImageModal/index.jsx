import React from "react";

import InputFile from "../InputFile/index";
import Modal from "../Modal";

const AddImageModal = ({ open, setOpen, currentImage, onClickConfirm, fileForm }) => {
  return (
    <Modal
      modalOpen={open}
      open={open}
      setOpen={setOpen}
      onClickCancel={() => setOpen(false)}
      cancelLabel="Cancelar"
      confirmLabel="Editar"
      onClickConfirm={() => onClickConfirm()}
    >
      <div className="mt-8">
        <InputFile
          type="img"
          dataAttribute={"image"}
          setData={fileForm.setData}
          currentImage={currentImage}
        />
      </div>
    </Modal>
  );
};

export default AddImageModal;
