export interface OwnadminProp {
  id?: number;
  name: string;
  family: string;
  email: string;
  username: string;
  phoneNumber: number;
  createdAt?: string;
  address: string;
  token: string;
  bio?: string;
  job?: string;
  image?: string;
}

export interface allUsers {
  phoneNumber: number;
  id: any;
  name: string;
  family: string;
  username: string;
  email: string;
  address: string;
  skill?: string;
  bio?: string;
}

export interface adminsPosts {
  id?: string;
  title: string;
  content: string;
  image: string;
  published?: boolean;
  created?: string;
  update?: string;
}

export interface listofCategories {
  name: string;
  description?: string | undefined;
  image: string;
}
