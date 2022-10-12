import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import styled from "styled-components";
import { Column } from "./share/Container";

export interface OwnProp {
  setImage: (postInfo: string) => void;
  image: any;
  newImage?: any;
  height?: number;
}

export const ComponentUploader = ({
  setImage,
  image,
  newImage,
  height,
}: OwnProp): JSX.Element => {
  const [loading, setLoading] = useState<boolean>(false);

  const onDrop = useCallback(
    (acceptedFiles: any) => {
      // const url = URL.createObjectURL(acceptedFiles[0]);
      // console.log("url", url);
      // setPreImage(url);

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
  console.log("image", image);
  console.log("newImage", newImage);
  console.log("preimg", image.preview);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: false,
  });

  return (
    <DropZone
      {...getRootProps()}
      className="rounded-lg shadow-md "
      style={{ height: height }}
    >
      <input {...getInputProps()} />

      {image?.preview ? (
        <img
          src={image.preview}
          alt="image"
          width={100}
          height={200}
          className="rounded-lg"
        />
      ) : newImage ? (
        <img
          src={newImage}
          alt="image"
          width={100}
          height={200}
          className="rounded-lg"
        />
      ) : (
        <Column style={{ width: "100%" }}>
          <img
            src="/uploadImg.svg"
            alt="uploadImg"
            className="rounded-lg"
            style={{ maxWidth: "200px", height: "200px" }}
          />
          <p className="mt-0 text-gray-300"> Drag & Drop your image here </p>
        </Column>
      )}
    </DropZone>
  );
};

const DropZone = styled.div`
  border: 1px dashed #97bef4;
  /* rgb(57, 172, 212) */
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  img {
    width: 100%;
    min-height: 100%;
  }
`;
