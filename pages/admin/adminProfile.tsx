import axios from "axios";
import { NextRouter, useRouter } from "next/router";
import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { config } from "../../components/Api";
import { useAppContext } from "../../components/AppManag.tsx/AppContext";
import { useTheme } from "../../components/Context/ThemeContext";
import { CustomButton } from "../../components/CustomButton";
import { CustomInput } from "../../components/CustomInput";
import ProfileimgUploader from "../../components/ProfileimgUploader";
import { FlexRow, FormItem, Wrapper } from "../../components/share/Container";
import { Space } from "../../components/share/Space";
import { ThemedText } from "../../components/ThemedText";
import { Theme } from "../../components/types/theme";
import { UserLayout } from "../../components/users/UserLayout";
import { ProfileProp } from "./adprofiletype";

export default function AdminProfile(): JSX.Element {
  const t: Theme = useTheme();
  const router: NextRouter = useRouter();
  const { adminInfo, dispatch } = useAppContext();

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>("");
  const [image, setImage] = useState<string>("");

  const [admin, setadmin] = useState<ProfileProp>({
    name: "",
    family: "",
    username: "",
    email: "",
    phoneNumber: 0,
    address: "",
    bio: "",
    job: "",
  });

  useEffect(() => {
    setadmin({
      name: adminInfo?.name,
      family: adminInfo?.family,
      username: adminInfo?.username,
      email: adminInfo?.email,
      phoneNumber: adminInfo?.phoneNumber,
      address: adminInfo?.address,
      bio: adminInfo?.bio,
      job: adminInfo?.job,
    });
  }, [
    adminInfo?.address,
    adminInfo?.bio,
    adminInfo?.email,
    adminInfo?.family,
    adminInfo?.job,
    adminInfo?.name,
    adminInfo?.phoneNumber,
    adminInfo?.username,
  ]);

  console.log("fieldadmin", image);
  console.log("adminInfo", adminInfo);

  const id: number | undefined = adminInfo?.id;

  const updateadminInfo = useCallback(async (): Promise<void> => {
    setError("");
    setLoading(true);

    const formData: any = new FormData();
    formData.append("image", image);
    formData.append("admin", admin);

    try {
      const res = await axios.post(
        `${config.apiUrl}/api/admin/profile/${id}`,
        formData,
        {
          headers: {
            authorization: adminInfo?.token,
          },
        }
      );
      setLoading(false);
      if ((res.status as number) == 200) {
        console.log(res);
        const data: any = res?.data;

        dispatch({ type: "LOGGED IN", payload: data });
        router.push("/");
      } else {
        console.log(error);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }, [admin, adminInfo?.token, dispatch, error, id, image, router]);

  return (
    <UserLayout title="About You" width="90%">
      <FormItem style={{ padding: " 50px" }}>
        <FlexRow style={{ alignItems: "center", marginBottom: "15px" }}>
          {/* profile of admin */}

          <div className=" rounded-full cursor-pointer">
            <ProfileimgUploader
              setImage={setImage}
              image={image}
              newImage={adminInfo?.image}
            />
          </div>

          <FormItem>
            <ThemedText
              style={{
                fontSize: t.fontSize.semiLarge,
                fontWeight: t.fontWeight.bold,
                paddingBottom: t.padding.small,
              }}
            >
              Profile
            </ThemedText>
            <ThemedText style={{ color: t.color.titleColor }}>
              Update your photo and personal details here.
            </ThemedText>
          </FormItem>

          <Wrapper>
            <CustomButton
              color="fontColor"
              bgcolor="bgColor"
              style={{ border: "1px solid lightgray", borderRadius: "5px" }}
              onClick={() => {
                router.push("/");
              }}
              padding=" 0px 15px"
            >
              Cancel
            </CustomButton>
            <CustomButton
              style={{ paddingLeft: "10px" }}
              onClick={updateadminInfo}
              padding=" 0px 20px"
            >
              Save
            </CustomButton>
          </Wrapper>
        </FlexRow>

        <Container>
          <Column style={{ height: "90px" }}>
            <ThemedText style={{ paddingTop: "10px" }}>Full Name:</ThemedText>
            <Input>
              <CustomInput
                type="text"
                width="100%"
                value={admin?.name}
                onChange={(event) =>
                  setadmin({ ...admin, name: event.currentTarget.value })
                }
              />
              <CustomInput
                type="text"
                width="100%"
                value={admin?.family}
                onChange={(event) =>
                  setadmin({ ...admin, family: event.currentTarget.value })
                }
                style={{ marginLeft: "10px" }}
              />
            </Input>
          </Column>

          <Column style={{ height: "90px" }}>
            <ThemedText style={{ paddingTop: "10px" }}>Username:</ThemedText>
            <CustomInput
              type="text"
              width="45%"
              value={admin?.username}
              onChange={(event) =>
                setadmin({ ...admin, username: event.currentTarget.value })
              }
            />
          </Column>

          <Column style={{ height: "90px" }}>
            <ThemedText style={{ paddingTop: "10px" }}>Address:</ThemedText>
            <CustomInput
              type="text"
              value={admin?.address}
              onChange={(event) =>
                setadmin({ ...admin, address: event.currentTarget.value })
              }
            />
          </Column>

          <Column style={{ height: "90px" }}>
            <ThemedText style={{ paddingTop: "10px" }}>
              Email Adress :
            </ThemedText>
            <CustomInput
              type="text"
              value={admin?.email}
              onChange={(event) =>
                setadmin({ ...admin, email: event.currentTarget.value })
              }
            />
          </Column>

          <Column style={{ height: "90px" }}>
            <ThemedText style={{ paddingTop: "10px" }}>Phone :</ThemedText>
            <CustomInput
              type="text"
              value={admin?.phoneNumber}
              onChange={(event) =>
                setadmin({
                  ...admin,
                  phoneNumber: parseInt(event.currentTarget.value),
                })
              }
            />
          </Column>

          <Column>
            <ThemedText style={{ paddingTop: "10px" }}>Bio :</ThemedText>
            <CustomInput
              type="textarea"
              column={10}
              value={admin?.bio}
              onChange={(event) =>
                setadmin({ ...admin, bio: event.currentTarget.value })
              }
            />
          </Column>
          <Space vertical={40} />
          <Column>
            <ThemedText style={{ paddingTop: "10px" }}>Job Title :</ThemedText>
            <CustomInput
              type="text"
              value={admin?.job}
              onChange={(event) =>
                setadmin({ ...admin, job: event.currentTarget.value })
              }
            />
          </Column>
        </Container>
      </FormItem>
    </UserLayout>
  );
}

const Container = styled.div`
  /* display: flex; */
  width: 100%;
  /* width: 100%; */
  /* height: 100vh; */
`;

const Column = styled.div`
  display: grid;
  grid-template-columns: 200px 1fr;
  /* gap: 30px; */
  /* height: 90px; */
  align-items: flex-start;
  /* border-top: 1px solid gray; */
  /* padding: 0px 20px; */
`;

const Input = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const ProfilePh = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid red;
  position: relative;
  cursor: pointer;
  border-radius: 50%;
`;
