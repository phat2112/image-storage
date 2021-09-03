import axios from "axios";
import { Dispatch } from "redux";
import { API_ENDPOINT } from "../../common/constants";
import {
  SEARCH_USER_REQUEST,
  SEARCH_USER_SUCCESS,
  SEARCH_USER_FAILURE,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILURE,
} from "./constants";
import * as ActionTypes from "./types";

export const searchUserActionRequest = (
  searchUser: ActionTypes.SearchUserRequest
): ActionTypes.SearchUserRequestAction => ({
  type: SEARCH_USER_REQUEST,
  payload: { searchUser },
});

export const searchSuccess = (
  userResponse: ActionTypes.UserResponse[]
): ActionTypes.SearchUserSuccessAction => ({
  type: SEARCH_USER_SUCCESS,
  payload: { userResponse },
});

export const searchFailure = (
  error: string
): ActionTypes.SearchUserFailureAction => ({
  type: SEARCH_USER_FAILURE,
  payload: { error },
});

export const updateUserActionRequest = (
  userUpdated: FormData
): ActionTypes.UpdateUserRequestAction => ({
  type: UPDATE_USER_REQUEST,
  payload: { userUpdated },
});

export const updateUserSuccess = (
  updateUserResponse: ActionTypes.UpdateUserResponse
): ActionTypes.UpdateUserSuccessAction => ({
  type: UPDATE_USER_SUCCESS,
  payload: { updateUserResponse },
});

export const updateUserFailure = (
  error: string
): ActionTypes.UpdateUserFailureAction => ({
  type: UPDATE_USER_FAILURE,
  payload: { error },
});

export const searchUser =
  (request: ActionTypes.SearchUserRequest) =>
  (dispatch: Dispatch<ActionTypes.UserAction>) => {
    dispatch(searchUserActionRequest(request));

    return axios
      .post(`${process.env.REACT_APP_ENDPOINT}/${API_ENDPOINT.SEARCH_USER}`, {
        searchKey: request.keySearch,
      })
      .then((resp) => {
        dispatch(searchSuccess(resp.data.data));
      })
      .catch((err) => dispatch(searchFailure(err)));
  };

export const updateUser =
  (request: FormData, userId: string) =>
  (dispatch: Dispatch<ActionTypes.UserAction>) => {
    dispatch(updateUserActionRequest(request));
    return axios
      .post(
        `${process.env.REACT_APP_ENDPOINT}/${API_ENDPOINT.UPDATE_USER}/${userId}`,
        request,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((resp) => {
        dispatch(updateUserSuccess(resp.data.data));
      })
      .catch((err) => dispatch(updateUserFailure(err)));
  };
