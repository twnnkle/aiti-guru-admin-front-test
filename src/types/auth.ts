export interface UserI {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
}

export interface LoginResponseI extends UserI {
  accessToken: string;
  refreshToken: string;
}

export interface LoginCredentialsI {
  username: string;
  password: string;
  expiresInMins?: number;
}

export interface AuthFieldsI {
  username: string;
  password: string;
  rememberMe: boolean;
}
