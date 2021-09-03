// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getCurrentUser = (state: any) => state.currentUser.userLogin;
const isUserRegistered = (state: any) => state.currentUser.userRegister;

export const AuthSelector = {
  getCurrentUser,
  isUserRegistered,
};
