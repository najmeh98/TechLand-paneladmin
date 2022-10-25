import { AxiosError } from "axios";
import { NextRouter, useRouter } from "next/router";
import React, { useCallback, useState } from "react";
import { adminCreate } from "../../components/Api";
import { useAppContext } from "../../components/AppManag.tsx/AppContext";
import { CustomButton } from "../../components/CustomButton";
import { CustomInput } from "../../components/CustomInput";
import { FormItem, FlexRow } from "../../components/share/Container";
import { ErrorText } from "../../components/share/ErrorText";
import { Toaster } from "../../components/Toast";
import { UserLayout } from "../../components/users/UserLayout";
import { dataValidation } from "../../components/utils/dataValidation";
import { OwnProp } from "../auth/authType";
import { ButtonRow } from "../users/userInfo";
import "react-toastify/ReactToastify.min.css";
import { ToastContainer } from "react-toastify";

export default function AdminCreate(): JSX.Element {
  const [admin, setadmin] = useState<OwnProp>({
    name: "",
    family: "",
    email: "",
    phoneNumber: 0,
    username: "",
    password: "",
    repassword: "",
    address: "",
  });

  const [loading, setloading] = useState<boolean>(false);

  const [error, setError] = useState<string | undefined>(undefined);

  const { adminInfo } = useAppContext();

  const token: string = adminInfo?.token;

  const router: NextRouter = useRouter();

  const { showToastr } = Toaster();

  const handleCreateAdmin = useCallback(async (): Promise<void> => {
    const checkInfo: boolean = dataValidation(admin);

    if (checkInfo == false) {
      setError("Enter all information");
      return;
    }

    if (admin.password !== admin.repassword) {
      setError("password and duplicate password are not the same!");
      return;
    } else {
      try {
        setloading(true);
        setError("");

        const result = await adminCreate(admin, token);

        console.log(result);

        if ((result?.status as number) == 200) {
          setloading(false);

          // done
          showToastr("Success", "The request was made successfully");

          setTimeout(() => {
            router.push("/");
          }, 5000);
        }
      } catch (error) {
        const err = error as AxiosError;
        if (err.response) {
          switch (err.response?.status as number) {
            case 403:
              // "Error in creating a new post"
              showToastr("Error", "Admin already exists");
              break;

            case 400:
              showToastr("Error", "The request encountered an error");
              break;

            case 404:
              showToastr("Error", "Enter the data correctly");
              break;

            default:
              showToastr("Error", "Server Error");
              break;
          }
        }
      }
    }
  }, [admin, router, showToastr, token]);

  return (
    <>
      <ToastContainer />

      <UserLayout title="Create new Admin" width="85%">
        <FormItem style={{ padding: "30px" }} className="space-y-7">
          <FlexRow>
            <CustomInput
              type="text"
              label="Name"
              width="45%"
              value={admin.name}
              onChange={(event) =>
                setadmin({ ...admin, name: event.currentTarget.value })
              }
            />

            <CustomInput
              type="text"
              label="Last name"
              width="45%"
              value={admin.family}
              onChange={(event) =>
                setadmin({ ...admin, family: event.currentTarget.value })
              }
            />
          </FlexRow>
          {/* <Space vertical={15} /> */}

          <FlexRow>
            <CustomInput
              type="text"
              label="Email"
              width="45%"
              value={admin.email}
              onChange={(event) =>
                setadmin({ ...admin, email: event.currentTarget.value })
              }
            />

            <CustomInput
              type="text"
              label="Username"
              width="45%"
              value={admin.username}
              onChange={(event) =>
                setadmin({ ...admin, username: event.currentTarget.value })
              }
            />
          </FlexRow>

          <FlexRow>
            <CustomInput
              type="password"
              label="Password"
              width="45%"
              value={admin.password}
              onChange={(event) =>
                setadmin({ ...admin, password: event.currentTarget.value })
              }
            />

            <CustomInput
              type="password"
              label="Repassword"
              width="45%"
              value={admin.repassword}
              onChange={(event) =>
                setadmin({ ...admin, repassword: event.currentTarget.value })
              }
            />
          </FlexRow>

          <FlexRow>
            <CustomInput
              type="text"
              label="Address"
              width="45%"
              value={admin.address}
              onChange={(event) =>
                setadmin({ ...admin, address: event.currentTarget.value })
              }
            />

            <CustomInput
              type="text"
              label="phoneNumber"
              width="45%"
              value={admin.phoneNumber}
              onChange={(event) =>
                setadmin({
                  ...admin,
                  phoneNumber: event.currentTarget.value as unknown as number,
                })
              }
            />
          </FlexRow>

          <ButtonRow>
            <CustomButton
              style={{ marginRight: "20px" }}
              padding=" 0px 15px"
              onClick={() => router.push("/")}
            >
              Cancel
            </CustomButton>
            <CustomButton padding=" 0px 15px" onClick={handleCreateAdmin}>
              Containue
            </CustomButton>
          </ButtonRow>

          {error && <ErrorText>{error}</ErrorText>}
        </FormItem>
      </UserLayout>
    </>
  );
}
