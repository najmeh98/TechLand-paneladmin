import styled from "styled-components";
import { useTheme } from "./Context/ThemeContext";
import { Wrapper } from "./share/Container";
import { Theme } from "./types/theme";

type OwnProps = {
  onClick: () => void;
  label?: string;
  style?: any;
  disable?: boolean;
  bordered?: boolean;
  children?: string;
  width?: string;
  maxWidth?: string;
  padding?: string;
  color?: keyof Theme["color"];
};

export const CustomButton = ({
  onClick,
  label,
  style,
  disable,
  children,
  width,
  padding,
  maxWidth,
  color,
}: OwnProps) => {
  let t = useTheme();
  return (
    <Row
      style={{
        marginTop: t.margin.medium,
        marginBottom: t.margin.medium,
        ...style,
      }}
    >
      <StyleButton style={{ width: width, maxWidth: maxWidth }}>
        <Button
          onClick={onClick}
          disabled={disable}
          style={{
            width: "100%",
            height: "40px",
            backgroundColor: t.color[color || "buttonBg"],
            color: t.color.textColor,
            borderRadius: t.borderRadius.small,
            fontSize: t.fontSize.medium,
            padding: padding,
          }}
        >
          {children}
        </Button>
      </StyleButton>
    </Row>
  );
};

const Row = styled.div`
  display: flex;
  align-items: center;
  /* width: 100%; */
  height: 65px;
`;
const Button = styled.button`
  border: none;
  cursor: pointer;
  font-size: 12px;
`;
export const StyleButton = styled.div`
  display: flex;
  flex-direction: column;
  /* align-items: flex-start; */
  justify-content: flex-start;

  direction: rtl;
`;
