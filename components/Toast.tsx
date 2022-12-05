import React, { useRef, useState } from "react";
import { Theme, toast, ToastPosition } from "react-toastify";

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
