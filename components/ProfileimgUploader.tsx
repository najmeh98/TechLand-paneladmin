import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import styled from "styled-components";
import { OwnProp } from "./ComponetnUploader";

// interface profileImg extends Omit<OwnProp, "newImage"> {}

export default function ProfileimgUploader({
  setImage,
  image,
  newImage,
}: OwnProp) {
  console.log("img", newImage);
  const onDrop = useCallback(
    (acceptedFiles: any) => {
      console.log("files", acceptedFiles);

      setImage(
        Object.assign(acceptedFiles[0], {
          preview: URL.createObjectURL(acceptedFiles[0]),
        })
      );
      // setImage(acceptedFiles[0]);
    },
    [setImage]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: false,
  });

  return (
    <div
      {...getRootProps()}
      className="flex items-center  justify-center w-full"
    >
      <input {...getInputProps()} />

      {image.preview && image.preview?.length > 0 ? (
        <img
          src={image.preview}
          alt="img"
          width={100}
          height={100}
          className="rounded-full shadow-md border border-solid border-slate-300"
        />
      ) : (
        <img
          src={newImage}
          alt="image"
          width={100}
          height={100}
          className="rounded-full shadow-md border border-solid border-slate-300"
        />
      )}

      {/* {
        <img
          src={image.preview || newImage}
          alt="image"
          width={100}
          height={100}
          className="rounded-full shadow-md border border-solid border-slate-300"
        />
      } */}

      {image === null && newImage === null && (
        <img
          src="/avator.png"
          alt="img"
          width={100}
          height={100}
          className="rounded-full shadow-md border border-solid border-slate-300"
        />
      )}
    </div>
  );
}
