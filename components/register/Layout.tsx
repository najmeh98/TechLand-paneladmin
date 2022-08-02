import Image from "next/image";
import styled from "styled-components";
import { RegisterHeader } from "./RegisterHeader";

type OwnProp = {
  children: React.ReactNode;
  // step: number;
};

export const Layout = ({ children }: OwnProp): JSX.Element => {
  return (
    <Wrapper>
      <Container>
        <RightSide>
          {/* <RegisterHeader /> */}
          {children}
        </RightSide>

        <LeftSide>
          <img
            src="/flower2.jpg"
            alt="rightSide"
            width="550px"
            height="600px"
          />
        </LeftSide>
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin: 7% auto;
  width: 100%;
  max-width: 1200px;
  display: block;
  align-items: center;
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  width: 100%;
  box-shadow: rgb(16 30 115 / 6%) 0px 6px 26px 0px;
  background-color: #fff;
  border-radius: 15px;
  border: 1px solid rgb(230, 235, 235);
  direction: rtl;
`;

const RightSide = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const LeftSide = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
`;
