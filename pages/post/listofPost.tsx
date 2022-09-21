import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import useSWR from "swr";
import { config, fetchWithId } from "../../components/Api";
import CategoryListLayout from "../../components/category/CatListLayout";
import { ListofItems } from "../../components/LayoutList.tsx/listofItems";
import { OwnPost } from "./postCreate.interface";

export default function ListofPost(): JSX.Element {
  const router = useRouter();
  const [loaclToken, setLoaclToken] = useState<string>("");

  useEffect(() => {
    const token: string = localStorage.getItem("$adnTK") ?? "";
    setLoaclToken(token);
  }, []);

  const { data, error } = useSWR(
    [`${config.apiUrl}/api/data/getAllposts`, loaclToken],
    fetchWithId
  );
  console.log("dt", data);
  return (
    <ListofItems
      title="Your stories "
      button="New story"
      onClick={() => {
        router.push("/post/postCreate");
      }}
      className="bg-gradient-to-r from-purple-500 to-pink-500 px-3"
    >
      <div className=" w-full mr-8 ">
        {data &&
          data?.post?.length > 0 &&
          data?.post?.map((post: OwnPost) => (
            <CategoryListLayout
              onClick={() => {
                router.push({
                  pathname: "/post/postInfo",
                  query: {
                    query: [post?.title],
                    wb: post?.id,
                  },
                });
              }}
              length_categories={post?.category?.name}
              key={post?.id}
              title={post?.title}
              image={post?.image}
              // email={email}
              catId={post?.id}
            />
          ))}
      </div>
    </ListofItems>
  );
}
