import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import useSWR from "swr";
import { config, fetchWithId } from "../../components/Api";
import { useAppContext } from "../../components/AppManag.tsx/AppContext";
import CategoryListLayout from "../../components/category/CatListLayout";
import { ListofItems } from "../../components/LayoutList.tsx/listofItems";
import { SpinnerComponent } from "../../components/utils/Spinner";
import { OwnPost } from "./postCreate.interface";

export default function ListofPost(): JSX.Element {
  const router = useRouter();
  const [loaclToken, setLoaclToken] = useState<string>("");

  useEffect(() => {
    const token: string = localStorage.getItem("$adnTK") ?? "";
    setLoaclToken(token);
  }, []);

  const { adminInfo } = useAppContext();

  const id: any = adminInfo?.id;

  const { data, error } = useSWR(
    [`${config.apiUrl}/api/data/getAllposts?adminId=${id}`, loaclToken],
    fetchWithId
  );

  return (
    <ListofItems
      title="Your stories "
      button="New story"
      onClick={() => {
        router.push("./postCreate");
      }}
      className="bg-gradient-to-r from-purple-500 to-pink-500 px-3"
    >
      <div className=" w-full mr-8  space-y-11">
        {data == undefined ? (
          <SpinnerComponent />
        ) : data && data?.post?.length > 0 ? (
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
              // catId={post?.id}
            />
          ))
        ) : (
          data?.post == 0 && data?.post?.length == 0 && <p>There is no posts</p>
        )}
      </div>
    </ListofItems>
  );
}
