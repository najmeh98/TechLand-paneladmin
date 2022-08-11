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
}

export interface allUsers {
  phoneNumber: string;
  id: any;
  name: string;
  family: string;
  username: string;
  email: string;
  address: string;
  skill?: string;
  bio?: string;
}
