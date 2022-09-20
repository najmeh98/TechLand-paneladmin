import axios, { AxiosError } from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { CatPost } from "../../pages/category/cat.interface";
import { config } from "../Api";
import { CreateList } from "./CreateList";
import { CatProp, INewListProp } from "./createlist.interface";

export default function Createnewlist({
  setShowPopup,
  showPopup,
}: INewListProp): JSX.Element {
  const [loaclToken, setLoaclToken] = useState<string>("");

  const [catValue, setCatValue] = useState<CatProp>({
    name: "",
    description: "",
  });

  const [category, setCategory] = useState<CatPost>();

  const [image, setimage] = useState<string>("");

  const icon = (
    <div
      className="absolute right-10 top-5"
      onClick={() => setShowPopup(!showPopup)}
    >
      <IoCloseOutline
        className="text-2xl cursor-pointer"
        fill="rgba(117, 117, 117, 1)"
      />
    </div>
  );

  useEffect(() => {
    const token: string = localStorage.getItem("$adnTK") ?? "";
    setLoaclToken(token);
  }, []);

  const onSubmitCategory = useCallback((): void => {
    const data: FormData = new FormData();

    data.append("name", catValue.name);
    data.append("description", catValue.description!);
    data.append("image", image);

    try {
      axios
        .post(`${config.apiUrl}/api/data/admin/setCategory`, data, {
          headers: {
            authorization: loaclToken,
          },
        })
        .then((result) => {
          if ((result.status as number) == 200) {
            console.log(result);
            setCategory(result?.data);
            setCatValue({
              name: "",
              description: "",
            });

            setimage("");
            //dispatch({type:'POST CATEGORY' , payload: })
          }
        })
        .catch((error) => {
          const err = error as AxiosError;
          if ((err.response?.status as number) == 403) {
            // retrun
          } else if (err?.response?.status == 400) {
            // return
          } else {
            // error 500
            console.log(err);
          }
        });
    } catch (error) {
      console.log(error);
    }
  }, [catValue.description, catValue.name, image, loaclToken]);

  return (
    <CreateList
      title="create new list"
      icon={icon}
      setImage={setimage}
      image={image}
      valueName={catValue.name}
      valueDesc={catValue.description}
      onChangeName={(event) =>
        setCatValue({
          ...catValue,
          name: event.currentTarget.value,
        })
      }
      onChamgeDesc={(event) =>
        setCatValue({
          ...catValue,
          description: event.currentTarget.value,
        })
      }
      onClick_Cancel={() => setShowPopup(!showPopup)}
      onClick_Create={onSubmitCategory}
    />
  );
}
