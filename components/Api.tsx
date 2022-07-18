import axios, { AxiosResponse } from "axios";
import { OwnProp } from "../pages/register/step1";

export const config = {
  apiUrl: "http://localhost:7000",
};

export const Verification = ({
  admin,
}: any): Promise<AxiosResponse<any, any>> | undefined => {
  if (!admin) {
    return;
  }

  return axios.post(`${config.apiUrl}/api/admin/auth`, { admin });
};

export const Login = (email: string, password: string) => {
  if (!email || !password) {
    return;
  }
  return axios.post(`${config.apiUrl}/api/admin/login`, { email, password });
};
