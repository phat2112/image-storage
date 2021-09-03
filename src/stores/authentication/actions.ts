import axios from "axios";
import { Dispatch } from "redux";
import { API_ENDPOINT } from "../../common/constants";
import * as AuthConstant from "./constants";
import { setCookie } from "../../utils/helper";
import * as ActionTypes from "./types";

export const loginActionRequest = (
  loginRequest: ActionTypes.LoginRequest
): ActionTypes.LoginRequestAction => ({
  type: AuthConstant.LOGIN_REQUEST,
  payload: { loginRequest },
});

export const loginSuccess = (
  loginResponse: ActionTypes.LoginResponse
): ActionTypes.LoginSuccessAction => ({
  type: AuthConstant.LOGIN_SUCCESS,
  payload: { loginResponse },
});

export const loginFailure = (
  error: string
): ActionTypes.LoginFailureAction => ({
  type: AuthConstant.LOGIN_FAILURE,
  payload: { error },
});

export const registerActionRequest = (
  registerRequest: ActionTypes.RegisterRequest
): ActionTypes.RegisterRequestAction => ({
  type: AuthConstant.REGISTER_REQUEST,
  payload: { registerRequest },
});

export const registerActionSuccess = (
  registerResponse: ActionTypes.RegisterResponse
): ActionTypes.RegisterSuccessAction => ({
  type: AuthConstant.REGISTER_SUCCESS,
  payload: { registerResponse },
});

export const registerActionFailure = (
  error: string
): ActionTypes.RegisterFailureAction => ({
  type: AuthConstant.REGISTER_FAILURE,
  payload: { error },
});

export const userLogin =
  (loginRequest: ActionTypes.LoginRequest) =>
  (dispatch: Dispatch<ActionTypes.LoginAction>) => {
    dispatch(loginActionRequest(loginRequest));

    return axios
      .post(`${process.env.REACT_APP_ENDPOINT}/${API_ENDPOINT.LOGIN}`, {
        email: loginRequest.username,
        password: loginRequest.password,
      })
      .then((resp) => {
        setCookie("token", resp.data.data.token || "", "1");
        dispatch(loginSuccess(resp.data.data));
      })
      .catch((err) => dispatch(loginFailure(err)));
  };

export const userRegister =
  (registerRequest: ActionTypes.RegisterRequest) =>
  (dispatch: Dispatch<ActionTypes.LoginAction>) => {
    dispatch(registerActionRequest(registerRequest));

    return axios
      .post(`${process.env.REACT_APP_ENDPOINT}/${API_ENDPOINT.REGISTER}`, {
        userName: registerRequest.userName,
        email: registerRequest.email,
        password: registerRequest.password,
      })
      .then((resp) => {
        dispatch(registerActionSuccess(resp.data.data));
      })
      .catch((err) => dispatch(registerActionFailure(err)));
  };
