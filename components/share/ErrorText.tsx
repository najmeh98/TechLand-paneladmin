import { ReactNode } from "react";
import { FiAlertTriangle } from "react-icons/fi";
export const ErrorText = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex items-center justify-start">
      <FiAlertTriangle fontSize={18} color="#dc2626" />
      <p className="text-red-600 text-lg font-bold m-0 pl-2">{children}</p>
    </div>
  );
};
