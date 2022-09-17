import axios, { AxiosResponse } from "axios";

export const config = {
  apiUrl: "http://localhost:3001",
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
    { id },
    {
      headers: {
        authorization: token,
      },
    }
  );
};

export const EdituserInfo = (
  userInfo: object,
  id: any,
  token: string
): Promise<AxiosResponse<any, any>> | undefined => {
  if (!userInfo) {
    return;
  }
  return axios.post(
    `${config.apiUrl}/api/data/admin/editUserInfo/${id}`,
    { userInfo },
    {
      headers: {
        authorization: token,
      },
    }
  );
};

export const adminCreate = (
  adminInfo: object,
  token: string
): Promise<AxiosResponse<any, any>> | undefined => {
  // if (!id) return;

  return axios.post(
    `${config.apiUrl}/api/data/admin/adminCreate`,
    { adminInfo },
    {
      headers: {
        authorization: token,
      },
    }
  );
};

export const changePassword = (
  newPassword: object,
  token: string,
  id: number
) => {
  if (!newPassword) {
    return;
  }
  return axios.post(
    `${config.apiUrl}/api/admin/changePassword?query=${id}`,
    {
      newPassword,
    },
    {
      headers: {
        authorization: token,
      },
    }
  );
};

// fetch data with useSWR
export const fetchWithId = (url: string, localToken: string) =>
  axios(`${url}`, {
    headers: {
      authorization: localToken,
    },
  }).then((res) => res.data);
