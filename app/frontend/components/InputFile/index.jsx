import React, { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";

import DefaultMessage from "./defaultMessage";
import DeleteFile from "./deleteFile";
import FileInfos from "./fileInfos";
import FileSize from "./fileSize";

const InputFile = ({
  type = "doc",
  initialValue = null,
  dataAttribute,
  setData,
  multiple = false,
  currentImage,
  ...rest
}) => {
  const [selectedFile, setSelectedFile] = useState(initialValue);

  useEffect(() => {
    if (setData) setData(dataAttribute, selectedFile);
  }, [selectedFile]);

  const onDrop = useCallback((acceptedFiles) => {
    setSelectedFile(multiple ? acceptedFiles : acceptedFiles[0]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const componentPaddingClassName = () => {
    if (selectedFile && type != "img") return "px-3 py-16";
    if (selectedFile == null || selectedFile.length == 0) return "px-3 py-16";
  };

  const componentBackgroundClassName = () => {
    if (isDragActive) return "border-secondary-400 bg-secondary-50";
    else return "border-primary-100 hover:bg-primary-50";
  };

  const input_params = () => {
    if (type == "img") {
      return { accept: "image/*" };
    } else {
      return {};
    }
  };

  return (
    <div
      className={`relative flex w-full cursor-pointer flex-col items-center justify-between overflow-hidden rounded border-2 border-dashed ${componentPaddingClassName()} ${componentBackgroundClassName()}`}
      {...getRootProps()}
    >
      <input {...getInputProps(input_params())} multiple={"multiple"} {...rest} />

      {selectedFile == null || selectedFile.length == 0 ? (
        <DefaultMessage isDragActive={isDragActive} type={type} currentImage={currentImage} />
      ) : (
        <>
          <FileInfos type={type} selectedFile={selectedFile} />
          <DeleteFile setSelectedFile={setSelectedFile} />
          <FileSize type={type} selectedFile={selectedFile} />
        </>
      )}
    </div>
  );
};

export default InputFile;
