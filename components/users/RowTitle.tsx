import { useRouter } from "next/router";
import styled from "styled-components";
import { useTheme } from "../Context/ThemeContext";
import { ThemedText } from "../ThemedText";

const InfoRow: { id: number; name: string }[] = [
  { id: 0, name: "name" },
  { id: 1, name: "family" },
  { id: 2, name: "email" },
  { id: 3, name: "address" },
  { id: 4, name: "phoneNumber" },
  { id: 5, name: "createdAt" },
];

export const RowTitle = (): JSX.Element => {
  return (
    <MainTitle>
      {InfoRow &&
        InfoRow?.map((info: any, index: number) => (
          <RowComponent key={info.id} title={info.name} />
        ))}
    </MainTitle>
  );
};

const RowComponent = ({ title }: { title: string }): JSX.Element => {
  const t = useTheme();
  return (
    <Title style={{ fontSize: t.fontSize.normal, color: t.color.titleColor }}>
      {title}
    </Title>
  );
};

const MainTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 30px;
  text-align: center;
`;

const Title = styled.div`
  width: calc(100% / 7);
  display: flex;
  align-items: flex-end;
  text-align: left;
  text-transform: uppercase;
  letter-spacing: 0.6px;
  font-weight: 500;
  flex-flow: nowrap;
`;
