import React, { useCallback, useState } from "react";
import { useRouter } from "next/router";
import { Login } from "../../components/Api";
import { CustomInput } from "../../components/CustomInput";
import { Layout } from "../../components/register/Layout";
import { Space } from "../../components/share/Space";
import { CustomButton } from "../../components/CustomButton";
import { Span } from "./register";
import { AxiosError } from "axios";
import { useAppContext } from "../../components/AppManag.tsx/AppContext";
import { loginProp } from "../../components/types/authType";
import "react-toastify/ReactToastify.min.css";
import { ToastContainer } from "react-toastify";
import { Toaster } from "../../components/Toast";
import { ErrorText } from "../../components/share/ErrorText";

export default function LoginByEmail(): JSX.Element {
  const [loading, setLoading] = useState<boolean>(false);
  const [loginInfo, setLoginInfo] = useState<loginProp>({
    email: "",
    password: "",
  });
  const [error, setError] = useState<string>("");

  const { dispatch, login: CheckLoggedIn } = useAppContext();

  const router = useRouter();

  const { showToastr } = Toaster();

  const onSubmitEmail = useCallback(async (): Promise<void> => {
    if (!loginInfo.email || !loginInfo.password) {
      setError("Enter all information");
      return;
    }
    try {
      setLoading(true);
      const result = await Login(loginInfo.email, loginInfo.password);

      setLoading(false);
      if ((result?.status as number) == 200) {
        CheckLoggedIn({ ...result?.data });
        //set logg in dispatch
        // dispatch({ type: "LOGGED IN", payload: { ...result?.data } });

        showToastr("Success", "You have successfully logged in");

        setTimeout(() => {
          router.push("/");
        }, 5000);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      const err = error as AxiosError;
      if (err.response) {
        switch (err.response?.status as number) {
          case 401:
            // Authentication
            showToastr("Error", "User not found");
            break;

          case 404:
            showToastr("Error", "Enter the data correctly");
            break;

          case 400:
            showToastr("Error", "The request encountered an error");
            break;

          case 500:
            showToastr("Error", "Server Error");
            break;
        }
      }
    }
  }, [CheckLoggedIn, loginInfo.email, loginInfo.password, router, showToastr]);

  return (
    <>
      <ToastContainer />

      <Layout
        title="Hello Friends !"
        text="Enter your personal details to open an account with us"
        button="sign up"
        path={() => router.push("./register")}
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
              setLoginInfo({
                ...loginInfo,
                password: event.currentTarget.value,
              })
            }
          />

          <Space vertical={20} />
          {error && <ErrorText>{error}</ErrorText>}

          <Space vertical={10} />

          <CustomButton
            width="100%"
            onClick={onSubmitEmail}
            style={{
              boxShadow: "8px 8px 16px #d1d9e6, -8px -8px 16px #f9f9f9",
            }}
          >
            Sign in
          </CustomButton>

          <Space vertical={20} />

          <p className="cursor-pointer hidden maxlg:block">
            Don&apos;t have account yet?{" "}
            <Span onClick={() => router.push("/auth/register")}>Join Us</Span>
          </p>
        </div>
      </Layout>

      <div className="flex items-center justify-center"></div>
    </>
  );
}
