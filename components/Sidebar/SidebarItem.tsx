import React, { useState } from "react";
import styled, { css } from "styled-components";
import { useTheme } from "../Context/ThemeContext";
import { itemProp } from "./SidebarOption";

type Props = {
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  title?: string;
  icon?: JSX.Element;
  fullIcon?: JSX.Element;
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
  isActive,
  fullIcon,
}: Props): JSX.Element => {
  let t = useTheme();

  const [isOpne, setIsOpne] = useState<boolean>(false);

  return (
    <div
      className="flex items-start justify-center w-full cursor-pointer mb-10"
      onClick={onClick}
    >
      {/* <Wrapper> */}

      <div
        className="flex justify-start items-center"
        onMouseEnter={() => {
          setIsOpne(true);
        }}
        onMouseLeave={() => {
          setIsOpne(false);
        }}
      >
        {isActive ? (
          <span
            className="text-2xl "
            style={{
              color: t.color.bgColor,
            }}
          >
            {fullIcon}
          </span>
        ) : (
          <span
            className="text-2xl "
            style={{
              color: t.color.bgColor,
            }}
          >
            {icon}
          </span>
        )}

        {isOpne && (
          <div className="fixed flex items-start !z-50">
            <div className="absolute top-2 left-8 rounded-sm !z-30 bg-white w-3 h-3 rotate-45  scale-x-100 scale-y-100 translate-x-1 translate-y-1 skew-x-1 skew-y-1" />
            <div className="relative text-cyan-700 border border-solid border-cyan-700  flex items-start justify-start bg-white px-3 py-2 left-10 rounded ">
              {title}
            </div>
          </div>
        )}
      </div>

      {/* <p style={{ color: t.color.bgColor, ...style }}>{title}</p> */}
      {/* </Wrapper> */}

      {/* <span onClick={() => setshowSubRoute(!showSubRoute)} style={style}>
          {subRoutes && <ArrowDown fill="#fff" />}
        </span> */}
    </div>

    /* <Column style={{ width: "100%" }}>
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
      </Column> */
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
      /* border-left: 3px solid #abcde3; */
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
