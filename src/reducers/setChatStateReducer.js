import { SET_CHANNEL_USERS, SET_CURRENT_CHANNEL } from "../actions/types";

const initialState = {
  currentChannel: {channel_name: 'Just JS'},
  users: [],
  username: "",
  user_id: "",
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
    default:
      return state;
  }
};
