import { combineReducers } from "redux";
import UserReducer from "./UserReducer";

const rootReducer = combineReducers({
  data: UserReducer
});

export default rootReducer;