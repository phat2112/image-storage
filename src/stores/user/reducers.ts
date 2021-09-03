import * as ActionTypes from "./types";
import {
  SEARCH_USER_REQUEST,
  SEARCH_USER_SUCCESS,
  SEARCH_USER_FAILURE,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILURE,
} from "./constants";

type InitialState = {
  usersFound: ActionTypes.UserResponse[];
  userUpdated: ActionTypes.UpdateUserResponse;
};

export const INITIAL_STATE: InitialState = {
  usersFound: [],
  userUpdated: {
    message: "",
    isUpdated: false,
  },
};

const setFoundUsers = (
  state = INITIAL_STATE,
  action: ActionTypes.UserAction
) => {
  switch (action.type) {
    case SEARCH_USER_REQUEST:
      return {
        ...state,
        usersFound: INITIAL_STATE,
      };
    case SEARCH_USER_SUCCESS:
      return {
        ...state,
        usersFound: action.payload.userResponse,
      };
    case SEARCH_USER_FAILURE:
      return {
        ...state,
        usersFound: INITIAL_STATE,
      };

    case UPDATE_USER_REQUEST:
      return {
        ...state,
        userUpdated: INITIAL_STATE,
      };
    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        userUpdated: action.payload.updateUserResponse,
      };
    case UPDATE_USER_FAILURE:
      return {
        ...state,
        userUpdated: INITIAL_STATE,
      };
    default:
      return state;
  }
};

export const UserReducer = {
  setFoundUsers,
};
