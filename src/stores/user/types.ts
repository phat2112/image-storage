import {
  SEARCH_USER_REQUEST,
  SEARCH_USER_SUCCESS,
  SEARCH_USER_FAILURE,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILURE,
} from "./constants";

export type SearchUserRequest = {
  keySearch: string;
};

export type UserResponse = {
  birthday: string;
  email: string;
  image: string;
  isStorageFamily: boolean;
  isStorageFriend: boolean;
  isStorageLove: boolean;
  isUpdateInfo: boolean;
  loveImage: string;
  userId: string;
  userName: string;
};

export type UpdateUserResponse = {
  message: string;
  isUpdated: boolean;
};

export type SearchUserRequestAction = {
  type: typeof SEARCH_USER_REQUEST;
  payload: {
    searchUser: SearchUserRequest;
  };
};

export type SearchUserSuccessAction = {
  type: typeof SEARCH_USER_SUCCESS;
  payload: {
    userResponse: UserResponse[];
  };
};

export type SearchUserFailureAction = {
  type: typeof SEARCH_USER_FAILURE;
  payload: {
    error: string;
  };
};

export type UpdateUserRequestAction = {
  type: typeof UPDATE_USER_REQUEST;
  payload: {
    userUpdated: FormData;
  };
};

export type UpdateUserSuccessAction = {
  type: typeof UPDATE_USER_SUCCESS;
  payload: {
    updateUserResponse: UpdateUserResponse;
  };
};

export type UpdateUserFailureAction = {
  type: typeof UPDATE_USER_FAILURE;
  payload: {
    error: string;
  };
};

export type UserAction =
  | SearchUserRequestAction
  | SearchUserSuccessAction
  | SearchUserFailureAction
  | UpdateUserRequestAction
  | UpdateUserSuccessAction
  | UpdateUserFailureAction;
