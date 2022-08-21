import axios, { AxiosError } from "axios";
import { useRouter } from "next/router";
import { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { config, Verification } from "../../components/Api";
import { useAppContext } from "../../components/AppManag.tsx/AppContext";
import { useTheme } from "../../components/Context/ThemeContext";
import { CustomButton } from "../../components/CustomButton";
import { CustomInput } from "../../components/CustomInput";
import { Layout } from "../../components/register/Layout";
import { FlexRow } from "../../components/share/Container";
import { Space } from "../../components/share/Space";
import { ThemedText } from "../../components/ThemedText";
import { ToasterRef, ToasterProps } from "../../components/types/toastr";
import { OwnProp } from "./authType";

export default function Register(): JSX.Element {
  let [admin, setadmin] = useState<OwnProp>({
    name: "",
    family: "",
    password: "",
    repassword: "",
    username: "",
    email: "",
    address: "",
    phoneNumber: "0",
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const router = useRouter();
  const t = useTheme();

  const { dispatch, login: CheckLoggedIn } = useAppContext();

  const toastrRef = useRef<ToasterRef>(null);

  const [data] = useState<ToasterProps>({
    position: "",
    duration: 3500,
    hasIcon: true,
    destoryByClick: true,
  });

  // const showToastr = (
  //   mode: string,
  //   title: string,
  //   description: string
  // ): void => {
  //   toastrRef.current?.add(description, title, { ...data, status: mode });
  // };

  const onSubmitVerification = useCallback(async (): Promise<void> => {
    if (admin.password !== admin.repassword) {
      // return showToastr("Danger", "error", "error is here");
      setError("password and duplicate password are not the same!");
    } else {
      try {
        setLoading(true);
        const result = await Verification({ admin });
        setLoading(false);
        console.log(result);

        if ((result?.status as number) == 200) {
          CheckLoggedIn({ ...result?.data });

          //update the auth context
          dispatch({ type: "LOGGED IN", payload: { ...result?.data.admin } });

          router.push("/");
        }
      } catch (error) {
        setLoading(false);
        const err = error as AxiosError;

        if (err.response) {
          switch (err.response?.status as number) {
            case 400:
              break;

            default:
              break;
          }
        }
      }
    }
  }, [CheckLoggedIn, admin, dispatch, router]);
  useEffect(() => {
    console.log(toastrRef.current);
  }, []);

  return (
    <>
      <Layout>
        <div
          style={{
            width: "100%",
            direction: "ltr",
            // padding: "20px ",
          }}
        >
          <ThemedText
            style={{
              fontWeight: t.fontWeight.bold,
              fontSize: t.fontSize.medium,
              marginBottom: t.margin.Large,
            }}
          >
            Register
          </ThemedText>

          <FlexRow>
            <CustomInput
              label="name"
              placeholder="Name"
              type="text"
              value={admin.name}
              onChange={(event) =>
                setadmin({ ...admin, name: event.currentTarget.value })
              }
              width="100%"
            />

            <CustomInput
              label="last Name"
              placeholder="Last name"
              type="text"
              value={admin.family}
              onChange={(event) =>
                setadmin({ ...admin, family: event.currentTarget.value })
              }
              width="100%"
            />
          </FlexRow>

          <FlexRow>
            <CustomInput
              label="password :"
              placeholder="password"
              type="password"
              value={admin.password}
              onChange={(event) =>
                setadmin({ ...admin, password: event.currentTarget.value })
              }
              width="100%"
            />

            <CustomInput
              label="repassword :"
              placeholder="repassword"
              type="password"
              value={admin.repassword}
              onChange={(event) =>
                setadmin({ ...admin, repassword: event.currentTarget.value })
              }
              width="100%"
            />
          </FlexRow>

          <FlexRow>
            <CustomInput
              label="username"
              placeholder="Username"
              type="text"
              value={admin.username}
              onChange={(event) =>
                setadmin({ ...admin, username: event.currentTarget.value })
              }
              width="100%"
            />

            <CustomInput
              label="phoneNumber"
              placeholder="phoneNumber"
              type="text"
              value={admin.phoneNumber}
              onChange={(event) =>
                setadmin({ ...admin, phoneNumber: event.currentTarget.value })
              }
              width="100%"
            />
          </FlexRow>

          <Space vertical={3} />

          <CustomInput
            label="address"
            placeholder="address"
            type="text"
            value={admin.address}
            onChange={(event) =>
              setadmin({ ...admin, address: event.currentTarget.value })
            }
            // width="100%"
          />

          <Space vertical={3} />

          <CustomInput
            label="email"
            placeholder="email"
            type="text"
            value={admin.email}
            onChange={(event) => {
              setadmin({ ...admin, email: event.currentTarget.value });
            }}
            // width="100%"
          />

          <Space vertical={15} />

          <CustomButton onClick={onSubmitVerification}>
            Create Account
          </CustomButton>
          <ThemedText
            style={{
              display: "flex",
              alignItems: "center",
              textAlign: "center",
              justifyContent: "flex-start",
              padding: "10px 0px",
            }}
          >
            Already have an account ?{" "}
            <Span onClick={() => router.push("/auth/loginByEmail")}>
              Log in
            </Span>
          </ThemedText>

          {/* <Toast ref={toastrRef} /> */}
        </div>
      </Layout>
    </>
  );
}

const Label = styled.label`
  /* width: 100%; */
  padding-left: 5px;
`;

const RowStyle = styled.div`
  width: 49%;
`;

export const Span = styled.span`
  padding-left: 5px;
  color: #2e82aa;
  font-weight: bold;
`;
