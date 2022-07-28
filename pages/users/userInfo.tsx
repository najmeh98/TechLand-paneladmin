import { useRouter } from "next/router";
import { useState } from "react";
import styled from "styled-components";
import { EdituserInfo } from "../../components/Api";
import { useAppContext } from "../../components/AppManag.tsx/AppContext";
import { useTheme } from "../../components/Context/ThemeContext";
import { CustomButton } from "../../components/CustomButton";
import { CustomInput } from "../../components/CustomInput";
import { Flex, FlexRow, FormItem } from "../../components/share/Container";
import { Space } from "../../components/share/Space";
import { ThemedText } from "../../components/ThemedText";
import { UserLayout } from "../../components/users/UserLayout";
import { InfoProp } from "./type";

export default function UserInfo(): JSX.Element {
  const t = useTheme();
  const router = useRouter();
  const { dispatch, allUsers, adminInfo } = useAppContext();

  const id: any = router.query?.id;
  const filteruser: any = allUsers.filter((user) => user.id == id);
  const index: any = allUsers.findIndex((user) => user.id == id);
  console.log(index);
  const profile = allUsers[index];
  console.log("profile", profile);

  const [userInfo, setuserInfo] = useState<InfoProp>({
    name: profile?.name || "",
    family: profile?.family || "",
    email: profile?.email || "",
    phoneNumber: profile?.phoneNumber || "",
    address: profile?.address || "",
    username: profile?.username || "",
  });

  console.log(filteruser);

  const token: string = adminInfo?.token;

  const editInfohandler = async (): Promise<void> => {
    const res: any = await EdituserInfo(adminInfo, token, id);
    console.log(res);
  };

  return (
    <UserLayout title="Personal Info" width="70%">
      <FormItem style={{ padding: "45px" }}>
        <Wrapper>
          <Img src="/flower1.jpg" width="70px" height="70px" alt="profile" />

          <InfoStyle>
            <ThemedText
              style={{
                fontSize: t.fontSize.medium,
                paddingBottom: t.padding.small,
              }}
            >
              Sara Tancredi
            </ThemedText>
            <ThemedText
              style={{ fontSize: t.fontSize.smaller, color: "#a3a1a0" }}
            >
              New York, USA
            </ThemedText>
          </InfoStyle>
        </Wrapper>

        <FlexRow style={{ paddingTop: "30px" }}>
          <CustomInput
            type="text"
            label="Name"
            width="45%"
            value={userInfo.name}
            onChange={() => setuserInfo({ ...userInfo, name: userInfo.name })}
          />
          <CustomInput
            type="text"
            label="Full Name"
            width="45%"
            value={userInfo.family}
            onChange={() =>
              setuserInfo({ ...userInfo, family: userInfo.family })
            }
          />
        </FlexRow>

        <FlexRow style={{ paddingTop: "30px" }}>
          <CustomInput
            type="text"
            label="Email Address"
            width="45%"
            value={userInfo.email}
            onChange={() => setuserInfo({ ...userInfo, email: userInfo.email })}
          />
          <CustomInput
            type="text"
            label="Phone Number"
            width="45%"
            value={userInfo.phoneNumber}
            onChange={() =>
              setuserInfo({ ...userInfo, phoneNumber: userInfo.phoneNumber })
            }
          />
        </FlexRow>

        <FlexRow style={{ paddingTop: "30px" }}>
          <CustomInput
            type="text"
            label="address"
            width="45%"
            value={userInfo.address}
            onChange={() =>
              setuserInfo({ ...userInfo, address: userInfo.address })
            }
          />
          <CustomInput
            type="text"
            label="username"
            width="45%"
            value={userInfo.username}
            onChange={() =>
              setuserInfo({ ...userInfo, username: userInfo.username })
            }
          />
        </FlexRow>
        <Space vertical="20px" />
        <ButtonRow>
          <CustomButton
            padding="10px 20px"
            style={{ marginRight: " 20px" }}
            onClick={() => {
              router.push("/");
            }}
          >
            Cancel
          </CustomButton>

          <CustomButton padding=" 10px 20px" onClick={editInfohandler}>
            Save Changes
          </CustomButton>
        </ButtonRow>
      </FormItem>
    </UserLayout>
  );
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
`;

const Img = styled.img`
  border-radius: 50%;
`;

const InfoStyle = styled.div`
  padding-left: 30px;
`;

const ButtonRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;
