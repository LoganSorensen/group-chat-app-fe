import { combineReducers } from "redux";

import { setPageState } from "./setPageStateReducer";
import { setChatState } from "./setChatStateReducer";

const rootReducer = combineReducers({
  setPageState,
  setChatState,
});

export default rootReducer;
