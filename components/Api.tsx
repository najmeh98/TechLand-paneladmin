import axios, { AxiosResponse } from "axios";
import { OwnProp } from "../pages/auth/register";

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

export const GetAllUsers = ({ token }: { token: any }) => {
  return axios.post(
    `${config.apiUrl}/api/admin/getAllusers`,
    {},
    {
      headers: {
        authorization: token,
      },
    }
  );
};

export const Deleteuser = (id: any, token: string) => {
  if (!id || !token) {
    return;
  }
  return axios.post(
    `${config.apiUrl}/api/data/admin/deleteUser/${id}`,
    {},
    // {id},
    {
      headers: {
        authorization: token,
      },
    }
  );
};

export const EdituserInfo = (adminInfo: object, id: any, token: string) => {
  if (!adminInfo) {
    return;
  }
  return axios.post(`${config.apiUrl}/api/data/admin/editUserInfo/${id}`, {
    headers: {
      authorization: token,
    },
  });
};
