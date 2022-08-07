import { AxiosError } from "axios";
import { useRouter } from "next/router";
import { useCallback, useState } from "react";
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

  console.log("users", allUsers);

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
    skill: profile?.skill || "",
    bio: profile?.bio || "",
  });

  const [loading, setLoading] = useState<boolean>(false);

  console.log(filteruser);

  const token: string = adminInfo?.token;

  const editInfohandler = useCallback(async (): Promise<void> => {
    try {
      setLoading(true);
      const result: any = await EdituserInfo(userInfo, id, token);
      console.log(result);

      if ((result?.status as number) == 200) {
        //user info
        dispatch({ type: "LIST OF USERS", payload: result?.data });
        router.push("/");
      }
    } catch (error) {
      setLoading(false);
      const err = error as AxiosError;
      if (err.response?.status == 400) {
        //edit problem
      } else if (err.response?.status == 401) {
        // data problem
      } else {
        // 500 error
      }
    }
  }, [dispatch, id, router, token, userInfo]);

  const fullname: string = `${userInfo.name} ${userInfo.family}`;

  return (
    <UserLayout title="Personal Info" width="85%">
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
              {fullname}
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
            label="Last name"
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
            label="Address"
            width="45%"
            value={userInfo.address}
            onChange={() =>
              setuserInfo({ ...userInfo, address: userInfo.address })
            }
          />
          <CustomInput
            type="text"
            label="Username"
            width="45%"
            value={userInfo.username}
            onChange={() =>
              setuserInfo({ ...userInfo, username: userInfo.username })
            }
          />
        </FlexRow>

        <FlexRow style={{ paddingTop: "30px" }}>
          <CustomInput
            type="textarea"
            column={10}
            row={4}
            label="Skill"
            width="45%"
            value={userInfo.skill}
            onChange={() => setuserInfo({ ...userInfo, skill: userInfo.skill })}
          />
          <CustomInput
            type="textarea"
            label="Bio"
            row={4}
            column={10}
            width="45%"
            value={userInfo.bio}
            onChange={() => setuserInfo({ ...userInfo, bio: userInfo.bio })}
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

export const ButtonRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;
