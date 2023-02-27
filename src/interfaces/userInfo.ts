export interface IUserInfo {
  name: string;
  email: string;
  surname: string;
  accessToken: string;
  phone: string;
}

export interface IUserInfoRegister {
  name: string;
  email: string;
  surname: string;
  phone: string;
  password: string;
  confirmPassword: string;
}
