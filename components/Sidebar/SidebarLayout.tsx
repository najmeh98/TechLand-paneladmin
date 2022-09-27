import React, { ReactNode } from "react";

export default function SidebarLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative  !z-10  flex flex-col items-center  w-full justify-center shadow-2xl">
      <div className="absolute -top-20 rounded-sm !z-30 bg-white w-7 h-7 rotate-45  scale-x-100 scale-y-100 translate-x-1 translate-y-1 skew-x-1 skew-y-1   left-7" />

      <div
        className="fixed py-4 px-4 bottom-20 left-2 w-full bg-white  rounded-lg border border-solid border-slate-200"
        style={{ maxWidth: "300px" }}
      >
        {children}
      </div>
    </div>
  );
}
