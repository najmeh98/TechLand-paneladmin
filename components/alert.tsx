import React from "react";
import { CustomButton } from "./CustomButton";
import { HeaderText } from "./HeaderText";
import { LayoutPopup } from "./LayoutList.tsx/LayoutPopup";
import { ButtonRow } from "./share/Container";
import { Space } from "./share/Space";
import { ThemedText } from "./ThemedText";

type alertProp = {
  onClick_Cancel: () => void;
  onClick_delete: () => void;
  Buttondelete: string;
  text: string;
  desc: string;
};

export default function Alert({
  onClick_Cancel,
  onClick_delete,
  Buttondelete,
  text,
  desc,
}: alertProp) {
  return (
    <LayoutPopup onClick_Cancel={onClick_Cancel}>
      <Space vertical={60} />

      <HeaderText className="w-full m-0 pb-6">{text}</HeaderText>
      {desc && <ThemedText>{desc}</ThemedText>}

      <Space vertical={60} />

      <ButtonRow>
        <CustomButton
          onClick={onClick_Cancel}
          className=" px-5 hover: bg-red-900"
          style={{ border: "1px solid lightgray", borderRadius: "5px" }}
          color="fontColor"
          bgcolor="bgColor"
        >
          Cancel
        </CustomButton>

        <CustomButton
          onClick={onClick_delete}
          className="px-5 ml-5 hover: border-slate-500"
          bgcolor="errortext"
        >
          {Buttondelete}
        </CustomButton>
      </ButtonRow>

      <Space vertical={30} />
    </LayoutPopup>
  );
}
