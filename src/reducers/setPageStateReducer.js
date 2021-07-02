import { SET_SIDEBAR_COMPONENT } from "../actions/types";

const initialState = {
  sidebarComponent: "channelList",
};

export const setPageState = (state = initialState, action) => {
  switch (action.type) {
    case SET_SIDEBAR_COMPONENT:
      return {
        ...state,
        sidebarComponent: action.payload,
      };
    default:
      return state;
  }
};
