import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Dashboard from "../components/Dashboard";

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
