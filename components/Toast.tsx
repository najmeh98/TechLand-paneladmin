import { Toastr, ToastrRef, ToastrProps } from "@paljs/ui/Toastr";
import React, { useRef, useState } from "react";
import { Theme, toast, ToastPosition } from "react-toastify";

// export default function Toast(): {
//   showToastr: (mode: string, message: string, title: string) => void;
//   toastrRef: React.RefObject<ToastrRef>;
// } {
//   const [data] = useState<ToastrProps>({
//     position: "topEnd",
//     duration: 3500,
//     hasIcon: true,
//     destroyByClick: true,
//     preventDuplicates: false,
//   });

//   const toastrRef = useRef<ToastrRef>(null);

//   const showToastr = (mode: string, message: string, title: string): void => {
//     console.log("done");
//     toastrRef.current?.add(message, title, { ...data, status: mode });
//   };

//   return { showToastr, toastrRef };
// }

export interface dataProp {
  position: ToastPosition | undefined;
  autoClose: number;
  hideProgressBar: boolean;
  closeOnClick: boolean;
  pauseOnHover: boolean;
  draggable: boolean;
  progress: undefined;
  theme: Theme | undefined;
}

export const Toaster = () => {
  const [data] = useState<dataProp>({
    position: "top-right",
    autoClose: 4000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });

  const showToastr = (status: string, text: string) => {
    switch (status) {
      case "Success":
        return toast.success(text, data);
        break;

      case "Error":
        return toast.error(text, data);
        break;
      default:
        break;
    }
  };

  return { showToastr };
};
