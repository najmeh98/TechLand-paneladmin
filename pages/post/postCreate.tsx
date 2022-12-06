import axios, { AxiosError } from "axios";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { config } from "../../components/Api";
import { useAppContext } from "../../components/AppManag.tsx/AppContext";
import { ComponentUploader } from "../../components/ComponetnUploader";
import { CustomButton } from "../../components/CustomButton";
import { CustomInput } from "../../components/CustomInput";
import { CustomSelect } from "../../components/CustomSelect";
import { Space } from "../../components/share/Space";
import { Toaster } from "../../components/Toast";
import { UserLayout } from "../../components/users/UserLayout";
import { ButtonRow } from "../users/userInfo";
import { CatItem, OwnProp } from "../../components/types/postCreate.interface";
import { CKEditor } from "ckeditor4-react";
import "react-toastify/ReactToastify.min.css";
import { ToastContainer } from "react-toastify";

export default function PostCreate(): JSX.Element {
  const router = useRouter();

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [image, setImage] = useState<string>("");

  const [postInfo, setPostInfo] = useState<OwnProp>({
    title: "",
    content: "",
  });

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const [localToken, setLocalToken] = useState<string>("");
  const [categoryItem, setCategoryItem] = useState<CatItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<CatItem>();

  const { dispatch } = useAppContext();

  const { showToastr } = Toaster();

  useEffect(() => {
    const token: string = localStorage.getItem("$adnTK") ?? "";
    setLocalToken(token);
  }, []);

  useEffect(() => {
    axios
      .get(`${config.apiUrl}/api/data/admin/getCategories`, {
        headers: {
          authorization: localToken,
        },
      })
      .then((result) => {
        if ((result?.status as number) == 200) {
          setCategoryItem(result?.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [localToken]);

  const onSubmitPost = useCallback((): void => {
    if (!title || !content) {
      setError("All fields are required");
      showToastr("Error", "All fields are required ");
      return;
    }
    try {
      setLoading(true);

      const dataPost = new FormData();
      const catId: string = selectedItem?.id ?? "";

      dataPost.append("title", title);
      dataPost.append("content", content);
      dataPost.append("image", image); // convert file to image
      dataPost.append("catId", catId);

      axios
        .post(`${config.apiUrl}/api/data/admin/postCreate`, dataPost, {
          headers: {
            authorization: localToken,
          },
        })
        .then((result) => {
          setLoading(false);
          if ((result?.status as number) == 200) {
            console.log(result);

            dispatch({
              type: "ADMIN POST",
              payload: { ...result?.data },
            });

            setTitle("");
            setContent("");

            setImage("");

            setSelectedItem({
              id: "",
              image: "",
              name: "",
              description: "",
            });

            showToastr("Success", "The post was created successfully");
          }
        })
        .catch((error) => {
          setLoading(false);
          const err = error as AxiosError;
          if ((err.response?.status as number) == 400) {
            // "Error in creating a new post"
            showToastr("Error", "Post creation error");
          } else {
            // 500 error
            showToastr("Error", "Server Error");
          }
        });
    } catch (error) {
      console.log(error);
      showToastr("Error", "Server Error");
    }
  }, [
    content,
    dispatch,
    image,
    localToken,
    selectedItem?.id,
    showToastr,
    title,
  ]);

  return (
    <>
      <ToastContainer />

      <UserLayout
        title="Create new Post"
        width="78%"
        style={{
          padding: "40px",
          justifyContent: "center",
        }}
      >
        {/* <Toastr ref={toastrRef} /> */}
        {/* upload Image */}
        <ComponentUploader setImage={setImage} image={image} />

        <Space vertical={30} />

        <CustomInput
          type="text"
          label="Title"
          value={title}
          onChange={(event) => setTitle(event.currentTarget.value)}
          // onChange={(event) =>
          //   setPostInfo({ ...postInfo, title: event.currentTarget.value })
          // }
        />

        <Space vertical={25} />

        <CKEditor
          config={{ language: "en" }}
          initData={content}
          type="classic"
          onChange={(event) => setContent(event.editor.getData())}
          style={{
            borderRadius: "7px",
            border: "1px solid rgb(204,204,204)",
            fontSize: "16px",
            overflowY: "scroll",
          }}
        />

        <Space vertical={25} />

        <CustomSelect
          categoryItem={categoryItem}
          setCategoryItem={setCategoryItem}
          selectedItem={selectedItem}
          setSelectedItem={setSelectedItem}
        />
        <Space vertical={50} />
        <ButtonRow>
          <CustomButton
            style={{ marginRight: "20px" }}
            padding=" 0px 15px"
            onClick={() => router.push("/")}
          >
            Cancel
          </CustomButton>
          <CustomButton padding=" 0px 15px" onClick={onSubmitPost}>
            Save
          </CustomButton>
        </ButtonRow>
      </UserLayout>
    </>
  );
}

// Todo
//  resonsive
