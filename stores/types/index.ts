export interface UserState {
  userId: string;
  name: string;
}

export interface LoginPayload {
  userId: string;
  password: string;
}

export interface LoginResponse {
  userId: string;
  name: string;
  accessToken: string;
}

export interface MeResponse extends Response {
  userId: string;
  name: string;
  accessToken: string;
}
