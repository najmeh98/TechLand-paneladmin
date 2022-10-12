import axios, { AxiosError } from "axios";
import { useRouter } from "next/router";
import React, { useCallback, useState } from "react";
import { config } from "../../components/Api";
import { useAppContext } from "../../components/AppManag.tsx/AppContext";
import { ComponentUploader } from "../../components/ComponetnUploader";
import { CustomButton } from "../../components/CustomButton";
import { CustomInput } from "../../components/CustomInput";
import { Space } from "../../components/share/Space";
import { ThemedText } from "../../components/ThemedText";
import { UserLayout } from "../../components/users/UserLayout";
import { ButtonRow } from "../users/userInfo";
import { CategoryProp, CatPost } from "./cat.interface";

export default function ManageCategories(): JSX.Element {
  const [description, setDescription] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const [catValue, setCatValue] = useState<CategoryProp>({
    name: "",
    description: "",
  });

  //add type of post
  const [categoriesPost, setCategoriesPost] = useState<CatPost>();

  const router = useRouter();

  const [image, setimage] = useState<string>("");

  const { adminInfo } = useAppContext();
  const token: string = adminInfo.token;

  console.log(categoriesPost);
  const onSubmitCategory = useCallback((): void => {
    // setError('All fields are required')
    if (!catValue.name) {
      return;
    }

    try {
      setLoading(true);

      const dataCate = new FormData();

      dataCate.append("name", catValue.name);
      dataCate.append("description", catValue.description!);
      dataCate.append("image", image);

      axios
        .post(`${config.apiUrl}/api/data/admin/setCategory`, dataCate, {
          headers: {
            authorization: token,
          },
        })
        .then((response) => {
          setLoading(false);
          if ((response?.status as number) == 200) {
            console.log(response);

            setCategoriesPost(response?.data);

            setCatValue({
              name: "",
              description: "",
            });
            setimage("");

            //dispatch({type:'POST CATEGORY' , payload: })
          }
        })
        .catch((error) => {
          setLoading(false);
          const err = error as AxiosError;
          if (err.response?.status) {
            switch (err?.response?.status as number) {
              case 401:
                //retrun
                break;
              case 403:
                //
                break;
              case 400:
                //
                break;
              case 500:
              //
            }
          }
        });
    } catch (error) {
      console.log(error);
    }
  }, [catValue.description, catValue.name, image, token]);

  return (
    <UserLayout
      title="create new list"
      width="75%"
      style={{
        padding: "40px",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* uploader image  */}
      <ComponentUploader setImage={setimage} image={image} />

      <Space vertical={40} />

      <CustomInput
        type="text"
        placeholder="Give it a name"
        // label="Give it a name"
        width="100%"
        value={catValue.name}
        onChange={(event) =>
          setCatValue({ ...catValue, name: event.currentTarget.value })
        }
      />

      <Space vertical={30} />
      {description ? (
        <CustomInput
          type="text"
          placeholder="Description"
          // label="Description"
          width="100%"
          value={catValue.description}
          onChange={(event) =>
            setCatValue({ ...catValue, description: event.currentTarget.value })
          }
        />
      ) : (
        <ThemedText
          style={{ color: "rgb(57, 172, 212)", width: "100%" }}
          onClick={() => setDescription(true)}
          // className=" text-cyan-500 shadow-cyan-500/50 "
        >
          Add a description
        </ThemedText>
      )}

      <Space vertical={40} />

      <ButtonRow style={{ width: "100%" }}>
        <CustomButton
          style={{ marginRight: "20px" }}
          padding=" 0px 15px"
          onClick={() => router.back()}
        >
          Cancel
        </CustomButton>

        <CustomButton padding="0px 15px" onClick={onSubmitCategory}>
          Save
        </CustomButton>
      </ButtonRow>
    </UserLayout>
  );
}
