import {
  SET_CHANNEL_USERS,
  SET_CURRENT_CHANNEL,
  SET_NEW_CHANNEL,
} from "../actions/types";

const initialState = {
  currentChannel: null,
  users: [],
  username: "",
  user_id: "",
  newChannel: null,
};

export const setChatState = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_CHANNEL:
      return {
        ...state,
        currentChannel: action.payload,
      };
    case SET_CHANNEL_USERS:
      return {
        ...state,
        users: action.payload,
      };
    case SET_NEW_CHANNEL:
      return {
        ...state,
        newChannel: action.payload,
      };
    default:
      return state;
  }
};
