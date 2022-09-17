import { CSSProperties } from "styled-components";

// user Prop type
export interface UserProp {
  title: string;
  children: React.ReactNode;
  width?: string;
  style?: CSSProperties;
}

//user component type
export interface UserInfo {
  name: string;
  family: string;
  email: string;
  address: string;
  number: number;
  createdAt: string;
  key: number;
  userId: number;
}
