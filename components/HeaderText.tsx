import { useRouter } from "next/router";
import { ReactNode } from "react";
import styled from "styled-components";
import { useTheme } from "./Context/ThemeContext";
import { Theme } from "./types/theme";

interface H1Prop {
  onClick?: () => void;
  style?: any;
  fontSize?: keyof Theme["fontSize"];
  children: ReactNode;
  className?: string;
}

export const HeaderText = ({
  onClick,
  fontSize,
  style,
  children,
  className,
}: H1Prop): JSX.Element => {
  const t = useTheme();
  const router = useRouter();

  return (
    <H1 style={style} className={className} onClick={onClick}>
      {children}
    </H1>
  );
};

const H1 = styled.h1`
  text-transform: capitalize;
  white-space: normal;
  letter-spacing: 0px;
`;
