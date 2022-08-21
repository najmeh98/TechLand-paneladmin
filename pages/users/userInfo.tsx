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

  const [userInfo, setuserInfo] = useState<InfoProp>({
    name: "",
    family: "",
    email: "",
    phoneNumber: "",
    address: "",
    username: "",
    skill: "",
    bio: "",
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
            value={profile.name}
            onChange={(event) =>
              setuserInfo({ ...userInfo, name: event.currentTarget.value })
            }
          />
          <CustomInput
            type="text"
            label="Last name"
            width="45%"
            value={profile.family}
            onChange={(event) =>
              setuserInfo({ ...userInfo, family: event?.currentTarget.value })
            }
          />
        </FlexRow>

        <FlexRow style={{ paddingTop: "30px" }}>
          <CustomInput
            type="text"
            label="Email Address"
            width="45%"
            value={profile.email}
            onChange={(event) =>
              setuserInfo({ ...userInfo, email: event?.currentTarget.value })
            }
          />
          <CustomInput
            type="text"
            label="Phone Number"
            width="45%"
            value={profile.phoneNumber}
            onChange={(event) =>
              setuserInfo({
                ...userInfo,
                phoneNumber: event.currentTarget.value,
              })
            }
          />
        </FlexRow>

        <FlexRow style={{ paddingTop: "30px" }}>
          <CustomInput
            type="text"
            label="Address"
            width="45%"
            value={profile.address}
            onChange={(event) =>
              setuserInfo({ ...userInfo, address: event.currentTarget.value })
            }
          />
          <CustomInput
            type="text"
            label="Username"
            width="45%"
            value={profile.username}
            onChange={(event) =>
              setuserInfo({ ...userInfo, username: event?.currentTarget.value })
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
            value={profile.skill}
            onChange={(event) =>
              setuserInfo({ ...userInfo, skill: event.currentTarget.value })
            }
          />
          <CustomInput
            type="textarea"
            label="Bio"
            row={4}
            column={10}
            width="45%"
            value={profile.bio}
            onChange={(event) =>
              setuserInfo({ ...userInfo, bio: event.currentTarget.value })
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

export const ButtonRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;
