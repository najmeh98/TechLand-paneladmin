import React, {
  ChangeEvent,
  DetailedHTMLProps,
  TextareaHTMLAttributes,
  useState,
} from "react";
import styled, { css, CSSProperties } from "styled-components";
import { useTheme } from "./Context/ThemeContext";
import { FormItem } from "./share/Container";
import { Space } from "./share/Space";
import { FiEye, FiEyeOff } from "react-icons/fi";

interface TextInput {
  type: "text";
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}
interface FileInput {
  type: "file";
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}
interface TextArea {
  type: "textarea";
  onChange?: (event: ChangeEvent<HTMLTextAreaElement>) => void;
}
interface TextPassword {
  type: "password";
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}

export type InputCommonProps = {
  label?: string;
  placeholder?: string | undefined;
  value?: string | number;
  width?: string | undefined;
  height?: string | undefined;
  enctype?: string | undefined;
  name?: string;
  style?: CSSProperties;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onSubmit?: (() => void) | undefined;
  type?: string;
  column?: number;
  row?: number;
};

type Props = (TextInput | TextArea | FileInput | TextPassword) &
  InputCommonProps;

interface ImgProps {
  password?: boolean;
  onClick: () => void;
}

export const CustomInput: React.FC<Props> = ({
  label,
  placeholder,
  value,
  width,
  name,
  height,
  enctype,
  onChange,
  style,
  onSubmit,
  type,
  column,
  row,
}) => {
  const [show, setShow] = useState(false);

  let t = useTheme();

  return (
    <FormItem
      style={{
        // margin: t.margin.medium,
        width: width,
        height: height,
        direction: "ltr",
        ...style,
      }}
    >
      {label && (
        <>
          <label
            style={{
              color: t.color.labelColor,
              paddingBottom: t.padding.normal,
            }}
          >
            {label}
          </label>
        </>
      )}
      {type === "password" && (
        <Input
          value={value}
          onChange={onChange}
          type={show ? "text" : "password"}
          placeholder={placeholder}
          style={{ padding: t.padding.normal, height: t.height.small }}
        />
      )}
      {!(type === "password" || type === "textarea") && (
        <Input
          name={name}
          value={value}
          onChange={onChange}
          type={type}
          placeholder={placeholder}
          style={{ padding: t.padding.normal, height: t.height.small }}
        />
      )}

      {type === "textarea" && (
        <textarea
          value={value}
          onChange={onChange}
          rows={row ? row : 6}
          cols={column}
          style={{
            borderColor: t.color.borderColor,
            border: "1px solid rgb(204, 204, 204)",
            resize: "none",
            padding: t.padding.normal,
            borderRadius: t.borderRadius.normal,
          }}
        ></textarea>
      )}

      {type === "password" && (
        <div style={{ position: "relative" }}>
          <ShowPass onClick={() => setShow(!show)} password>
            {!show && <FiEye />} {show && <FiEyeOff />}
          </ShowPass>
        </div>
      )}
    </FormItem>
  );
};

export const Input = styled.input`
  outline: none;
  border: 1px solid rgb(204, 204, 204);
  direction: ltr !important;
  display: flex;
  box-shadow: rgb(51 59 75 / 5%) 0px 16px 40px 0px;
  border-radius: 7px;
  width: 100%;
  margin-bottom: 5px;
  resize: none;
  font-size: medium;
  font-family: inherit;
  &::placeholder {
    font-size: 13px;
  }
`;

const ShowPass = styled.div<ImgProps>`
  width: 40px;
  height: 40px;
  position: absolute;
  right: 0px;
  top: -45px;
  /* direction: rtl; */
  cursor: pointer;
  ${(p) =>
    p.password &&
    css`
      border-left: 1px solid rgb(204, 204, 204);
      cursor: pointer;
    `}
  svg {
    display: block;
    margin: 10px auto;
  }
`;
