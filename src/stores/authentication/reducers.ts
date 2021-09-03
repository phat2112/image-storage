import * as ActionTypes from "./types";
import * as AuthConstant from "./constants";

type InitialState = {
  userLogin: ActionTypes.LoginResponse;
  userRegister: ActionTypes.RegisterResponse;
};

export const INITIAL_STATE: InitialState = {
  userLogin: {
    birthday: "",
    email: "",
    image: "",
    isStorageFamily: false,
    isStorageFriend: false,
    isStorageLove: false,
    isUpdateInfo: false,
    loveImage: "",
    token: "",
    userId: "",
    userName: "",
  },
  userRegister: {
    isRegistered: false,
    msg: "",
  },
};

const setCurrentUser = (
  state = INITIAL_STATE,
  action: ActionTypes.LoginAction
) => {
  switch (action.type) {
    // Login
    case AuthConstant.LOGIN_REQUEST:
      return {
        ...state,
        userLogin: INITIAL_STATE.userLogin,
      };
    case AuthConstant.LOGIN_SUCCESS:
      return {
        ...state,
        userLogin: action.payload.loginResponse,
      };
    case AuthConstant.LOGIN_FAILURE:
      return {
        ...state,
        userLogin: INITIAL_STATE.userLogin,
      };

    // Register
    case AuthConstant.REGISTER_REQUEST:
      return {
        ...state,
        userRegister: INITIAL_STATE.userRegister,
      };
    case AuthConstant.REGISTER_SUCCESS:
      return {
        ...state,
        userRegister: action.payload.registerResponse,
      };
    case AuthConstant.REGISTER_FAILURE:
      return {
        ...state,
        userRegister: INITIAL_STATE.userRegister,
      };
    default:
      return state;
  }
};

export const AuthReducer = {
  setCurrentUser,
};
