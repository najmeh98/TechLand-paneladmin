import axios, { AxiosError } from "axios";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useState } from "react";
import { config } from "../../components/Api";
import { ComponentUploader } from "../../components/ComponetnUploader";
import { CustomButton } from "../../components/CustomButton";
import { CustomInput } from "../../components/CustomInput";
import { Space } from "../../components/share/Space";
import { ProfileImg } from "../../components/Sidebar/profileImg";
import { SidebarOption } from "../../components/Sidebar/SidebarOption";
import { editPostProp } from "../../components/types/cat.interface";
import "react-toastify/ReactToastify.min.css";
import { ToastContainer } from "react-toastify";
import { Toaster } from "../../components/Toast";

export default function EditPostInfo(): JSX.Element {
  const { query } = useRouter();

  const router = useRouter();

  const { showToastr } = Toaster();

  const postId: any = query?.pId;

  const [loading, setLoading] = useState<boolean>(false);
  const [localToken, setlocalToken] = useState<string | undefined>(undefined);
  const [image, setImage] = useState<string>("");

  const [editValue, seteditValue] = useState<editPostProp>({
    id: "",
    title: "",
    content: "",
    image: "",
  });

  useEffect(() => {
    const token: string = localStorage.getItem("$adnTK") ?? "";
    setlocalToken(token);
  }, []);

  useEffect(() => {
    setLoading(true);

    axios
      .get(`${config.apiUrl}/api/data/getpost_Info?postId=${postId}`, {
        headers: {
          authorization: localToken || "",
        },
      })
      .then((response) => {
        console.log(response);

        const data = response?.data;
        if ((response?.status as number) == 200) {
          seteditValue({
            title: data?.title,
            content: data?.content,
            image: data?.image,
            id: data?.id,
          });
        }
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  }, [localToken, postId]);

  const psId: string = editValue?.id;

  const onSubmitEdit = useCallback((): void => {
    setLoading(true);

    const data = new FormData();
    data.append("title", editValue?.title);
    data.append("content", editValue?.content);
    data.append("image", image);

    try {
      axios
        .post(`${config.apiUrl}/api/data/editPost?postId=${psId}`, data, {
          headers: {
            authorization: localToken || "",
          },
        })
        .then((response) => {
          setLoading(false);
          if ((response?.status as number) == 200) {
            console.log(response);
            const data: any = response?.data;

            // full state with setState
            seteditValue({
              title: data?.title,
              content: data?.content,
              image: data?.image,
              id: data?.id,
            });

            showToastr("Success", "The request was made successfully");

            setTimeout(() => {
              router.back();
            }, 5000);
          }
        })
        .catch((error) => {
          console.log(error);
          const err = error as AxiosError;

          switch (err?.response?.status) {
            case 400:
              showToastr("Error", "The request encountered an error");
              break;

            case 404:
              showToastr("Error", "The post  does not exicted!");
              break;
          }
        });
    } catch (error) {
      setLoading(false);
      console.log(error);
      showToastr("Error", "Server Error !");
    }
  }, [
    editValue?.content,
    editValue?.title,
    image,
    localToken,
    psId,
    router,
    showToastr,
  ]);

  return (
    <div className="flex items-start  mx-auto ">
      <SidebarOption />
      <div
        style={{ maxWidth: "900px" }}
        className="w-full mx-auto my-9 flex flex-col items-start justify-center px-24"
      >
        <div className="relative flex items-center justify-between w-full">
          {/* show profile image */}
          <ProfileImg />

          <div className="flex items-center justify-center">
            <CustomButton
              style={{ marginRight: "20px" }}
              className="px-4"
              onClick={() => router.back()}
            >
              Cancel
            </CustomButton>
            <CustomButton className="px-4" onClick={onSubmitEdit}>
              Save
            </CustomButton>
          </div>
        </div>

        <Space vertical={70} />

        <ComponentUploader
          setImage={setImage}
          image={image}
          newImage={editValue?.image}
          height={370}
        />

        <Space vertical={60} />

        <div className="w-full">
          <CustomInput
            type="text"
            className="w-full border-none text-lg font-serif"
            onChange={(event) => {
              seteditValue({ ...editValue, title: event.currentTarget.value });
            }}
            value={editValue?.title}
          />
        </div>

        <Space vertical={60} />

        <CustomInput
          type="textarea"
          value={editValue?.content}
          onChange={(event) => {
            seteditValue({
              ...editValue,
              content: event?.currentTarget?.value,
            });
          }}
          className="w-full h-screen text-lg font-serif "
          row={30}
          column={85}
        />
      </div>
      <ToastContainer />
    </div>
  );
}
