export interface CategoryProp {
  name: string;
  description?: string | undefined;
}

export interface CatPost {
  id: string;
  name: string;
  description: string;
  image: string;
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
  onClick_more: () => void;
  onClick_Info: () => void;
  text_Delete: string;
  text_Edit: string;
  onClick_Delete: () => void;
  morePopup: boolean;
}
