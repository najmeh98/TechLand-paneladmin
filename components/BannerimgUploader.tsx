import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { BsCamera } from "react-icons/bs";
import { ImageCompt } from "./ProfileimgUploader";

export interface OwnProp {
  setbannerImage: (postInfo: string) => void;
  bannerimage: any;
  newbannerImage?: any;
  height?: number;
  className?: string;
}

export const BannerimgUploader = ({
  setbannerImage,
  bannerimage,
  newbannerImage,
  className,
}: OwnProp) => {
  const onDrop = useCallback(
    (acceptedFiles: any) => {
      console.log("files", acceptedFiles);

      setbannerImage(
        Object.assign(acceptedFiles[0], {
          preview: URL.createObjectURL(acceptedFiles[0]),
        })
      );
    },
    [setbannerImage]
  );

  console.log("newban", newbannerImage);
  console.log("ban", bannerimage);
  console.log("setban", setbannerImage);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: false,
  });

  return (
    <div {...getRootProps()} className="flex items-end z-0 justify-end  w-full">
      <input {...getInputProps()} />

      {bannerimage?.preview && bannerimage.preview?.length > 0 ? (
        <ImageCompt src={bannerimage?.preview} className={className} />
      ) : newbannerImage !== undefined && newbannerImage?.length > 0 ? (
        <ImageCompt src={newbannerImage} className={className} />
      ) : (
        <ImageCompt src="/img.jpeg" className={className} />
      )}

      <div className="relative -top-14 right-16  z-10 flex ">
        <BsCamera
          fontSize={42}
          className=" absolute text-white cursor-pointer  border border-solid border-[#f1eff4] p-[6px] rounded-md bg-bg-img hover:bg-bg-img-hover"
        />
      </div>
    </div>
  );
};
