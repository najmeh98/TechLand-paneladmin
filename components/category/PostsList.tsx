import React from "react";
import { ThemedText } from "../ThemedText";

interface OwnProp {
  title: string;
  content: string;
  image: string;
  createdAt: string;
  onClick: () => void;
}

export default function PostsList({
  title,
  content,
  image,
  createdAt,
  onClick,
}: OwnProp): JSX.Element {
  return (
    <div
      className="flex w-full items-start py-6 my-3 rounded  justify-between  shadow-md border border-solid  border-slate-200  px-4"
      onClick={onClick}
      // style={{ maxWidth: "800px" }}
    >
      <div className="flex flex-col items-start !justify-between h-full w-full ">
        <ThemedText
          className=" leading-8	whitespace-normal pb-3 w-full  font-bold"
          fontSize="large"
        >
          {title}
        </ThemedText>

        <p
          className="  font-normal pt-3 text-base	text-justify m-0 font-serif text-slate-600 flex !justify-between "
          color="desColor"
        >
          {content && content.length > 215
            ? `${content.substring(0, 215)} ...`
            : content}
        </p>
      </div>

      <div className="ml-16 bg-cover">
        {image == null ? (
          <img
            src="/noimage.jpeg"
            width={200}
            height={150}
            alt={title}
            className="rounded-md shadow-xl bg-cover"
          />
        ) : (
          <img
            src={image}
            alt={title}
            width={160}
            height={160}
            className="rounded-md shadow-xl bg-cover"
          />
        )}
      </div>

      <hr className=" h-1 text-slate-400" />
    </div>
  );
}

// charter, Georgia, Cambria, "Times New Roman", Times, serif

// sohne, "Helvetica Neue", Helvetica, Arial, sans-serif
