export interface IUserInfo {
  name: string;
  email: string;
  surname: string;
  accessToken: string;
  phone: string;
  image?: string;
}

export interface IUserInfoRegister {
  name: string;
  email: string;
  surname: string;
  phone: string;
  password: string;
  confirmPassword: string;
  image?: string;
}

export interface IUserLocation {
  latitude: number;
  longitude: number;
}