import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAppContext } from "../components/AppManag.tsx/AppContext";
import Dashboard from "../components/Dashboard";
import { Layout } from "../components/register/Layout";
import { RegisterHeader } from "../components/register/RegisterHeader";
import { SidebarOption } from "../components/Sidebar/SidebarOption";
import styles from "../styles/Home.module.css";
import Step1 from "./auth/register";
import { useDropzone } from "react-dropzone";

const Home: NextPage = () => {
  const router = useRouter();

  useEffect(() => {
    if (typeof window == "object") {
      if (window.localStorage.getItem("$adnTK") === null) {
        router.push("/auth/loginByEmail");
        return;
      }
    }
  }, [router]);

  return (
    <>
      <Dashboard />
    </>
  );
};

export default Home;
