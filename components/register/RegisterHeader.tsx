import React from "react";
import styled, { css } from "styled-components";
import { BsCheckCircleFill } from "react-icons/bs";
interface Prop {
  step: number;
}

export const RegisterHeader = ({ step }: Prop): JSX.Element => {
  const steps = [
    {
      step: 1,
      title: "ثبت اطلاعات",
    },
    {
      step: 2,
      title: "مشخصات",
    },
    {
      step: 3,
      title: "مشخصات",
    },
  ];

  return (
    <Container>
      {steps.map((item, index) => {
        const status =
          step > item.step ? "done" : step === item.step ? "active" : "demand";
        return (
          <React.Fragment key={index}>
            <StepBox>
              <StepNumberBox status={status}>
                {status === "done" ? <BsCheckCircleFill /> : item.step}
              </StepNumberBox>
              <StepTitle status={status}>{item.title}</StepTitle>
            </StepBox>

            {steps.length - 1 !== index && <Line green={step > item.step} />}
          </React.Fragment>
        );
      })}
    </Container>
  );
};

const Container = styled.div`
  /* margin: auto; */
  width: 100%;
  display: flex;
  /* width: 70%; */
  justify-content: space-between;
  align-items: center;
  /* flex-direction: row-reverse; */
  min-height: 90px;
  border-bottom: 1px solid #e7e7e7;
`;

const StepBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 -10px;
  min-width: 100px;
`;

const StepTitle = styled.div<{ status: string }>`
  margin-top: 16px;
  font-size: 10px;
  color: ${({ status }) => (status == "demand" ? "#7A8395" : "#535353")};
`;

const StepNumberBox = styled.div<{ status: string }>`
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #21b386;
  color: #fff;
  border: 1px solid #21b386;
  box-sizing: border-box;
  font-size: 12px;
  border-radius: 36px;

  ${({ status }) =>
    status == "done"
      ? css`
          background: #edf7f6;
          border: 0;
        `
      : status == "demand"
      ? css`
          background: #fff;
          color: #21b386;
        `
      : null}
`;

const Line = styled.div<{ green: boolean }>`
  height: 1px;
  width: 100%;
  margin-bottom: 36px;
  background: ${({ green }) => (green ? "#21b386" : "#EAEEF3")};
`;
