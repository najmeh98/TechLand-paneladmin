import { useRouter } from "next/router";
import styled from "styled-components";
import { FaBars } from "react-icons/fa";
import { useTheme } from "../Context/ThemeContext";
import { SidebarItem } from "./SidebarItem";
import { useHover } from "../utils/use-hover";
import { useAppContext } from "../AppManag.tsx/AppContext";
import {
  Account,
  AdminIcon,
  FullAdminIcon,
  FullHome,
  FullistofItem,
  FullSaveList,
  FullWritepost,
  Home,
  ListofItem,
  SaveList,
  Signout,
  Writepost,
} from "../icons/Icon";
import { SidebarMenu } from "./SidebarMenu";
// import { SlLock } from "react-icons/sl";
import { FormItem } from "../share/Container";
import { useState } from "react";
import SidebarLayout from "./SidebarLayout";

export type itemProp = {
  title: string | undefined;
  icon?: JSX.Element;
  fullIcon?: JSX.Element;
  path?: string;
  subRoutes?: itemProp[];
};

const Items: itemProp[] = [
  {
    title: "Home",
    icon: <Home />,
    fullIcon: <FullHome />,
    path: "/",
  },
  {
    title: "List",
    icon: <SaveList />,
    fullIcon: <FullSaveList />,
    path: "/category/listofCategory",
  },
  {
    title: "Stories",
    icon: <ListofItem />,
    fullIcon: <FullistofItem />,
    path: "/post/listofPost",
  },
  {
    title: "Admin",
    path: "/admin/adminCreate",
    icon: <AdminIcon />,
    fullIcon: <FullAdminIcon />,
  },
  {
    title: "Write",
    icon: <Writepost />,
    fullIcon: <FullWritepost />,
    path: "/post/postCreate",
  },
];

export const SidebarOption = (): JSX.Element => {
  const [loading, setLoading] = useState<boolean>(false);
  const [show, setShow] = useState<boolean>(false);

  const [hovered, hoverListener] = useHover();

  let router = useRouter();
  let t = useTheme();

  console.log(useAppContext());

  const { logout, adminInfo } = useAppContext();

  const toggle = (): void => {
    setShow(!show);
  };

  console.log("info", adminInfo);
  console.log("img", adminInfo?.image);

  const fullName: string = `${adminInfo?.name} ${adminInfo?.family}`;

  const profile: JSX.Element = (
    <>
      {adminInfo?.image ? (
        <img
          src={adminInfo?.image}
          alt="profilImg"
          className="w-14 h-14 rounded-full"
        />
      ) : (
        <img src="./avator.png" alt="img" className="w-12 h-12 rounded-full" />
      )}
    </>
  );

  return (
    <Wrapper
      style={{
        boxShadow: t.boxShadowbox,
        fontSize: t.fontSize.normal,
        fontWeight: t.fontWeight.bold,
        backgroundImage:
          "linear-gradient(to bottom, #06162d, #163655, #235b7f, #2e82aa, #39acd4)",
        width: "100px",
      }}
      className="justify-between flex flex-col items-center left-0 gap-3  overflow-x-hidden overflow-y-scroll top-0 bottom-0 m-0 h-screen sticky"
      // onMouseEnter={() => {
      //   setisOpen(true);
      // }}
      // onMouseLeave={() => {
      //   setisOpen(false);
      // }}
    >
      <div className="flex  items-center justify-center py-10 w-full">
        <FaBars color="#fff" fontSize={22} />
      </div>

      <div className="w-full block flex-col items-center justify-center">
        {Items?.map((item: itemProp, index: number) => {
          return (
            <SidebarItem
              key={index}
              isActive={router.pathname === item.path}
              onClick={() => {
                if (item?.path == undefined) {
                  return;
                } else {
                  router.push(item?.path as string);
                }
              }}
              {...item}
            />
          );
        })}
      </div>

      <div
        className="w-full  relative flex  flex-col items-center justify-center border border-black my-6 mx-2 cursor-pointer"
        onClick={toggle}
      >
        {/*  show profile image */}
        {profile}

        {show && (
          <SidebarLayout>
            <SidebarMenu
              className="text-black p-4"
              label={
                <FormItem>
                  <h3 className="m-0 pb-2">{fullName}</h3>
                  <p className="m-0 text-slate-400 font-light">{`@${adminInfo?.name}`}</p>
                </FormItem>
              }
              icon={<div className=" rounded-full block  mr-3">{profile}</div>}
              onClick={() => router.push("/admin/adminProfile")}
            />

            <hr className=" ml-0 mr-3  border-gray-300 border-t-0 border-solid" />

            <SidebarMenu
              className="text-black p-3"
              label="Account Setting"
              icon={<Account />}
              onClick={() => router.push("/admin/adminProfile")}
            />

            <SidebarMenu
              className="text-black p-3"
              label="Password"
              // icon={<SlLock />}
              onClick={() => router.push("/admin/changePassword")}
            />

            <hr className=" ml-0 mr-3  border-gray-300 border-t-0 border-solid" />

            <SidebarMenu
              className="text-black p-3"
              label="Log out"
              onClick={() => {
                logout();
                router.push("/auth/loginByEmail");
              }}
              icon={<Signout />}
            />
          </SidebarLayout>
        )}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  box-shadow: 0 1px 11px hsl(0deg 0% 66% / 27%);
  animation: 1s ease 0s 1 normal none running fadeIn;
  transition: all 0.5s;
`;
