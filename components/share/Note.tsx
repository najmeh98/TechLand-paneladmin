import { ArrowIcon } from "../icons/Icon";

interface OwnProp {
  children: React.ReactNode;
}
export const Note = ({ children }: OwnProp): JSX.Element => {
  return (
    <div
      className=" absolute -right-16 flex items-end   w-full   !z-10  "
      style={{ maxWidth: "160px" }}
    >
      <ul className="pl-0 my-2 cursor-pointer bg-white rounded w-40 flex flex-col items-start  justify-between shadow-md border border-solid ran border-slate-200 ">
        {children}
      </ul>
      <ArrowIcon
        fill="#fff"
        style={{
          height: "20",
          width: "20",
          top: "-5px",
          left: "calc(65px)",
          filter: "drop-shadow(rgb(207, 217, 222) 1px -1px 1px)",
          position: "absolute",
        }}
      />
    </div>
  );
};
