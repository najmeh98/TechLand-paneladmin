export interface OwnProp {
  name: string | undefined;
  family: string | undefined;
  password: string | undefined;
  repassword: string | undefined;
  username: string | undefined;
  email: string | undefined;
  address: string | undefined;
  phone: number | string;
}

export interface loginProp {
  email: string;
  password: string;
}
