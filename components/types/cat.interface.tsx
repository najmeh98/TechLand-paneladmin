import { ReactNode } from "react";

export interface CategoryProp {
  name: string;
  description?: string | undefined;
}

export interface CatPost {
  // category: {
  id: string;
  name: string;
  description: string;
  image: string;
  created: string;
  update: string;
  posts: [];
  // };
}

export interface infoPostProp extends Omit<CategoryProp, "name"> {
  title: string;
}

export interface ItempropTs {
  text: string;
  className?: string;
  onClick: () => void;
}

export interface MoreItemProp {
  morePopup: boolean;
  children: ReactNode;
  onClick_more: () => void;
}

export interface EditCatProp extends CategoryProp {
  image: string;
}

export interface editPostProp {
  id: string;
  title: string;
  content: string;
  image: string;
}
