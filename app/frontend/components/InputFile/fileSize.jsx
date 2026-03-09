import { Text } from "@switchdreams/ui";
import React from "react";

const FileSize = ({ type, selectedFile }) => {
  if (!!selectedFile && !Array.isArray(selectedFile)) selectedFile = [selectedFile];

  const bytesToMegabytes = (bytes) => {
    return (bytes / (1024 * 1024)).toFixed(2);
  };

  return (
    <>
      {selectedFile && type !== "img" && (
        <Text size="xs" className="text-semibold absolute bottom-3 right-4 text-primary-600">
          {bytesToMegabytes(selectedFile[0].size) + "MB"}
        </Text>
      )}
    </>
  );
};

export default FileSize;
