import React from "react";
import styled from "styled-components";
import { Close } from "../icons/Icon";
import { Wrapper } from "./CreateList";

type prop = {
  children: React.ReactNode;
  onClick_Cancel: () => void;
};

export const LayoutPopup: React.FC<prop> = ({ children, onClick_Cancel }) => {
  return (
    <Wrapper className="mx-auto	 z-10 right-0 left-0  bottom-0 -top-5   w-screen  shadow-slate-400	h-screen flex items-center	justify-center	fixed overflow-x-hidden overflow-y-auto">
      <Container className=" w-full m-auto flex items-center -top-5  justify-center flex-col relative bg-stone-200  p-4">
        <div
          className="flex items-end justify-end w-full cursor-pointer"
          onClick={onClick_Cancel}
        >
          <Close />
        </div>
        <div className="w-1/2 mt-6 mb-6 ml-14 mr-14">{children}</div>
      </Container>
    </Wrapper>
  );
};

const Container = styled.div`
  background-color: #fff;
  box-shadow: rgb(0 0 0 / 15%) 0px 2px 10px;
  max-width: 800px;
  /* min-height: 500px; */
`;
