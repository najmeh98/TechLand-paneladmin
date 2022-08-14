import React from "react";
import { FiUsers } from "react-icons/fi";
import styled from "styled-components";
import { Flex, FlexRow, FormItem } from "../share/Container";
import { ThemedText } from "../ThemedText";
import { FiPlus } from "react-icons/fi";
import { OwnProp } from "./dashType";
import { useTheme } from "../Context/ThemeContext";

export const DashboardMain: React.FC<OwnProp> = ({
  title,
  count,
  icon,
  prop,
  text,
  onClick,
}) => {
  const t = useTheme();
  console.log(count);
  return (
    <CardStyle>
      <FlexRow
        style={{
          alignItems: "center",
          paddingTop: "10px",
          paddingBottom: "20px",
        }}
      >
        <FormItem>
          <ThemedText
            style={{ paddingBottom: "10px", fontWeight: "bold" }}
            fontSize="medium"
          >
            {count}
          </ThemedText>
          <ThemedText style={{ fontWeight: t.fontWeight.bold }}>
            {title}
          </ThemedText>
        </FormItem>
        {icon}
      </FlexRow>

      <AddUser
        style={{
          width: "100%",
          paddingTop: "20px",
          paddingBottom: "10px",
          borderTop: "1px solid #2e82aa",
        }}
        onClick={onClick}
      >
        {prop ? (
          <span style={{ fontSize: t.fontSize.normal, color: "#a0a1a5" }}>
            {prop}
          </span>
        ) : (
          <FiPlus fontSize={20} color="#2e82aa" />
        )}
        <ThemedText
          style={{ paddingLeft: "5px", color: "#2e82aa" }}
          fontSize="normal"
        >
          {text}
        </ThemedText>
      </AddUser>
    </CardStyle>
  );
};

const CardStyle = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding: 10px 25px;
  border-radius: 15px;
  flex-direction: column;
  box-shadow: rgb(0 0 0 / 10%) 0px 0px 5px;
  width: 100%;
`;

const AddUser = styled.div`
  display: flex;
  align-items: center;
`;
