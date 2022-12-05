import { useRouter } from "next/router";
import React, { useCallback, useEffect, useState } from "react";
import { config } from "../../components/Api";
import PostsList from "../../components/category/PostsList";
import { HeaderText } from "../../components/HeaderText";
import { Flex, FormItem } from "../../components/share/Container";
import { SidebarOption } from "../../components/Sidebar/SidebarOption";
import { ThemedText } from "../../components/ThemedText";
import { BsThreeDots } from "react-icons/bs";
import { Note } from "../../components/share/Note";
import axios, { AxiosError } from "axios";
import { CreateList } from "../../components/LayoutList.tsx/CreateList";
import {
  EditCatProp,
  infoPostProp,
  ItempropTs,
  MoreItemProp,
} from "./cat.interface";
import { adminsPosts } from "../../components/AppManag.tsx/definition";
import Alert from "../../components/alert";
import { Toaster } from "../../components/Toast";
import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.min.css";

export default function CategoryItem(): JSX.Element {
  const { query } = useRouter();
  const router = useRouter();

  const { showToastr } = Toaster();

  const wbId = query?.wb_id;

  const [localToken, setLocalToken] = useState<string | undefined>(undefined);

  const [morePopup, setMorePopup] = useState<boolean>(false);

  const [image, setimage] = useState<string>("");

  const [showInfo, setShowInfo] = useState<boolean>(false);

  const [loading, setLoading] = useState<boolean>(false);

  const [deleteItem, setdeleteItem] = useState<boolean>(false);

  const [editValue, setEitValue] = useState<EditCatProp>({
    // id: "",
    name: "",
    description: "",
    image: "",
  });

  const [info, setinfo] = useState<infoPostProp>({
    title: "",
    description: "",
  });

  const [posts, setPosts] = useState<adminsPosts[]>();

  useEffect(() => {
    const token: string = localStorage.getItem("$adnTK") ?? "";
    setLocalToken(token);
  }, []);

  useEffect(() => {
    axios
      .get(`${config.apiUrl}/api/data/admin/getCategory_Info?wbId=${wbId}`, {
        headers: {
          authorization: localToken || "",
        },
      })
      .then((res) => {
        console.log(res);

        const data = res?.data;

        setEitValue({
          // id: data?.id,
          name: data?.name,
          description: data?.description,
          image: data?.image,
        });

        setinfo({
          title: data?.name,
          description: data?.description,
        });

        setPosts(data?.posts);
      })
      .catch((error) => console.log(error));
  }, [localToken, wbId]);

  // send edit category
  const onSubmitEdit = useCallback((): void => {
    const data: FormData = new FormData();

    data.append("name", editValue.name);
    data.append("description", editValue.description ?? "");
    data.append("image", image);

    try {
      axios
        .post(
          `${config.apiUrl}/api/data/admin/editCategory?catId=${wbId}`,
          data,
          {
            headers: {
              authorization: localToken || "",
            },
          }
        )
        .then((response) => {
          if ((response.status as number) == 200) {
            const data: any = response?.data;

            setEitValue({
              description: data?.description,
              image: data?.image,
              name: data?.name,
              // id: data?.id,
            });

            setinfo({
              title: data?.name,
              description: data?.description,
            });

            setShowInfo(!showInfo);

            showToastr("Success", "The request was made successfully");
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
              showToastr("Error", "The category does not exicted!");
              break;
          }
        });
    } catch (error) {
      console.log(error);

      showToastr("Error", "Server Error !");
    }
  }, [
    editValue.description,
    editValue.name,
    image,
    localToken,
    showInfo,
    showToastr,
    wbId,
  ]);

  const onSubmitDelete = useCallback((): void => {
    setLoading(true);

    try {
      axios
        .post(
          `${config.apiUrl}/api/data/admin/deleteCategory?catId=${wbId}`,
          wbId,
          {
            headers: {
              authorization: localToken || "",
            },
          }
        )
        .then((response) => {
          setLoading(false);

          if ((response?.status as number) == 200) {
            showToastr("Success", "The deletion was successful. ");

            setTimeout(() => {
              router.back();
            }, 5000);
          }
        })
        .catch((error) => {
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
  }, [localToken, router, showToastr, wbId]);

  const moreItems = [
    {
      label: "Edit list info",
      className: "hover:text-black",
      onClick: () => setShowInfo(!showInfo),
    },
    {
      label: " Delete list info",
      className: "text-red-500 hover:text-red-500",
      onClick: () => setdeleteItem(true),
    },
    {
      label: "Back to List",
      className: "hover:text-black",
      onClick: () => router.back(),
    },
  ];

  return (
    <>
      <ToastContainer />

      <Flex>
        <SidebarOption />

        <div
          style={{
            maxWidth: "800px",
            minHeight: "100vh",
            // position: "relative",
          }}
          className="w-full flex items-start flex-col mx-auto my-0  "
        >
          <FormItem
            className="w-full  pb-8 mx-auto my-9"
            style={{
              borderBottom: "1px solid lightgray",
              position: "relative",
            }}
          >
            <Flex>
              <HeaderText>{info?.title}</HeaderText>

              {/* show more Item */}
              <MoreItem
                onClick_more={() => setMorePopup(!morePopup)}
                morePopup={morePopup}
              >
                {moreItems &&
                  moreItems.length > 0 &&
                  moreItems?.map((item) => {
                    console.log("item", item);
                    return (
                      <Item
                        onClick={item?.onClick}
                        text={item?.label}
                        className={item?.className}
                        key={item?.label}
                      />
                    );
                  })}
              </MoreItem>
            </Flex>

            <ThemedText fontSize="semiLarge" color="desColor">
              {info?.description}
            </ThemedText>
          </FormItem>

          {/* show post of categories  */}
          {posts ? (
            posts.length > 0 &&
            posts.map((post: any) => (
              <PostsList
                onClick={() => {
                  router.push({
                    pathname: "../post/postInfo",
                    query: {
                      query: [post?.title],
                      wb: post?.id,
                    },
                  });
                }}
                key={post?.id}
                title={post?.title}
                content={post?.content}
                image={post?.image}
                createdAt={post?.createdAt}
              />
            ))
          ) : (
            <p>You don&lsquo;t have any POST yet...!</p>
          )}

          {/* create new category list */}
          {showInfo && (
            <CreateList
              title="Edit list"
              valueName={editValue.name}
              valueDesc={editValue.description}
              onChangeName={(event) =>
                setEitValue({ ...editValue, name: event.currentTarget.value })
              }
              onChamgeDesc={(event) =>
                setEitValue({
                  ...editValue,
                  description: event.currentTarget.value,
                })
              }
              onClick_Cancel={() => setShowInfo(!showInfo)}
              onClick_Create={onSubmitEdit}
              image={image}
              setImage={setimage}
              newImage={editValue?.image}
            />
          )}

          {/* show delete pop up */}
          {deleteItem && (
            <Alert
              onClick_Cancel={() => setdeleteItem(false)}
              onClick_delete={onSubmitDelete}
              text="Delete List"
              desc="Deleting this list will not delete the stories in it."
              Buttondelete="Delete"
            />
          )}
        </div>
      </Flex>
      {/* create new category list */}
      {/* {showInfo && (
        <CreateList
          title="Edit list"
          valueName={editValue.name}
          valueDesc={editValue.description}
          onChangeName={(event) =>
            setEitValue({ ...editValue, name: event.currentTarget.value })
          }
          onChamgeDesc={(event) =>
            setEitValue({
              ...editValue,
              description: event.currentTarget.value,
            })
          }
          onClick_Cancel={() => setShowInfo(!showInfo)}
          onClick_Create={onSubmitEdit}
          image={image}
          setImage={setimage}
          newImage={editValue?.image}
        />
      )} */}

      {/* show delete pop up */}
      {/* {deleteItem && (
        <Alert
          onClick_Cancel={() => setdeleteItem(true)}
          onClick_delete={onSubmitDelete}
          text="Delete List"
          desc="Deleting this list will not delete the stories in it."
          Buttondelete="Delete"
        />
      )} */}
    </>
  );
}

export const Item = ({ onClick, text, className }: ItempropTs) => {
  return (
    <li
      className={` py-3 px-5 text-slate-500   list-none w-full color ${className} `}
      onClick={onClick}
    >
      {text}
    </li>
  );
};

export const MoreItem = ({
  onClick_more,
  morePopup,
  children,
}: MoreItemProp) => {
  return (
    <div>
      <div
        className="hover:bg-slate-100 rounded-full p-2 relative flex items-center justify-center"
        onClick={onClick_more}
      >
        <BsThreeDots
          fontSize={23}
          fill="rgba(117, 117, 117, 1)"
          cursor="pointer"
          className="hover:fill-cyan-500 "
        />
      </div>

      {/* show items in pop up */}
      {morePopup && <Note>{children}</Note>}
    </div>
  );
};
