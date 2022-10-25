import axios, { AxiosError } from "axios";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useState } from "react";
import Alert from "../../components/alert";
import { config } from "../../components/Api";
import { HeaderText } from "../../components/HeaderText";
import { ContentText } from "../../components/share/ContentText";
import { Space } from "../../components/share/Space";
import { ProfileImg } from "../../components/Sidebar/profileImg";
import { SidebarOption } from "../../components/Sidebar/SidebarOption";
import { ThemedText } from "../../components/ThemedText";
import { Toaster } from "../../components/Toast";
import { Item, MoreItem } from "../category/categoryItem";

export default function PostInfo() {
  const { query } = useRouter();

  const postId: any = query?.wb;
  const router = useRouter();

  const [localToken, setlocalToken] = useState<string | undefined>(undefined);
  const [morePopup, setMorePopup] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const [deleteItem, setdeleteItem] = useState<boolean>(false);

  const [data, setData] = useState({
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
          setData({
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

  const psId: string = data?.id;

  const { showToastr } = Toaster();

  const onSubmitDelete = useCallback((): void => {
    setLoading(true);

    try {
      axios
        .delete(`${config.apiUrl}/api/data/deletePost?postId=${psId}`, {
          headers: {
            authorization: localToken || "",
          },
        })
        .then((response) => {
          setLoading(false);
          if ((response.status as number) == 200) {
            console.log(response);

            showToastr("Success", "The deletion was successful. ");

            setTimeout(() => {
              router.back();
            }, 5000);
          }
        })
        .catch((error) => {
          setLoading(false);
          console.log(error);

          const err = error as AxiosError;

          if (err?.response?.status == 400) {
            showToastr("Error", "The request encountered an error");
          }
        });
    } catch (error) {
      console.log(error);
      setLoading(false);
      showToastr("Error", "Server Error");
    }
  }, [localToken, psId, router, showToastr]);

  const moreItem = [
    {
      label: "Edit post info",
      className: "hover:text-black",
      // onClick: () => setShowInfo(!showInfo),
      onClick: () =>
        router.push({
          pathname: "editPostInfo",
          query: {
            slug: `${data?.title}`,
            pId: `${data?.id}`,
          },
        }),
    },
    {
      label: " Delete post info",
      className: "text-red-500 hover:text-red-500",
      // onClick: onSubmitDelete,
      onClick: () => setdeleteItem(true),
    },
    {
      label: "Back to List",
      className: "hover:text-black",
      onClick: () => router.back(),
    },
  ];

  return (
    <div className="flex items-start  mx-auto ">
      <SidebarOption />
      <div
        style={{ maxWidth: "900px" }}
        className="w-full mx-auto my-9 flex flex-col items-start justify-center px-24"
      >
        <div className="relative flex py-5 items-center justify-between w-full">
          {/* show profile image */}
          <ProfileImg />

          {/* show more Item */}
          <MoreItem
            onClick_more={() => setMorePopup(!morePopup)}
            morePopup={morePopup}
          >
            {moreItem &&
              moreItem.length > 0 &&
              moreItem?.map((item) => (
                <Item
                  onClick={item?.onClick}
                  text={item?.label}
                  key={item?.label}
                  className={item?.className}
                />
              ))}
          </MoreItem>
        </div>

        <Space vertical={35} />

        <img
          src={data?.image}
          alt="img"
          width={300}
          height={350}
          className="w-full rounded-lg"
        />

        <Space vertical={20} />

        <HeaderText>{data?.title}</HeaderText>

        <ContentText className=" font-[source-serif-pro] text-2xl text-stone-800 ">
          {data?.content}
        </ContentText>

        {/* show pop Up for delete post */}
        {deleteItem && (
          <Alert
            onClick_Cancel={() => setdeleteItem(false)}
            onClick_delete={onSubmitDelete}
            text="Delete story"
            desc="Are you sure you want to delete this story?"
            Buttondelete="Delete"
          />
        )}
      </div>
    </div>
  );
}

// source-serif-pro, Georgia, Cambria, "Times New Roman", Times, serif
