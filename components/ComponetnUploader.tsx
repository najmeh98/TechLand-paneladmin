import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import styled from "styled-components";
import { Column } from "./share/Container";
import { CardStyle } from "./utils/CardStyle";

interface OwnProp {
  setImage: (postInfo: string) => void;
  image: any;
  newImage?: any;
}

export const ComponentUploader = ({
  setImage,
  image,
  newImage,
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
    <DropZone {...getRootProps()}>
      <input {...getInputProps()} />
      {newImage.preview ? (
        <img src={newImage.preview} alt="image" width={100} height={200} />
      ) : <img
          src={image.preview || image}
          alt="image"
          width={100}
          height={200}
        /> ? (
        <Column style={{ width: "100%" }}>
          <img
            src="/uploadImg.svg"
            alt="upload img"
            style={{ maxWidth: "200px", height: "200px" }}
          />
          <p className="mt-0 text-gray-300"> Drag & Drop your image here </p>
        </Column>
      ) : (
        ""
      )}
    </DropZone>
  );
};

const DropZone = styled.div`
  border: 2px dashed #97bef4;
  /* rgb(57, 172, 212) */
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  img {
    /* padding: 10px 0px; */
    width: 100%;
    /* height: 50%; */
  }
`;
