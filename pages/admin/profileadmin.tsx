import React, { useState } from "react";
import styled from "styled-components";
import { useAppContext } from "../../components/AppManag.tsx/AppContext";
import { useTheme } from "../../components/Context/ThemeContext";
import { CustomInput } from "../../components/CustomInput";
import { Flex } from "../../components/share/Container";
import { Space } from "../../components/share/Space";
import { SidebarOption } from "../../components/Sidebar/SidebarOption";
import { ThemedText } from "../../components/ThemedText";
import { ProfileProp } from "./profiletype";

export default function Profileadmin(): JSX.Element {
  const t = useTheme();
  const { adminInfo } = useAppContext();

  const [admin, setadmin] = useState<ProfileProp>({
    name: adminInfo?.name || "",
    family: adminInfo?.family || "",
    username: adminInfo?.username || "",
    email: adminInfo?.email || "",
    phone: adminInfo?.phoneNumber || "",
  });

  return (
    <Wrapper>
      <SidebarOption />
      <MainWrapper>
        <ThemedText
          style={{
            fontSize: t.fontSize.semiLarge,
            fontWeight: t.fontWeight.bold,
            paddingBottom: "10px",
          }}
        >
          Personal info
        </ThemedText>
        <ThemedText style={{ color: t.color.titleColor }}>
          Update your photo and personal details here.
        </ThemedText>
        <Container>
          <Column style={{ height: "90px" }}>
            <ThemedText>Full Name:</ThemedText>
            <Input>
              <CustomInput type="text" width="100%" />
              <CustomInput type="text" width="100%" />
            </Input>
          </Column>

          <Column style={{ height: "90px" }}>
            <ThemedText>Email Adress :</ThemedText>
            <CustomInput type="text" width="100%" />
          </Column>

          <Column style={{ height: "90px" }}>
            <ThemedText>Your profile</ThemedText>
            <Input style={{ paddingLeft: "10px" }}>
              <Image src="/flower1.jpg" alt="profile" width={50} height={50} />
              <CustomInput type="file" width="70%" />
            </Input>
          </Column>

          <Column style={{ height: "150px" }}>
            <ThemedText>Bio :</ThemedText>
            <CustomInput type="textarea" width="100%" />
          </Column>
        </Container>
      </MainWrapper>
    </Wrapper>
  );
}

const MainWrapper = styled.div`
  width: 100%;
  max-width: 800px;
  margin: 15px 35px;
  /* margin: 30px auto; */
`;

const Container = styled.div`
  /* display: flex; */
  border: 1px solid red;
  width: 100%;
  height: calc(100vh - 100px);
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  /* justify-content: space-between; */
  /* margin: 10px 20px; */
`;

const Column = styled.div`
  display: grid;
  grid-template-columns: 200px 1fr;
  /* gap: 30px; */
  /* height: 90px; */
  align-items: center;
  border-top: 1px solid gray;
  padding: 0px 20px;
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
