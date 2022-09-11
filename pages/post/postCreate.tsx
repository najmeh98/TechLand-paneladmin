import axios, { AxiosError } from "axios";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useState } from "react";
import { config } from "../../components/Api";
import { useAppContext } from "../../components/AppManag.tsx/AppContext";
import { ComponentUploader } from "../../components/ComponetnUploader";
import { CustomButton } from "../../components/CustomButton";
import { CustomInput } from "../../components/CustomInput";
import { CustomSelect } from "../../components/CustomSelect";
import { Space } from "../../components/share/Space";
import { UserLayout } from "../../components/users/UserLayout";
import { ButtonRow } from "../users/userInfo";
import { CatItem, OwnProp } from "./postCreate.interface";

export default function PostCreate(): JSX.Element {
  const router = useRouter();

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [image, setImage] = useState<string>("");

  const [postInfo, setPostInfo] = useState<OwnProp>({
    title: "",
    content: "",
  });

  const [localToken, setLocalToken] = useState<string>("");
  const [categoryItem, setCategoryItem] = useState<CatItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<CatItem>();

  const { dispatch } = useAppContext();

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
        console.log(result);
        setCategoryItem(result?.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [localToken]);

  const onSubmitPost = useCallback((): void => {
    if (!postInfo.title || !postInfo.content) {
      // setError('All fields are required')
      return;
    }
    try {
      setLoading(true);

      const dataPost = new FormData();
      const catId: string = selectedItem?.id ?? "";

      dataPost.append("title", postInfo.title);
      dataPost.append("content", postInfo.content);
      dataPost.append("image", image); // convert file to image
      dataPost.append("catId", catId);

      axios
        .post(`${config.apiUrl}/api/data/admin/postCreate`, dataPost, {
          headers: {
            authorization: localToken,
          },
        })
        .then((result) => {
          console.log(result);
          setLoading(false);
          if ((result?.status as number) == 200) {
            console.log(result);
            dispatch({
              type: "ADMIN POST",
              payload: { ...result?.data },
            });
            setPostInfo({
              title: "",
              content: "",
            });
            setImage("");
            setSelectedItem({
              id: "",
              image: "",
              name: "",
              description: "",
            });
          }
        })
        .catch((error) => {
          setLoading(false);
          const err = error as AxiosError;
          if ((err.response?.status as number) == 400) {
            // "Error in creating a new admin"
          } else {
            // 500 error
          }
        });
    } catch (error) {
      console.log(error);
    }
  }, [
    dispatch,
    image,
    localToken,
    postInfo.content,
    postInfo.title,
    selectedItem?.id,
  ]);

  return (
    <UserLayout
      title="Create new Post"
      width="78%"
      style={{
        padding: "40px",
        justifyContent: "center",
      }}
    >
      {/* upload Image */}
      <ComponentUploader setImage={setImage} image={image} />

      <Space vertical={30} />

      <CustomInput
        type="text"
        label="Title"
        value={postInfo.title}
        onChange={(event) =>
          setPostInfo({ ...postInfo, title: event.currentTarget.value })
        }
      />

      <Space vertical={25} />

      <CustomInput
        type="textarea"
        label="Content"
        value={postInfo.content}
        onChange={(event) =>
          setPostInfo({ ...postInfo, content: event.currentTarget.value })
        }
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
  );
}

// Todo
//  resonsive
