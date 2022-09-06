import { ReactNode } from "react";
import styled from "styled-components";
import { useTheme } from "./Context/ThemeContext";
import { Theme } from "./types/theme";

interface OwenProp {
  onClick?: () => void;
  fontSize?: keyof Theme["fontSize"];
  color?: keyof Theme["color"];
  style?: any;
  children: ReactNode;
  className?: string;
}

export const ThemedText: React.FC<OwenProp> = ({
  onClick,
  fontSize,
  color,
  style,
  children,
  className,
}) => {
  const t = useTheme();

  return (
    <Text
      style={{
        fontSize: t.fontSize[fontSize || "normal"],
        color: t.color[color || "fontColor"],
        ...style,
      }}
      onClick={onClick}
      className={className}
    >
      {children}
    </Text>
  );
};

const Text = styled.p`
  margin: 0;
  cursor: pointer;
`;
