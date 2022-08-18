import axios from "axios";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { changePassword, config } from "../../components/Api";
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
  const [error, setError] = useState<string | undefined>("");

  const updatePassword = async (): Promise<void> => {
    if (adminPassword.newpassword !== adminPassword.renewpassword) {
      setError("Confirm password is not matched");
    }
    try {
      setLoading(true);
      //   const result = await changePassword(newPassword, token, id);

      //   if ((result?.status as number) == 200) {
      //     console.log(result);
      //     setLoading(false);
      //   }
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
  };

  return (
    <UserLayout title="Password" width="70%" style={{ padding: "20px 30px" }}>
      <ThemedText style={{ padding: "20px 0px", color: t.color.borderColor }}>
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
      <Space vertical={20} />

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
      <Space vertical={20} />

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
      <Space vertical={20} />

      <ButtonRow style={{ marginRight: "40px" }}>
        <CustomButton onClick={() => router.push("/")}>Cancel</CustomButton>
        <CustomButton
          onClick={updatePassword}
          padding="10px 20px"
          style={{ paddingLeft: "10px" }}

          //   disable={loading}
        >
          Update password
        </CustomButton>
      </ButtonRow>
    </UserLayout>
  );
}
