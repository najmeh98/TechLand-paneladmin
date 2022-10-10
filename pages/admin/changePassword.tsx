import axios from "axios";
import { useRouter } from "next/router";
import React, { useCallback, useState } from "react";
import { config } from "../../components/Api";
import { useAppContext } from "../../components/AppManag.tsx/AppContext";
import { useTheme } from "../../components/Context/ThemeContext";
import { CustomButton } from "../../components/CustomButton";
import { CustomInput } from "../../components/CustomInput";
import { Space } from "../../components/share/Space";
import { ThemedText } from "../../components/ThemedText";
import { Theme } from "../../components/types/theme";
import { UserLayout } from "../../components/users/UserLayout";
import { ButtonRow } from "../users/userInfo";

interface OwnProp {
  currentpassword: string;
  newpassword: string;
  renewpassword: string;
}

export default function ChangePassword(): JSX.Element {
  const t: Theme = useTheme();
  const router = useRouter();
  const { adminInfo } = useAppContext();
  const token: string = adminInfo?.token;

  console.log(adminInfo);

  const id: number = adminInfo?.id ?? 0;

  const [adminPassword, setadminPassword] = useState<OwnProp>({
    currentpassword: "",
    newpassword: "",
    renewpassword: "",
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>(undefined);

  const updatePassword = useCallback(async (): Promise<void> => {
    if (adminPassword.newpassword !== adminPassword.renewpassword) {
      setError("Confirm password is not matched");
    }
    try {
      setLoading(true);

      axios
        .post(
          `${config.apiUrl}/api/admin/changePassword?query=${id}`,
          {
            adminPassword,
          },
          {
            headers: {
              authorization: token,
            },
          }
        )
        .then((result) => {
          if ((result?.status as number) == 200) {
            console.log(result);
            setadminPassword({
              currentpassword: "",
              newpassword: "",
              renewpassword: "",
            });
            router.push("/");
          } else {
            console.log(error);
          }
        })
        .catch((err) => console.log(err));
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }, [adminPassword, error, id, router, token]);

  return (
    <UserLayout title="Password" width="70%" style={{ padding: "30px 50px" }}>
      <div className="space-y-7">
        <ThemedText style={{ color: t.color.borderColor }} className="pt-4">
          Please enter your current password to change your password
        </ThemedText>

        <CustomInput
          type="password"
          label="Current password"
          // width="90%"
          value={adminPassword.currentpassword}
          onChange={(event) =>
            setadminPassword({
              ...adminPassword,
              currentpassword: event.currentTarget.value,
            })
          }
          style={{ marginRight: "40px" }}
        />

        <CustomInput
          type="password"
          label="New password"
          // width="90%"
          value={adminPassword.newpassword}
          onChange={(event) =>
            setadminPassword({
              ...adminPassword,
              newpassword: event.currentTarget.value,
            })
          }
          style={{ marginRight: "40px" }}
        />

        <CustomInput
          type="password"
          label="Confirm new password "
          // width="90%"
          value={adminPassword.renewpassword}
          onChange={(event) =>
            setadminPassword({
              ...adminPassword,
              renewpassword: event.currentTarget.value,
            })
          }
          style={{ marginRight: "40px" }}
        />

        <ButtonRow style={{ marginRight: "40px" }}>
          <CustomButton onClick={() => router.push("/")} padding="0px 15px">
            Cancel
          </CustomButton>

          <CustomButton
            onClick={updatePassword}
            padding="0px 15px"
            style={{ paddingLeft: "10px" }}

            //   disable={loading}
          >
            Update password
          </CustomButton>
        </ButtonRow>
      </div>
    </UserLayout>
  );
}
