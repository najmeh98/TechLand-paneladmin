import axios from "axios";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useState } from "react";
import Alert from "../../components/alert";
import { config } from "../../components/Api";
import { HeaderText } from "../../components/HeaderText";
import { Space } from "../../components/share/Space";
import { ProfileImg } from "../../components/Sidebar/profileImg";
import { SidebarOption } from "../../components/Sidebar/SidebarOption";
import { ThemedText } from "../../components/ThemedText";
import { Item, MoreItem } from "../category/categoryItem";

export default function PostInfo() {
  const { query } = useRouter();
  console.log("q", query);

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
            router.back();
          }
        })
        .catch((error) => {
          setLoading(false);
          console.log(error);
        });
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }, [localToken, psId, router]);

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

        <ThemedText className=" text-2xl">{data?.content}</ThemedText>

        {/* show pop Up for delete post */}
        {deleteItem && (
          <Alert
            onClick_Cancel={() => setdeleteItem(false)}
            onClick_delete={onSubmitDelete}
            text="Delete story            "
            desc="Are you sure you want to delete this story?            "
            Buttondelete="Delete"
          />
        )}
      </div>
    </div>
  );
}
