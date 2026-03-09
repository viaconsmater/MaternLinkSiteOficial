import { Text } from "@switchdreams/ui";
import React from "react";

import { imagePath } from "@/utils";

const DefaultMessage = ({ isDragActive, type, currentImage }) => {
  const textClassName = (isDragActive) => {
    if (isDragActive) return "text-secondary-400 font-semibold";
  };

  const currentImagePath = () => {
    if (currentImage) {
      return currentImage;
    } else {
      return isDragActive ? imagePath("img_icon_blue.svg") : imagePath("img_icon.svg");
    }
  };

  return (
    <>
      {type != "img" ? (
        <img
          src={isDragActive ? imagePath("pdf_icon_blue.svg") : imagePath("pdf_icon.svg")}
          alt="pdf_icon"
          className="object-cover pb-4"
        />
      ) : (
        <img src={currentImagePath()} alt="img_icon" className="h-56 w-auto object-cover pb-4" />
      )}
      <Text size="md" className={`text-primary-700 ${textClassName(isDragActive)}`}>
        Adicione uma imagem
      </Text>
      <Text
        size="sm"
        className={`text-primary-500 ${textClassName(isDragActive)} text-center font-normal`}
      >
        Selecione o arquivo ou arraste e solte aqui
      </Text>
    </>
  );
};

export default DefaultMessage;
