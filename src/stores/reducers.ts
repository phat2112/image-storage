import { combineReducers } from "redux";
import { AuthReducer } from "./authentication/reducers";
import { UserReducer } from "./user/reducers";

const rootReducer = combineReducers({
  currentUser: AuthReducer.setCurrentUser,
  foundUsers: UserReducer.setFoundUsers,
});

export default rootReducer;
