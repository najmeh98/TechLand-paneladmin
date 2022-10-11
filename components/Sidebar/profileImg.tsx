import { useAppContext } from "../AppManag.tsx/AppContext";

export const ProfileImg = (): JSX.Element => {
  const { adminInfo } = useAppContext();

  const fullName: string = `${adminInfo?.name} ${adminInfo?.family}`;
  const date: string = `${adminInfo?.createdAt}`
    .slice(0, 10)
    .replace(/-/g, "/");

  return (
    <div className="flex items-center  ">
      <>
        {adminInfo?.image ? (
          <img
            src={adminInfo?.image}
            alt="profilImg"
            className="w-14 h-14 rounded-full"
          />
        ) : (
          <img src="/avator.png" alt="img" className="w-12 h-12 rounded-full" />
        )}
      </>
      <div className="pl-6">
        <p className="pb-1 m-0 text-lg">{fullName}</p>
        <p className="text-slate-400 m-0">{date}</p>
      </div>
    </div>
  );
};
