import { Text } from "@switchdreams/ui";
import React from "react";

import { imagePath } from "@/utils";

const FileInfos = ({ type, selectedFile }) => {
  if (!!selectedFile && !Array.isArray(selectedFile)) selectedFile = [selectedFile];

  return (
    <>
      {/*TODO: display selected images if input is multiple*/}
      {type != "img" ? (
        <>
          <img src={imagePath("pdf_icon.svg")} alt="pdf_icon" className="pb-4" />
          {selectedFile.map((file, index) => {
            return (
              <Text
                size="md"
                key={index}
                className="max-w-full truncate pt-px text-center text-primary-700"
              >
                {file.path}
              </Text>
            );
          })}
        </>
      ) : (
        <div className="flex min-h-56 w-2/6 items-center justify-center">
          <img
            src={URL.createObjectURL(selectedFile[0])}
            alt="Imagem Selecionada"
            className="h-56 w-auto object-cover"
          />
        </div>
      )}
    </>
  );
};

export default FileInfos;
