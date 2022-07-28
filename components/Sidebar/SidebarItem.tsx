import React, { useState } from "react";
import styled from "styled-components";
import { useTheme } from "../Context/ThemeContext";
import { ArrowDown } from "../icons/Icon";
import { Column, Flex, FormItem, Wrapper } from "../share/Container";
import { ThemedText } from "../ThemedText";
import { useHover } from "../utils/use-hover";
import { IoIosArrowUp } from "react-icons/io";
import { Router, useRouter } from "next/router";
import { itemProp } from "./SidebarOption";
type Props = {
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  title: string;
  icon: JSX.Element;
  style: any;
  isOpen: boolean;
  subRoutes?: itemProp[];
};

export const SidebarItem = ({
  onClick,
  icon,
  title,
  style,
  isOpen,
  subRoutes,
}: Props): JSX.Element => {
  let t = useTheme();
  const router = useRouter();
  const [showSubRoute, setshowSubRoute] = useState<boolean>(false);
  const onmouseOut = (): void => {
    setshowSubRoute(false);
  };

  return (
    <>
      <MainWrapper
        onClick={onClick}
        style={{
          padding: "10px 20px 10px 10px",
          cursor: "pointer",
          width: "100%",
        }}
      >
        <Wrapper>
          <Span
            style={{
              color: t.color.bgColor,
              fontSize: t.fontSize.semiLarge,
            }}
          >
            {icon}
          </Span>
          <p style={{ color: t.color.bgColor, ...style }}>{title}</p>
        </Wrapper>

        <span onClick={() => setshowSubRoute(!showSubRoute)} style={style}>
          {subRoutes && <ArrowDown fill="#fff" />}
        </span>
      </MainWrapper>

      <Column>
        {showSubRoute &&
          subRoutes?.map((SubRoute: any, index: any) => (
            <Wrapper
              key={index}
              onClick={() => {
                router.push(SubRoute?.path);
              }}
              style={{
                display: isOpen ? "flex" : "none",
                width: "100%",
                justifyContent: "flex-start",
                paddingLeft: "10px",
                color: t.color.bgColor,
              }}
            >
              <Span>{SubRoute.icon}</Span>
              <ThemedText style={{ color: t.color.bgColor }}>
                {SubRoute.title}
              </ThemedText>
            </Wrapper>
          ))}
      </Column>
    </>
  );
};

const MainWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  transition: all 0.5s;
  p {
    margin: 0;
    display: none;
    white-space: nowrap;
    padding-left: 10px;
  }
`;
const Span = styled.span`
  vertical-align: middle;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 35px;
  height: 35px;
`;
