import axios from "axios";
import { NextRouter, useRouter } from "next/router";
import React, { useState } from "react";
import styled from "styled-components";
import { config } from "../../components/Api";
import { useAppContext } from "../../components/AppManag.tsx/AppContext";
import { useTheme } from "../../components/Context/ThemeContext";
import { CustomButton } from "../../components/CustomButton";
import { CustomInput } from "../../components/CustomInput";
import {
  Flex,
  FlexRow,
  FormItem,
  Wrapper,
} from "../../components/share/Container";
import { Space } from "../../components/share/Space";
import { SidebarOption } from "../../components/Sidebar/SidebarOption";
import { ThemedText } from "../../components/ThemedText";
import { Theme } from "../../components/types/theme";
import { UserLayout } from "../../components/users/UserLayout";
import { ProfileProp } from "./profiletype";

export default function Profileadmin(): JSX.Element {
  const t: Theme = useTheme();
  const router: NextRouter = useRouter();
  const { adminInfo, dispatch } = useAppContext();

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>("");

  const [admin, setadmin] = useState<ProfileProp>({
    name: adminInfo?.name || "",
    family: adminInfo?.family || "",
    username: adminInfo?.username || "",
    email: adminInfo?.email || "",
    phoneNumber: adminInfo?.phoneNumber || "",
    bio: "",
    job: "",
  });
  const id: number | undefined = adminInfo?.id;

  const updateadminInfo = async (): Promise<void> => {
    setError("");
    setLoading(true);

    try {
      const res = await axios.post(
        `${config.apiUrl}/api/admin/profile/${id}`,
        { admin },
        {
          headers: {
            authorization: adminInfo?.token,
          },
        }
      );
      setLoading(false);
      console.log(res);
      if ((res.status as number) == 200) {
        const data: any = res?.data;
        dispatch({ type: "LOGGED IN", payload: data });
        router.push("/");
      } else {
        console.log(error);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <UserLayout title="About You" width="85%">
      <FormItem style={{ padding: "45px" }}>
        <FlexRow>
          <ThemedText
            style={{
              fontSize: t.fontSize.semiLarge,
              fontWeight: t.fontWeight.bold,
              paddingBottom: t.padding.small,
            }}
          >
            Profile
          </ThemedText>
          <ThemedText style={{ color: t.color.titleColor }}>
            Update your photo and personal details here.
          </ThemedText>
          <Wrapper>
            <CustomButton
              color="fontColor"
              bgcolor="bgColor"
              style={{ border: "1px solid lightgray" }}
              onClick={() => {
                router.push("/");
              }}
            >
              Cancel
            </CustomButton>
            <CustomButton
              style={{ paddingLeft: "10px" }}
              onClick={updateadminInfo}
            >
              Save
            </CustomButton>
          </Wrapper>
        </FlexRow>

        <Container>
          <Column style={{ height: "90px" }}>
            <ThemedText style={{ paddingTop: "10px" }}>Full Name:</ThemedText>
            <Input>
              <CustomInput
                type="text"
                width="100%"
                value={admin.name}
                onChange={(event) =>
                  setadmin({ ...admin, name: event.currentTarget.value })
                }
              />
              <CustomInput
                type="text"
                width="100%"
                value={admin.family}
                onChange={(event) =>
                  setadmin({ ...admin, family: event.currentTarget.value })
                }
              />
            </Input>
          </Column>

          <Column style={{ height: "90px" }}>
            <ThemedText style={{ paddingTop: "10px" }}>
              Email Adress :
            </ThemedText>
            <CustomInput
              type="text"
              value={admin.email}
              onChange={(event) =>
                setadmin({ ...admin, email: event.currentTarget.value })
              }
            />
          </Column>

          <Column style={{ height: "90px" }}>
            <ThemedText style={{ paddingTop: "10px" }}>Phone :</ThemedText>
            <CustomInput
              type="text"
              value={admin.phoneNumber}
              onChange={(event) =>
                setadmin({ ...admin, phoneNumber: event.currentTarget.value })
              }
            />
          </Column>

          <Column style={{ height: "90px" }}>
            <ThemedText style={{ paddingTop: "10px" }}>Your profile</ThemedText>
            <Input style={{ paddingLeft: "10px" }}>
              <Image src="/flower1.jpg" alt="profile" width={50} height={50} />
              <CustomInput type="file" width="80%" />
            </Input>
          </Column>

          <Column style={{ height: "130px" }}>
            <ThemedText style={{ paddingTop: "10px" }}>Bio :</ThemedText>
            <CustomInput
              type="textarea"
              column={10}
              value={admin.bio}
              onChange={(event) =>
                setadmin({ ...admin, bio: event.currentTarget.value })
              }
            />
          </Column>
          <Space vertical={20} />
          <Column>
            <ThemedText style={{ paddingTop: "10px" }}>Job Title :</ThemedText>
            <CustomInput
              type="text"
              value={admin.job}
              onChange={(event) =>
                setadmin({ ...admin, job: event.currentTarget.value })
              }
            />
          </Column>
        </Container>
      </FormItem>
    </UserLayout>
  );
}

const MainWrapper = styled.div`
  width: 100%;
  max-width: 800px;
  margin: 30px auto;
  height: 100%;
`;

const Container = styled.div`
  /* display: flex; */
  width: 100%;
  /* width: 100%; */
  /* height: 100vh; */
`;

const Column = styled.div`
  display: grid;
  grid-template-columns: 200px 1fr;
  /* gap: 30px; */
  /* height: 90px; */
  align-items: flex-start;
  /* border-top: 1px solid gray; */
  /* padding: 0px 20px; */
`;

const Input = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const Image = styled.img`
  border-radius: 50%;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
`;
