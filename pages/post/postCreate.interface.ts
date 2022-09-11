export interface OwnProp {
  title: string;
  content: string;
}

export interface CatItem {
  id: string;
  name: string;
  description?: string | undefined;
  image: string;
}

export interface OwnPost {
  length: number;
  id: string;
  title: string;
  content: string;
  image: string;
  created: string;
  update: string;
}
