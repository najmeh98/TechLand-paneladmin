export interface OwnProp {
  name: string | undefined;
  family: string | undefined;
  password: string | undefined;
  repassword: string | undefined;
  username: string | undefined;
  email: string | undefined;
  address: string | undefined;
  phoneNumber: number;
}

export interface loginProp {
  email: string;
  password: string;
}
