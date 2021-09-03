// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getFoundUsers = (state: any) => state.foundUsers.usersFound;

const getUpdatedUserMsg = (state: any) => state.foundUsers.userUpdated;

export const UserSelector = {
  getFoundUsers,
  getUpdatedUserMsg,
};
