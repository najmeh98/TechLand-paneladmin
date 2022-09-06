import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
export const FormItem = styled.div`
  display: flex;
  flex-direction: column;
  /* align-items: flex-start; */
  justify-content: flex-start;

  /* direction: rtl; */
`;

export const FlexRow = styled.div`
  display: flex;
  /* align-items: center; */
  justify-content: space-between;
  width: 100%;
`;
export const Flex = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  /* text-align: left; */
`;

export const Column = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

export const MainWrapper = styled.div`
  width: 100%;
  max-width: 1000px;
  margin: 20px auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
`;
