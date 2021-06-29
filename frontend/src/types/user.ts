export enum UserStatus {
  ACTIVE = "active",
  INACTIVE = "inactive",
}

export type User = {
  id: string;
  email?: string;
  name?: string;
  surname?: string;
};

export type JWTUser = {
  id: string;
  sub: string;
  email: string;
  name: string;
  surname: string;
};

export type OTPUser = {
  otp_session_id: string;
  otp_code?: string;
};

export type Activity = {
  id: string;
  name: string;
  created_at: string;
};
