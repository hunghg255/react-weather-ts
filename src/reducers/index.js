import ajaxReducer from "./ajaxReducer";
import { combineReducers } from "redux";

export default combineReducers({
  weatherReducer: ajaxReducer,
});
