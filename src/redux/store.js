import userReducer from "./auth";
import { combineReducers } from "redux";

//menampung reducer
const rootReducer = combineReducers({
  auth: userReducer,
});

export default rootReducer;
