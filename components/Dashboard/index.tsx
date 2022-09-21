import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { SidebarOption } from "../Sidebar/SidebarOption";
import { FiUsers } from "react-icons/fi";
import { useTheme } from "../Context/ThemeContext";
import { DashboardMain } from "./DashboardMain";
import { useAppContext } from "../AppManag.tsx/AppContext";
import axios, { AxiosError } from "axios";
import { config } from "../Api";
import { VscPreview } from "react-icons/vsc";
import { useRouter } from "next/router";

export default function Dashboard(): JSX.Element {
  const t = useTheme();
  const { adminInfo } = useAppContext();
  const [count, setCount] = useState<object | any>({});
  const [loading, setLoading] = useState<boolean>(false);

  const token: string = adminInfo?.token;
  const router = useRouter();

  useEffect(() => {
    setLoading(true);
    axios
      .post(
        `${config.apiUrl}/api/data/count`,
        {},
        {
          headers: {
            authorization: token as string,
          },
        }
      )
      .then((res) => {
        console.log(res);
        console.log("count", res.data);
        setLoading(false);

        if ((res?.status as number) == 200) {
          setCount(res.data);
        } else {
        }
      })
      .catch((error) => {
        setLoading(false);
        const err = error as AxiosError;
        if (err?.response?.status == 400) {
          //  count error
        } else {
          //server error
        }
      });
  }, [token]);

  return (
    <div style={{ display: "flex", alignItems: "flex-start" }}>
      <SidebarOption />

      <ContaineRow>
        <Container>
          <DashboardMain
            icon={<FiUsers fontSize={30} />}
            title="Total Users"
            count={count?.userCount}
            text="Add new admin"
            onClick={() => router.push("admin/adminCreate")}
          />
          <DashboardMain
            icon={<VscPreview fontSize={30} />}
            title="Total Posts"
            count={count?.postCount}
            prop="New user noted every week"
          />

          <DashboardMain
            icon={<VscPreview fontSize={30} />}
            title=" Post Create"
            count={count?.postCount}
            text="Add new post"
            onClick={() => router.push("/post/postCreate")}
          />
        </Container>
      </ContaineRow>
    </div>
  );
}

const MainWrapper = styled.div`
  margin: auto;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  overflow-y: auto;
  overflow-x: hidden;
`;

const ContaineRow = styled.div`
  max-width: 1300px;
  margin: 50px auto;
  padding: 10px;
  width: 100%;
  /* border: 1px solid rgb(230, 235, 235); */
`;

const Container = styled.div`
  display: grid;
  align-items: center;
  grid-gap: 20px;
  grid-template-columns: repeat(3, 1fr);
  width: 100%;
`;

const CardStyle = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding: 15px;
  border-radius: 15px;
  flex-direction: column;
  /* align-items: flex-start; */
  box-shadow: rgb(0 0 0 / 10%) 0px 0px 5px;
  /* width: 370px; */
  /* height: 300px; */
`;

const Main = styled.div`
  width: 100%;
  height: 100vh;
  max-width: 1100px;
  display: flex;
  margin: auto;
  align-items: center;
  justify-content: space-between;
`;
