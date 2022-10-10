import { AxiosError } from "axios";
import { NextRouter, useRouter } from "next/router";
import React, { useCallback, useState } from "react";
import { adminCreate } from "../../components/Api";
import { useAppContext } from "../../components/AppManag.tsx/AppContext";
import { useTheme } from "../../components/Context/ThemeContext";
import { CustomButton } from "../../components/CustomButton";
import { CustomInput } from "../../components/CustomInput";
import { FormItem, FlexRow } from "../../components/share/Container";
import { Space } from "../../components/share/Space";
import { Theme } from "../../components/types/theme";
import { UserLayout } from "../../components/users/UserLayout";
import { OwnProp } from "../auth/authType";
import { ButtonRow } from "../users/userInfo";

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

  // const token: any = localStorage.getItem("@adnTK");

  const router: NextRouter = useRouter();
  const t: Theme = useTheme();

  const handleCreateAdmin = useCallback(async (): Promise<void> => {
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
          router.push("/");
          // done
        }
      } catch (error) {
        const err = error as AxiosError;
        if (err.response) {
          switch (err.response?.status as number) {
            case 400:
              // return
              break;

            default:
              break;
          }
        }
      }
    }
  }, [admin, router, token]);

  return (
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
                phoneNumber: parseInt(event.currentTarget.value),
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
      </FormItem>
    </UserLayout>
  );
}
