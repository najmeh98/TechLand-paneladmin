import styled from "styled-components";

export const Userheader = (): JSX.Element => {
  return (
    <Header>
      <div>Craete Admin</div>
      <span>150 users register</span>
    </Header>
  );
};

const Header = styled.header`
  min-height: 80px;
  /* padding: 30px; */
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;
