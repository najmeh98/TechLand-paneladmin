import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { config } from "../../components/Api";
import React from "react";
import { useTheme } from "../../components/Context/ThemeContext";
import { FlexRow } from "../../components/share/Container";
import axios, { AxiosError } from "axios";
import styled from "styled-components";
import { FiMoreVertical } from "react-icons/fi";
import { UserLayout } from "../../components/users/UserLayout";
import { UserComponent } from "../../components/users/UserComponent";
import { RowTitle } from "../../components/users/RowTitle";
import { SidebarOption } from "../../components/Sidebar/SidebarOption";
import { useAppContext } from "../../components/AppManag.tsx/AppContext";

export default function UserManage(): JSX.Element {
  const t = useTheme();
  const router = useRouter();

  const { dispatch, allUsers, adminInfo } = useAppContext();

  const token: string = adminInfo.token;
  console.log(token);

  const email: string = adminInfo.email;

  useEffect(() => {
    axios
      .post(
        `${config.apiUrl}/api/data/admin/getAllusers`,
        { email },
        {
          headers: {
            authorization: token,
          },
        }
      )
      .then((result) => {
        console.log(result);
        if ((result.status as number) === 200) {
          //set dispatch
          dispatch({ type: "LIST OF USERS", payload: result?.data });
        }
      })
      .catch((error) => {
        const err = error as AxiosError;
        if ((err.response?.status as number) == 400) {
          //return
        } else {
          //return
        }
      });
  }, [dispatch, email, token]);

  return (
    <UserLayout title="Users" style={{ height: "100vh" }}>
      <Container>
        <RowTitle />

        {allUsers &&
          allUsers?.map((userInfo: any, index: any) => {
            // const date: string = userInfo?.createdAt;
            const newdate: string = userInfo?.createdAt
              .slice(0, 10)
              .replace(/-/g, "/");
            return (
              <UserComponent
                name={userInfo?.name}
                family={userInfo?.family}
                key={userInfo?.id}
                email={userInfo?.email}
                address={userInfo?.address}
                number={userInfo?.phoneNumber}
                createdAt={newdate}
                userId={userInfo.id}
              />
            );
          })}
      </Container>
    </UserLayout>
  );
}

const Wrapper = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 30px auto;
  display: flex;
  flex-direction: column;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
`;

const Flexul = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0;
  text-align: center;
  div {
    width: calc(100% / 7);
    display: flex;
    align-items: flex-end;
    text-align: left;
  }
`;
