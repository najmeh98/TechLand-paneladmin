import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { OwnProp } from "./ComponetnUploader";

export default function ProfileimgUploader({
  setImage,
  image,
  newImage,
}: OwnProp) {
  const onDrop = useCallback(
    (acceptedFiles: any) => {
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

      {image?.preview && image.preview?.length > 0 ? (
        <ImageCompt src={image?.preview} />
      ) : newImage !== undefined && newImage?.length > 0 ? (
        <ImageCompt src={newImage} />
      ) : (
        <ImageCompt src="/avator.png" />
      )}
    </div>
  );
}

export const ImageCompt = ({
  src,
  className,
}: {
  src: string;
  className?: string;
}): JSX.Element => {
  return (
    <img
      src={src}
      alt="..."
      width={`${className ? "w-full" : "130px"}`}
      height={`${className ? "300px" : "130px"}`}
      className={`${
        className
          ? className
          : "rounded-full shadow-md border-2 border-solid border-slate-300"
      }`}
    />
  );
};
