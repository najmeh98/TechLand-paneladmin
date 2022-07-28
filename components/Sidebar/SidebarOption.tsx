import { useRouter } from "next/router";
import { GoHome } from "react-icons/go";
import { FaRegUser } from "react-icons/fa";
import styled from "styled-components";
import { FaBars } from "react-icons/fa";
import { FiUsers } from "react-icons/fi";
import { useTheme } from "../Context/ThemeContext";
import { IoSettingsOutline } from "react-icons/io5";
import { MdExitToApp } from "react-icons/md";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { config } from "../Api";
import { ThemedText } from "../ThemedText";
import { SidebarItem } from "./SidebarItem";
import { useHover } from "../utils/use-hover";
import { SidebarMenu } from "./SidebarMenu";
import { FiPaperclip } from "react-icons/fi";
import { useAppContext } from "../AppManag.tsx/AppContext";
export type itemProp = {
  title: string | undefined;
  icon?: JSX.Element;
  path?: string;
  subRoutes?: itemProp[];
};

const Items: itemProp[] = [
  {
    title: "Dashboard",
    icon: <GoHome />,
    path: "/dashboard",
  },
  {
    title: "Users",
    icon: <FiUsers />,
    // path: "/users",
    subRoutes: [
      {
        title: "User manage",
        icon: <FaRegUser />,
        path: "/users/userManage",
      },
      {
        title: "User Info",
        icon: <FiPaperclip />,
        path: "/users/userInfo",
      },
    ],
  },

  {
    title: "Setting",
    icon: <IoSettingsOutline />,
    path: "/admin/profileadmin",
  },

  {
    title: "Exit",
    icon: <MdExitToApp />,
    // path: "/exit",
  },
];

export const SidebarOption = (): JSX.Element => {
  const [loading, setLoading] = useState<boolean>(false);
  const [isOpen, setisOpen] = useState<boolean>(false);

  const [hovered, hoverListener] = useHover();

  let router = useRouter();
  let t = useTheme();

  console.log(useAppContext());

  const { logout } = useAppContext();

  const toggle = (): void => {
    setisOpen(!isOpen);
  };

  return (
    <Wrapper
      style={{
        borderLeft: "1px solid t.color.titleColor",
        boxShadow: t.boxShadowbox,
        fontSize: t.fontSize.normal,
        fontWeight: t.fontWeight.bold,
        backgroundImage:
          "linear-gradient(to bottom, #06162d, #163655, #235b7f, #2e82aa, #39acd4)",
        width: isOpen ? "250px" : "60px",
      }}
      onMouseEnter={() => {
        setisOpen(true);
      }}
      onMouseLeave={() => {
        setisOpen(false);
      }}
    >
      <Navbar
        style={{
          height: "50px",
          display: " flex",
          padding: "13px",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottom: "1px solid #7a7a7a30",
          cursor: "pointer",
          color: t.color.titleColor,
        }}
      >
        <FaBars color="#fff" />
      </Navbar>

      {Items?.map((item: itemProp, index: number) => {
        return (
          <SidebarItem
            key={index}
            style={{
              display: isOpen ? "flex" : "none",
            }}
            onClick={() => {
              if (item.title === "Exit") {
                logout();
                router.push("/auth/loginByEmail");
              }
              if (item?.path == undefined) {
                return;
              } else {
                router.push(item?.path as string);
              }
            }}
            isOpen={isOpen}
            {...item}
          />
        );
      })}
    </Wrapper>
  );
};

const Wrapper = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 1px 11px hsl(0deg 0% 66% / 27%);
  animation: 1s ease 0s 1 normal none running fadeIn;
  transition: all 0.5s;
  height: 100vh;
  overflow: hidden;
  gap: 10px;
  top: 0px;
  bottom: 0;
  right: 0;
  z-index: 1;
  margin: 0;
  padding: 0;
  position: sticky;
`;

const Navbar = styled.div`
  width: 93%;
`;
