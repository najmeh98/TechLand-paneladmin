import { useRouter } from "next/router";
import React from "react";
import styled from "styled-components";
import { useTheme } from "../Context/ThemeContext";
import { HeaderText } from "../HeaderText";
import { Flex, FlexRow, MainWrapper } from "../share/Container";
import { SidebarOption } from "../Sidebar/SidebarOption";
import { UserProp } from "./type";

interface Prop {
  width: string;
}

export const UserLayout: React.FC<UserProp> = ({
  title,
  children,
  width,
  style,
}) => {
  const t = useTheme();
  const router = useRouter();

  return (
    <LayoutStyle>
      <SidebarOption />
      <MainWrapper>
        <Conianer
          style={{
            maxWidth: width,
            width: "100%",
          }}
        >
          <HeaderText>{title}</HeaderText>
          <Wrapper
            style={{
              // maxWidth: width ? `${width}` : "100%",
              // width: "100%",
              ...style,
            }}
          >
            {children}
          </Wrapper>
        </Conianer>
      </MainWrapper>
    </LayoutStyle>
  );
};

const Wrapper = styled.div`
  background-color: white;
  display: flex;
  flex-direction: column;
  border: 1px solid rgb(230, 235, 235);
  border-radius: 16px;
  box-shadow: rgb(16 30 115 / 6%) 0px 6px 26px 0px;
  margin: 20px 0px;
`;

const Conianer = styled.div`
  /* display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start; */
  height: 100%;
  /* width: 100%; */

  /* max-width: 700px; */
  padding: 10px 30px;
`;

const LayoutStyle = styled.div`
  display: flex;
`;
