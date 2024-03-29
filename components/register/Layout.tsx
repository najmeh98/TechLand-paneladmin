import { useState } from "react";
import styled, { css } from "styled-components";
import { mobile, tablet } from "../utils/media";
import { motion } from "framer-motion";

type OwnProp = {
  children: React.ReactNode;
  title: string;
  text: string;
  button: string;
  path: any;
  // step: number;
};

interface sideProps {
  sideToSide: boolean;
}

export const Layout = ({
  children,
  title,
  text,
  button,
  path,
}: OwnProp): JSX.Element => {
  return (
    <Wrapper>
      <Container className="container mx-auto">
        <LeftSide className=" flex items-center justify-center " sideToSide>
          <div
            className="    absolute w-96 h-96 overflow-hidden  rounded-full -left-[34%] -bottom-[38%] transition-transform  "
            style={{
              boxShadow:
                "inset 8px 8px 12px #d1d9e6, inset -8px -8px 12px #f9f9f9",
            }}
          />
          <div
            className=" absolute -top-[272px] left-[256px]   w-96 h-96 rounded-full md:left-[156px] "
            style={{
              boxShadow:
                "inset 8px 8px 12px #d1d9e6, inset -8px -8px 12px #f9f9f9",
            }}
          />
          <div className=" flex flex-col items-center justify-center text-center max-w-xs ">
            <h1 className="capitalize font-bold text-4xl whitespace-nowrap ">
              {title}
            </h1>
            <p className="text-base leading-7 mx-4 text-slate-400 text-center">
              {text}
            </p>

            <motion.button
              whileHover={{ scale: 1.07 }}
              whileTap={{ scale: 1 }}
              onClick={path}
              className="uppercase cursor-pointer px-7 py-2 rounded-full text-lg m-10 text-white bg-gradient-to-r from-cyan-500 to-blue-500 outline-none border-none "
            >
              {button}
            </motion.button>
          </div>
        </LeftSide>

        <RightSide
          className=" py-10 pr-[45px] pl-[45px] sm:px-[30px] md:px-[70px] lg:px-[45px]"
          sideToSide
        >
          {children}
        </RightSide>
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
  /* background-color: #ecf0f3; */

  ${mobile(css`
    padding: 20px;
  `)}
`;

const Container = styled.div`
  /* max-width: 1100px; */

  max-height: 670px;
  height: 100%;
  align-items: center;
  display: flex;
  justify-content: space-between;
  width: 100%;
  box-shadow: 10px 10px 10px #d1d9e6, -10px -10px 10px #f9f9f9;
  box-shadow: rgb(16 30 115 / 6%) 0px 6px 26px 0px;
  background-color: #fff;
  /* background-color: #ecf0f3; */

  border-radius: 15px;
  border: 1px solid rgb(230, 235, 235);
`;

const RightSide = styled.div<sideProps>`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

const LeftSide = styled.div<sideProps>`
  /* flex: 1; */
  text-align: justify;
  position: relative;
  box-shadow: 4px 4px 10px #d1d9e6;
  overflow: hidden;
  height: 100%;
  width: 100%;
  max-width: 41%;
  border-top-left-radius: 15px;
  border-bottom-left-radius: 15px;
  /* background-color: #ecf0f3; */
  top: 0;
  left: 0;
  z-index: 200;

  ${tablet(css`
    display: none;
  `)}
`;
