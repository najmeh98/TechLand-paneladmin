import Link from "next/link";
import React from "react";
import { Wrapper } from "../share/Container";
import { ThemedText } from "../ThemedText";

interface ICatListProp {
  title: string;
  image: string;
  // email?: string | undefined;
  catId: string;
  length_posts?: number;
  length_categories?: string;
  onClick: () => void;
}

export default function CategoryListLayout({
  title,
  image,
  length_categories,
  catId,
  onClick,
  length_posts,
}: ICatListProp): JSX.Element {
  return (
    <div
      className="w-full cursor-pointer  border-solid border-gray-300  rounded flex items-start justify-between bg-slate-50 hover:shadow-[0_8px_30px_#7c7b7b1e]"
      onClick={onClick}
    >
      <div className="flex flex-col p-6 items-start  justify-start h-full ">
        <ThemedText
          className=" font-bold w-full pt-3 pb-6  "
          fontSize="semiLarge"
        >
          {title}
        </ThemedText>

        <div className="text-slate-400 text-base">
          {length_posts ? (
            <span>{length_posts} stories</span>
          ) : (
            <span>{length_categories}</span>
          )}
        </div>
      </div>

      {image == "" ? (
        <Img src="/noimage.jpeg" title={title} />
      ) : (
        <Img src={image} title={title} />
      )}
    </div>
  );
}

const Img = ({ src, title }: { src: string; title: string }) => {
  return (
    <img
      src={src}
      alt={title}
      width={200}
      height={150}
      className=" bg-cover rounded-r-sm  "
    />
  );
};
//
