import styled from "styled-components";
import { CustomButton } from "../CustomButton";
import { CustomInput } from "../CustomInput";
import { HeaderText } from "../HeaderText";
import { Space } from "../share/Space";
import { ComponentUploader } from "../ComponetnUploader";
import { OwnProp } from "../types/createlist.interface";
import { useState } from "react";
import { ThemedText } from "../ThemedText";

export const CreateList = ({
  title,
  icon,
  setImage,
  image,
  valueName,
  onChangeName,
  onChamgeDesc,
  valueDesc,
  onClick_Cancel,
  onClick_Create,
  newImage,
}: OwnProp): JSX.Element => {
  const [description, setDescription] = useState<boolean>(false);

  return (
    <Wrapper className="mx-auto	 z-10 right-0 left-0 top-0 bottom-0   w-screen  shadow-slate-400	h-screen flex items-center	justify-center	fixed overflow-x-hidden overflow-y-auto">
      <Container className=" m-auto flex items-center -top-5  justify-center flex-col relative bg-stone-200 py-6  px-4">
        <div className="w-1/2 mt-6 mb-6 ml-14 mr-14">
          <HeaderText
            style={{ width: "100%", paddingBottom: "40px", margin: "0" }}
          >
            {title}
          </HeaderText>

          <Space vertical={10} />

          <ComponentUploader
            setImage={setImage}
            image={image}
            newImage={newImage}
          />

          <Space vertical={50} />

          <CustomInput
            placeholder="Give it a name"
            type="text"
            value={valueName}
            onChange={onChangeName}
          />

          <Space vertical={40} />

          {description ? (
            <CustomInput
              type="text"
              placeholder="Description"
              width="100%"
              value={valueDesc}
              onChange={onChamgeDesc}
            />
          ) : (
            <ThemedText
              style={{ width: "100%", color: "rgb(57, 172, 212)" }}
              onClick={() => setDescription(true)}
              className=" text-cyan-500"
            >
              Add a description
            </ThemedText>
          )}

          <Space vertical={30} />

          {/* {children} */}

          <ButtonRow style={{ marginTop: "30px" }}>
            <CustomButton padding=" 0px 20px" onClick={onClick_Cancel}>
              Cancel
            </CustomButton>

            <CustomButton
              style={{ marginLeft: "20px" }}
              padding=" 0px 20px"
              onClick={onClick_Create}
            >
              Create
            </CustomButton>
          </ButtonRow>
        </div>

        {icon}
      </Container>
    </Wrapper>
  );
};

export const Wrapper = styled.div`
  background-color: rgba(255, 255, 255, 0.94);
`;

const Container = styled.div`
  background-color: #fff;
  box-shadow: rgb(0 0 0 / 15%) 0px 2px 10px;
  width: 100%;
  max-width: 800px;
  /* min-height: 500px; */
`;
const ButtonRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;
