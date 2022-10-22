import { AxiosError } from "axios";
import { useRouter } from "next/router";
import { useCallback, useRef, useState } from "react";
import styled from "styled-components";
import { Verification } from "../../components/Api";
import { useAppContext } from "../../components/AppManag.tsx/AppContext";
import { CustomButton } from "../../components/CustomButton";
import { CustomInput } from "../../components/CustomInput";
import { HeaderText } from "../../components/HeaderText";
import Input from "../../components/Input";
import { Layout } from "../../components/register/Layout";
import { FlexRow } from "../../components/share/Container";
import { ErrorText } from "../../components/share/ErrorText";
import { Space } from "../../components/share/Space";
import { Toaster } from "../../components/Toast";
import { ToasterRef, ToasterProps } from "../../components/types/toastr";
import { dataValidation } from "../../components/utils/dataValidation";
import { OwnProp } from "./authType";
import "react-toastify/ReactToastify.min.css";
import { ToastContainer } from "react-toastify";

export default function Register(): JSX.Element {
  let [admin, setadmin] = useState<OwnProp>({
    name: "",
    family: "",
    password: "",
    repassword: "",
    username: "",
    email: "",
    address: "",
    phoneNumber: 0,
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const router = useRouter();

  const { dispatch, login: CheckLoggedIn } = useAppContext();

  const { showToastr } = Toaster();

  // const toastrRef = useRef<ToasterRef>(null);

  // const [data] = useState<ToasterProps>({
  //   position: "",
  //   duration: 3500,
  //   hasIcon: true,
  //   destoryByClick: true,
  // });

  const onSubmitVerification = useCallback(async (): Promise<void> => {
    const data = dataValidation(admin);

    if (data == false) {
      setError("Enter all Information");
    }

    if (admin.password !== admin.repassword) {
      // return showToastr("Danger", "error", "error is here");
      setError("password and duplicate password are not the same!");
      return;
    } else {
      try {
        setLoading(true);
        const result = await Verification({ admin });
        setLoading(false);
        console.log(result);

        if ((result?.status as number) == 200) {
          CheckLoggedIn({ ...result?.data });

          showToastr("Success", "You have successfully register");

          setTimeout(() => {
            router.push("/");
          }, 5000);
        }
      } catch (error) {
        setLoading(false);
        const err = error as AxiosError;

        if (err.response) {
          switch (err.response?.status as number) {
            case 400:
              showToastr("Error", "The request encountered an error");
              break;

            default:
              break;
          }
        }
      }
    }
  }, [CheckLoggedIn, admin, router, showToastr]);

  return (
    <>
      <ToastContainer />

      <Layout
        title="welcome back !"
        text="To keep connected with us plaese login with your personal details"
        button="sign in"
      >
        <div
          style={{
            width: "100%",
            direction: "ltr",
          }}
        >
          <HeaderText className="flex items-center justify-center w-full whitespace-nowrap maxsm:text-2xl">
            create account
          </HeaderText>

          <Space vertical={30} />

          <FlexRow style={{ marginBottom: "30px" }}>
            <CustomInput
              label=" First Name"
              // placeholder="Name"
              type="text"
              value={admin.name}
              onChange={(event) =>
                setadmin({ ...admin, name: event.currentTarget.value })
              }
              width="100%"
            />

            <CustomInput
              label="Last Name"
              // placeholder="Last name"
              type="text"
              value={admin.family}
              style={{ paddingLeft: "10px" }}
              onChange={(event) =>
                setadmin({ ...admin, family: event.currentTarget.value })
              }
              width="100%"
            />
          </FlexRow>

          <FlexRow style={{ marginBottom: "30px" }}>
            <CustomInput
              label="Password "
              // placeholder="password"
              type="password"
              value={admin.password}
              onChange={(event) =>
                setadmin({ ...admin, password: event.currentTarget.value })
              }
              width="100%"
            />

            <CustomInput
              label="Repassword "
              // placeholder="repassword"
              style={{ paddingLeft: "10px" }}
              type="password"
              value={admin.repassword}
              onChange={(event) =>
                setadmin({ ...admin, repassword: event.currentTarget.value })
              }
              width="100%"
            />
          </FlexRow>

          <FlexRow style={{ marginBottom: "30px" }}>
            <CustomInput
              label="Username"
              // placeholder="Username"
              type="text"
              value={admin.username}
              onChange={(event) =>
                setadmin({ ...admin, username: event.currentTarget.value })
              }
              width="100%"
            />

            <CustomInput
              label="PhoneNumber"
              // placeholder="phoneNumber"
              style={{ paddingLeft: "10px" }}
              type="text"
              value={admin.phoneNumber}
              onChange={(event) =>
                setadmin({
                  ...admin,
                  phoneNumber: parseInt(event.currentTarget.value),
                })
              }
              width="100%"
            />
          </FlexRow>

          <Space vertical={3} />

          <CustomInput
            label="Address"
            // placeholder="address"
            type="text"
            value={admin.address}
            onChange={(event) =>
              setadmin({ ...admin, address: event.currentTarget.value })
            }
            // width="100%"
          />

          <Space vertical={30} />

          <CustomInput
            label="Email"
            // placeholder="email"
            type="text"
            value={admin.email}
            onChange={(event) => {
              setadmin({ ...admin, email: event.currentTarget.value });
            }}
            // width="100%"
          />

          <Space vertical={20} />

          {error && <ErrorText>{error}</ErrorText>}

          <CustomButton onClick={onSubmitVerification}>
            Create Account
          </CustomButton>
          <Space vertical={10} />

          <p className="flex items-center justify-start text-center cursor-pointer">
            Already have an account ?
            <Span onClick={() => router.push("/auth/loginByEmail")}>
              Log in
            </Span>
          </p>

          {/* <Toast ref={toastrRef} /> */}
        </div>
      </Layout>
      <Input />
    </>
  );
}

const RowStyle = styled.div`
  width: 49%;
`;

export const Span = styled.span`
  padding-left: 5px;
  color: #2e82aa;
  font-weight: bold;
`;
