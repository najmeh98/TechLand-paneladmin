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
import { Flex } from "../../components/share/Container";
import { AxiosError } from "axios";
import { useAppContext } from "../../components/AppManag.tsx/AppContext";
import { Theme } from "../../components/types/theme";
import { loginProp } from "./authType";

export default function LoginByEmail(): JSX.Element {
  const [loading, setLoading] = useState<boolean>(false);
  const [loginInfo, setLoginInfo] = useState<loginProp>({
    email: "",
    password: "",
  });

  const { dispatch, login: CheckLoggedIn } = useAppContext();

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
  }, [CheckLoggedIn, dispatch, loginInfo.email, loginInfo.password, router]);

  return (
    <Layout>
      <div
        style={{
          width: "100%",
          // maxWidth: "70%",
          // padding: "40px",
          margin: "6px",
          direction: "ltr",
        }}
      >
        <ThemedText
          style={{
            fontWeight: t.fontWeight.bold,
            fontSize: t.fontSize.medium,
            marginBottom: t.margin.Large,
          }}
        >
          Login
        </ThemedText>

        <Space vertical={30} />

        <ThemedText>Login to your account</ThemedText>

        <Space vertical={25} />

        <CustomInput
          label="Email :"
          placeholder="email"
          type="text"
          value={loginInfo.email}
          onChange={(event) =>
            setLoginInfo({ ...loginInfo, email: event.currentTarget.value })
          }
        />
        <Space vertical={15} />

        <CustomInput
          label="Password :"
          placeholder="password"
          type="password"
          value={loginInfo.password}
          onChange={(event) =>
            setLoginInfo({ ...loginInfo, password: event.currentTarget.value })
          }
        />

        <Flex style={{ paddingTop: "10px" }}>
          <div>
            <input type={"checkbox"} />
            <span>Remember me</span>
          </div>
          <span>Reset Password?</span>
        </Flex>

        <Space vertical={12} />

        <CustomButton
          width="100%"
          onClick={onSubmitEmail}
          // style={{ color: "#163655" }}
        >
          Sign in
        </CustomButton>

        <ThemedText style={{ padding: "20px 0px" }}>
          Don&apos;t have account yet?{" "}
          <Span onClick={() => router.push("/auth/register")}>Join Us</Span>
        </ThemedText>
      </div>
    </Layout>
  );
}
