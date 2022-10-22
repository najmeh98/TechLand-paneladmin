import styled from "styled-components";
import { useTheme } from "./Context/ThemeContext";
import { Theme } from "./types/theme";
import { motion } from "framer-motion";

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
  bgcolor?: keyof Theme["color"];
  className?: string;
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
  bgcolor,
  className,
}: OwnProps): JSX.Element => {
  let t = useTheme();
  return (
    <motion.div
      initial=""
      className="flex items-center"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.9 }}
      style={{
        marginTop: t.margin.medium,
        marginBottom: t.margin.medium,
        width: width,
        maxWidth: maxWidth,
        ...style,
      }}
    >
      <Button
        onClick={onClick}
        className={className}
        // disabled={disable}

        style={{
          width: "100%",
          height: "40px",
          backgroundColor: t.color[bgcolor || "buttonBg"],
          color: t.color[color || "textColor"],
          borderRadius: t.borderRadius.small,
          fontSize: t.fontSize.medium,
          padding: padding,
        }}
      >
        {children}
      </Button>
    </motion.div>
  );
};

const Button = styled.button`
  border: none;
  cursor: pointer;
  font-size: 12px;
`;
export const StyleButton = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;
