import axios, { AxiosError } from "axios";
import { NextRouter, useRouter } from "next/router";
import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { config } from "../../components/Api";
import { useAppContext } from "../../components/AppManag.tsx/AppContext";
import { useTheme } from "../../components/Context/ThemeContext";
import { CustomButton } from "../../components/CustomButton";
import { CustomInput } from "../../components/CustomInput";
import ProfileimgUploader from "../../components/ProfileimgUploader";
import { FormItem, Wrapper } from "../../components/share/Container";
import { Space } from "../../components/share/Space";
import { ThemedText } from "../../components/ThemedText";
import { Theme } from "../../components/types/theme";
import { UserLayout } from "../../components/users/UserLayout";
import { ProfileProp } from "./adprofiletype";
import { BannerimgUploader } from "../../components/BannerimgUploader";
import { Toaster } from "../../components/Toast";
import "react-toastify/ReactToastify.min.css";
import { ToastContainer } from "react-toastify";

export default function AdminProfile(): JSX.Element {
  const t: Theme = useTheme();

  const router: NextRouter = useRouter();

  const { adminInfo, dispatch } = useAppContext();

  const [loading, setLoading] = useState<boolean>(false);

  const [error, setError] = useState<string | undefined>("");

  const [image, setImage] = useState<string>("");

  const [bannerImg, setBannerImg] = useState<string>("");

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

  const id: number | undefined = adminInfo?.id;

  const { showToastr } = Toaster();

  const updateadminInfo = useCallback(async (): Promise<void> => {
    setError("");
    setLoading(true);

    const formData: any = new FormData();

    formData.append("image", image);
    formData.append("image", bannerImg);
    formData.append("admin", JSON.stringify(admin));

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
        const data: any = res?.data;

        dispatch({ type: "LOGGED IN", payload: data });

        showToastr("Success", "The profile was updated successfuly!");

        setTimeout(() => {
          router.push("/");
        }, 5000);
      }
    } catch (error) {
      setLoading(false);

      const err = error as AxiosError;

      if (err?.response?.status == 400) {
        showToastr("Error", "The profile was not created correctly");
      } else if (err?.response?.status == 404) {
        showToastr("Error", "Enter the data correctly");
      }
      showToastr("Error", "Server Error");
    }
  }, [
    admin,
    adminInfo?.token,
    bannerImg,
    dispatch,
    id,
    image,
    router,
    showToastr,
  ]);

  return (
    <>
      <ToastContainer />

      <UserLayout title="About You" width="100%">
        <FormItem style={{ padding: " 30px 20px" }}>
          <div className="border-1 border-solid border-slate-100 shadow-md rounded-tl-[80px]">
            <BannerimgUploader
              setbannerImage={setBannerImg}
              bannerimage={bannerImg}
              newbannerImage={adminInfo?.banner}
              className="w-full rounded-tl-[80px]"
            />
          </div>

          <div className=" flex justify-between  mx-8 items-start my-4">
            {/* profile of admin */}

            <div className=" rounded-full cursor-pointer shadow-md  relative -top-[60px] border border-solid border-white">
              <ProfileimgUploader
                setImage={setImage}
                image={image}
                newImage={adminInfo?.image}
              />
            </div>

            <FormItem className="px-6">
              <ThemedText
                style={{
                  fontSize: t.fontSize.large,
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

            <Wrapper className="pl-10">
              <CustomButton
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
          </div>

          <Container className="max-w-[760px]">
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
                className=" text-base "
                value={admin?.bio}
                onChange={(event) =>
                  setadmin({ ...admin, bio: event.currentTarget.value })
                }
              />
            </Column>

            <Space vertical={40} />

            <Column>
              <ThemedText style={{ paddingTop: "10px" }}>
                Job Title :
              </ThemedText>

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
    </>
  );
}

const Container = styled.div`
  width: 100%;
  /* width: 100%; */
  /* height: 100vh; */
`;

const Column = styled.div`
  display: grid;
  grid-template-columns: 200px 1fr;
  align-items: flex-start;
`;

const Input = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;
