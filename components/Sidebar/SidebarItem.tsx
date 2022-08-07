import React, { useState } from "react";
import styled, { css } from "styled-components";
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
  title?: string;
  icon?: JSX.Element;
  style: any;
  isOpen: boolean;
  subRoutes?: itemProp[];
  isActive: boolean;
};

type Styleprop = {
  isActive: boolean;
};

export const SidebarItem = ({
  onClick,
  icon,
  title,
  style,
  isOpen,
  subRoutes,
  isActive,
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
          padding: "10px",
          cursor: "pointer",
          width: "100%",
        }}
        isActive={isActive}
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

      <Column style={{ width: "100%" }}>
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
                cursor: "pointer",
              }}
            >
              <Span>{SubRoute.icon}</Span>
              <Title
                style={{
                  color: t.color.bgColor,
                  paddingLeft: t.padding.medium,
                }}
              >
                {SubRoute.title}
              </Title>
            </Wrapper>
          ))}
      </Column>
    </>
  );
};

const MainWrapper = styled.div<Styleprop>`
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
  ${(p) =>
    p.isActive &&
    css`
      border-left: 3px solid #abcde3;
      /* border-top-right-radius: 50px; */
      /* border-bottom-right-radius: 30px; */
    `}
`;
const Span = styled.span`
  vertical-align: middle;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 35px;
  height: 35px;
`;

const Title = styled.p`
  position: relative;
  margin: 0px;
  &::before {
    content: "";
    border-left: 1px dashed #fff;
    padding-right: 10px;
    position: absolute;
    left: 8px;
    height: 100%;
  }
`;
