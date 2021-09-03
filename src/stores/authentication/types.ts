/* eslint-disable camelcase */
import * as AuthConstant from "./constants";

export type LoginRequest = {
  username: string;
  password: string;
};

export type LoginResponse = {
  birthday: string;
  email: string;
  image: string;
  isStorageFamily: boolean;
  isStorageFriend: boolean;
  isStorageLove: boolean;
  isUpdateInfo: boolean;
  loveImage: string;
  token: string;
  userId: string;
  userName: string;
};

export type RegisterRequest = {
  userName: string;
  email: string;
  password: string;
};

export type RegisterResponse = {
  msg: string;
  isRegistered: boolean;
};

export type EmailVerifiedRequest = {
  email: string;
};

export type ResetPasswordRequest = {
  userId: string;
  password: string;
  newPassword: string;
};

export type ResetPasswordResponse = {
  msg: string;
  isResetPassword: boolean;
};

export type LoginRequestAction = {
  type: typeof AuthConstant.LOGIN_REQUEST;
  payload: {
    loginRequest: LoginRequest;
  };
};

export type LoginSuccessAction = {
  type: typeof AuthConstant.LOGIN_SUCCESS;
  payload: {
    loginResponse: LoginResponse;
  };
};

export type LoginFailureAction = {
  type: typeof AuthConstant.LOGIN_FAILURE;
  payload: {
    error: string;
  };
};

export type RegisterRequestAction = {
  type: typeof AuthConstant.REGISTER_REQUEST;
  payload: {
    registerRequest: RegisterRequest;
  };
};

export type RegisterSuccessAction = {
  type: typeof AuthConstant.REGISTER_SUCCESS;
  payload: {
    registerResponse: RegisterResponse;
  };
};

export type RegisterFailureAction = {
  type: typeof AuthConstant.REGISTER_FAILURE;
  payload: {
    error: string;
  };
};

export type EmailVerifiedRequestAction = {
  type: typeof AuthConstant.EMAIL_VERIFIED_REQUEST;
  payload: {
    emailVerifiedRequest: EmailVerifiedRequest;
  };
};

export type EmailVerifiedFailureAction = {
  type: typeof AuthConstant.EMAIL_VERIFIED_FAILURE;
  payload: {
    error: string;
  };
};

export type ResetPasswordRequestAction = {
  type: typeof AuthConstant.RESET_PASSWORD_REQUEST;
  payload: {
    resetPasswordRequest: ResetPasswordRequest;
  };
};

export type ResetPasswordSuccessAction = {
  type: typeof AuthConstant.RESET_PASSWORD_SUCCESS;
  payload: {
    resetPasswordResponse: ResetPasswordResponse;
  };
};

export type ResetPasswordFailureAction = {
  type: typeof AuthConstant.RESET_PASSWORD_FAILURE;
  payload: {
    error: string;
  };
};

export type LoginAction =
  | LoginRequestAction
  | LoginSuccessAction
  | LoginFailureAction
  | RegisterRequestAction
  | RegisterSuccessAction
  | RegisterFailureAction
  | EmailVerifiedRequestAction
  | EmailVerifiedFailureAction
  | ResetPasswordRequestAction
  | ResetPasswordSuccessAction
  | ResetPasswordFailureAction;
