import React, { ChangeEvent, useState } from "react";
import styled, { css, CSSProperties } from "styled-components";
import { useTheme } from "./Context/ThemeContext";
import { FormItem } from "./share/Container";
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
  className?: any;
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
  className,
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
        position: "relative",
      }}
    >
      {type === "password" && (
        <Input
          className={className}
          value={value}
          onChange={onChange}
          type={show ? "text" : "password"}
          placeholder={placeholder}
          maxLength={255}
          style={{ padding: t.padding.normal, height: t.height.small }}
        />
      )}
      {!(type === "password" || type === "textarea") && (
        <Input
          className={className}
          name={name}
          value={value}
          onChange={onChange}
          type={type}
          placeholder={placeholder}
          style={{ padding: t.padding.normal, height: t.height.small }}
        />
      )}

      {type === "textarea" && (
        <Textarea
          className={className}
          value={value}
          onChange={onChange}
          rows={row ? row : 6}
          cols={column}
        />
      )}

      {type === "password" && (
        <Eye style={{ position: "relative" }}>
          <ShowPass onClick={() => setShow(!show)} password>
            {!show && <FiEye />} {show && <FiEyeOff />}
          </ShowPass>
        </Eye>
      )}

      {label && (
        <Label
          className={` absolute left-5  pointer-events-none pt-2  transition-all text-slate-400 ${
            value ? " -top-[17px] text-[#1a73e8]  p-1 bg-white" : ""
          } `}
        >
          {label}
        </Label>
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
  transition: border 150ms cubic-bezier(0.4, 0, 0.2, 1);

  &::placeholder {
    font-size: 13px;
  }

  &:focus {
    outline: none;
    border: 1.5px solid #1a73e8;
  }
`;

const Textarea = styled.textarea`
  outline: none;
  border: 1px solid rgb(204, 204, 204);
  resize: none;
  padding: 8px;
  border-radius: 10px;

  &:focus {
    outline: none;
    border: 1.5px solid #1a73e8;
  }
`;

const Label = styled.label`
  /* position: absolute; */
  /* left: 15px; */
  /* top: -3px; */
  /* pointer-events: none; */
  /* transform: translateY(0.5rem); */
  /* transition: 150ms cubic-bezier(0.4, 0, 0.2, 1); */

  ${Input}:focus ~ & {
    transform: translateY(-56%) scale(0.8);
    padding: 0px 0.2em 0.2em 0.2em;
    background-color: #ffff;
    color: #1a73e8;
    font-size: 20px;
    top: 0px;
  }

  ${Textarea}:focus ~ & {
    transform: translateY(-56%) scale(0.8);
    padding: 0px 0.2em 0.2em 0.2em;
    background-color: #ffff;
    color: #1a73e8;
    font-size: 20px;
    top: 0px;
  }
`;

const ShowPass = styled.div<ImgProps>`
  width: 40px;
  height: 40px;
  position: absolute;
  right: 0px;
  top: -45px;
  cursor: pointer;
  ${(p) =>
    p.password &&
    css`
      border-left: 1px solid rgb(204, 204, 204);
      cursor: pointer;
      ${Input}:focus ~ & {
        border-left: 2px solid cornflowerblue;
      }
    `}

  svg {
    display: block;
    margin: 10px auto;
  }
  &:focus {
    border-left: 2px solid cornflowerblue;
  }
`;

const Eye = styled.div`
  ${Input}:focus ~ & {
    border-right: 2px solid cornflowerblue;
  }
`;
