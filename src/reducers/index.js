import { combineReducers } from "redux";

import { setPageState } from "./setPageStateReducer";
import { setChatState } from "./setChatStateReducer";
import { setUserState } from "./setUserStateReducer";

const rootReducer = combineReducers({
  setPageState,
  setChatState,
  setUserState,
});

export default rootReducer;
