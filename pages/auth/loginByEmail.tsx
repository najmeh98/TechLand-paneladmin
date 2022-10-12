import React, { useCallback, useState } from "react";
import { useTheme } from "../../components/Context/ThemeContext";
import { useRouter } from "next/router";
import { Login } from "../../components/Api";
import { CustomInput } from "../../components/CustomInput";
import { Layout } from "../../components/register/Layout";
import { Space } from "../../components/share/Space";
import { CustomButton } from "../../components/CustomButton";
import { ThemedText } from "../../components/ThemedText";
import { Span } from "./register";
import { AxiosError } from "axios";
import { useAppContext } from "../../components/AppManag.tsx/AppContext";
import { Theme } from "../../components/types/theme";
import { loginProp } from "./authType";
import { useNotofication } from "../../components/NotificationMange.tsx/NotificationManager";

export default function LoginByEmail(): JSX.Element {
  const [loading, setLoading] = useState<boolean>(false);
  const [loginInfo, setLoginInfo] = useState<loginProp>({
    email: "",
    password: "",
  });

  const { dispatch, login: CheckLoggedIn } = useAppContext();

  const { createNotification } = useNotofication();

  const t: Theme = useTheme();
  const router = useRouter();
  const password: string = loginInfo.password;

  const onSubmitEmail = useCallback(async (): Promise<void> => {
    if (!loginInfo.email || !loginInfo.password) {
      return;
    }
    try {
      setLoading(true);
      const result = await Login(loginInfo.email, loginInfo.password);

      setLoading(false);
      if ((result?.status as number) == 200) {
        createNotification({
          title: "Welcome back",
          description: "",
          duration: 4000,
        });
        console.log(result);

        CheckLoggedIn({ ...result?.data });
        //set logg in dispatch
        dispatch({ type: "LOGGED IN", payload: { ...result?.data } });

        router.push("/");
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      const err = error as AxiosError;
      if (err.response) {
        switch (err.response?.status as number) {
          case 401:
            // Authentication
            break;
          case 404:
            //
            break;
          case 400:
            //
            break;
        }
      }
    }
  }, [
    CheckLoggedIn,
    createNotification,
    dispatch,
    loginInfo.email,
    loginInfo.password,
    router,
  ]);

  return (
    <Layout
      title="Hello Friends !"
      text="Enter your personal details to open an account with us"
      button="sign up"
    >
      <div
        style={{
          width: "100%",
          margin: "6px",
        }}
        className="flex  flex-col items-start"
      >
        <h1 className="flex items-center justify-center w-full whitespace-nowrap maxsm:text-2xl">
          Sign in to Website
        </h1>

        <Space vertical={55} />

        <CustomInput
          label="Email "
          width="100%"
          // placeholder="email"
          type="text"
          value={loginInfo.email}
          onChange={(event) =>
            setLoginInfo({ ...loginInfo, email: event.currentTarget.value })
          }
        />
        <Space vertical={30} />

        <CustomInput
          label="Password "
          width="100%"
          // placeholder="password"
          type="password"
          value={loginInfo.password}
          onChange={(event) =>
            setLoginInfo({ ...loginInfo, password: event.currentTarget.value })
          }
        />

        {/* <Flex style={{ paddingTop: "10px" }}>
          <div>
            <input type={"checkbox"} />
            <span>Remember me</span>
          </div>
          <span>Reset Password?</span>
        </Flex> */}

        <Space vertical={30} />

        <CustomButton
          width="100%"
          onClick={onSubmitEmail}
          style={{ boxShadow: "8px 8px 16px #d1d9e6, -8px -8px 16px #f9f9f9" }}
        >
          Sign in
        </CustomButton>

        <Space vertical={30} />

        <ThemedText>
          Don&apos;t have account yet?{" "}
          <Span onClick={() => router.push("/auth/register")}>Join Us</Span>
        </ThemedText>
      </div>
    </Layout>
  );
}
