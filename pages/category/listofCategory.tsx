import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import useSWR from "swr";
import { config, fetchWithId } from "../../components/Api";
import { useAppContext } from "../../components/AppManag.tsx/AppContext";
import CategoryListLayout from "../../components/category/CatListLayout";
import { ListofItems } from "../../components/LayoutList.tsx/listofItems";
import { SpinnerComponent } from "../../components/utils/Spinner";
import { CatPost } from "../../components/types/cat.interface";

export default function ListofCategory(): JSX.Element {
  const router = useRouter();
  const [loaclToken, setLoaclToken] = useState<string>("");

  const { adminInfo } = useAppContext();

  const id: any = adminInfo?.id;

  useEffect(() => {
    const token: string = localStorage.getItem("$adnTK") ?? "";
    setLoaclToken(token);
  }, []);

  const { data, error } = useSWR(
    [`${config.apiUrl}/api/data/admin/getCategories`, loaclToken],
    fetchWithId
  );

  //add spinner***
  if (error)
    return (
      <ListofItems
        title="Your lists"
        button="New lists"
        onClick={() => {
          router.push("./manageCategories");
        }}
        className="bg-gradient-to-r from-cyan-500 to-blue-500 px-4 "
      >
        <SpinnerComponent />
      </ListofItems>
    );

  return (
    <ListofItems
      title="Your lists"
      button="New lists"
      onClick={() => {
        router.push("./manageCategories");
      }}
      className="bg-gradient-to-r from-cyan-500 to-blue-500 px-4 "
    >
      <div className=" w-full px-1  space-y-11 ">
        {data === undefined ? (
          <SpinnerComponent />
        ) : (
          data?.length > 0 &&
          data?.map((cat: CatPost) => (
            <CategoryListLayout
              onClick={() => {
                router.push({
                  pathname: "./categoryItem",
                  query: {
                    slug: cat?.name,
                    wb_id: cat?.id,
                  },
                });
              }}
              length_posts={cat?.posts?.length}
              key={cat?.id}
              title={cat?.name}
              image={cat?.image}
            />
          ))
        )}
      </div>
    </ListofItems>
  );
}
