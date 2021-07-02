import { combineReducers } from "redux";

import { setPageState } from "./setPageStateReducer";

const rootReducer = combineReducers({
  setPageState,
});

export default rootReducer;
