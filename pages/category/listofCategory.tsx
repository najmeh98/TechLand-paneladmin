import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import useSWR from "swr";
import { config, fetchWithId } from "../../components/Api";
import { useAppContext } from "../../components/AppManag.tsx/AppContext";
import CategoryListLayout from "../../components/category/CatListLayout";
import { ListofItems } from "../../components/LayoutList.tsx/listofItems";
import { CatPost } from "./cat.interface";

export default function ListofCategory(): JSX.Element {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [loaclToken, setLoaclToken] = useState<string>("");

  const { adminInfo } = useAppContext();

  const email: string = adminInfo?.email;

  useEffect(() => {
    const token: string = localStorage.getItem("$adnTK") ?? "";
    setLoaclToken(token);
  }, []);

  const { data, error } = useSWR(
    [`${config.apiUrl}/api/data/admin/getCategories`, loaclToken],
    fetchWithId
  );

  //add spinner***
  if (error) return <div>failed to load</div>;

  console.log(data);
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
        {data &&
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
              catId={cat?.id}
              // description={cat?.description}
            />
          ))}
      </div>
    </ListofItems>
    //   </div>
    // </Flex>
  );
}
