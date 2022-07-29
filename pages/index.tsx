import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAppContext } from "../components/AppManag.tsx/AppContext";
import { Layout } from "../components/register/Layout";
import { RegisterHeader } from "../components/register/RegisterHeader";
import { SidebarOption } from "../components/Sidebar/SidebarOption";
import styles from "../styles/Home.module.css";
import Step1 from "./auth/register";

const Home: NextPage = () => {
  const { logout } = useAppContext();
  const router = useRouter();
  useEffect(() => {
    const token = localStorage.getItem("admintoken");
    const email = localStorage.getItem("adminemail");

    if (!token && !email) {
      router.push("/auth/register");
      return;
    }
  }, [logout, router]);

  return (
    <>
      <SidebarOption />
    </>
  );
};

export default Home;
