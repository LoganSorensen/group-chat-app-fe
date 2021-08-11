import { SET_CHANNEL_USERS, SET_CURRENT_CHANNEL } from "../actions/types";

const initialState = {
  currentChannel: null,
  //  {
  //   id: 2,
  //   channel_name: "Back End",
  //   channel_description: "A channel about back end stuff",
  //   owner_id: 3,
  // },
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
