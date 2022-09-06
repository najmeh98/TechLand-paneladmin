import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import useSWR from "swr";
import { config, fetchWithId } from "../../components/Api";
import { useAppContext } from "../../components/AppManag.tsx/AppContext";
import CategoryListLayout from "../../components/category/CatListLayout";
import { CustomButton } from "../../components/CustomButton";
import { Flex } from "../../components/share/Container";
import { SidebarOption } from "../../components/Sidebar/SidebarOption";
import { ThemedText } from "../../components/ThemedText";
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

  return (
    <Flex>
      <SidebarOption />
      <div
        style={{ maxWidth: "900px", minHeight: "100vh" }}
        className="w-full flex items-start flex-col mx-auto my-0 "
      >
        <Flex
          className="w-full border border-b-1 border-blue-900  pb-8 mx-auto my-14"
          style={{ borderBottom: "1px solid lightgray" }}
        >
          <ThemedText fontSize="XLarge" className="font-bold">
            Your lists
          </ThemedText>
          <CustomButton
            className="bg-gradient-to-r from-cyan-500 to-blue-500 px-4"
            onClick={() => {
              router.push("./manageCategories");
            }}
          >
            New list
          </CustomButton>
        </Flex>

        <div className=" w-full mr-8  " style={{ maxWidth: "730px" }}>
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
                key={cat?.id}
                title={cat?.name}
                image={cat?.image}
                email={email}
                catId={cat?.id}
              />
            ))}
        </div>
      </div>
    </Flex>
  );
}
