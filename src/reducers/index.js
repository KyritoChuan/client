import { combineReducers } from "redux";
import reloadReducer from "./reloadReducer";
import modalReducer from "./modalReducer";
import userReducer from "./userReducer";
import menuReducer from "./menuReducer";
import signInReducer from "./signInReducer";
import authReducer from "./authReducer";

export default combineReducers({
  reloads: reloadReducer,
  modals: modalReducer,
  users: userReducer,
  menus: menuReducer,
  signIns: signInReducer,
  authUsers: authReducer,
});
