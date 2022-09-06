import Image from "next/image";
import styled, { css } from "styled-components";
import { desktop, mobile, notmobile, tablet } from "../utils/media";
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
            width="500px"
            height="570px"
          />
        </LeftSide>
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin: auto;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow-y: auto;
  overflow-x: hidden;
  ${mobile(css`
    padding: 20px;
  `)}
`;

const Container = styled.div`
  max-width: 1100px;

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
  ${mobile(css`
    width: 100%;
    padding: 20px 10px;
    justify-content: center;
    /* height: 100%; */
  `)}
`;

const RightSide = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  padding: 10px;

  ${mobile(css`
    max-width: 85%;
    /* margin: auto; */
    padding: 20px;
  `)}
  ${notmobile(css`
    padding: 10px;
    max-width: 100%;
  `)}
  ${tablet(css`
    padding: 0;
  `)}
`;

const LeftSide = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  padding: 10px 0px;

  ${tablet(css`
    img {
      width: 480px;
      height: 550px;
    }
  `)}
  ${mobile(css`
    display: none;
  `)}
`;
