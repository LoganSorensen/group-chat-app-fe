import { SET_CURRENT_CHANNEL } from "../actions/types";

const initialState = {
  currentChannel: 'Welcome',
  username: '',
  user_id: ''
};

export const setChatState = (state = initialState, action) => {
  switch (action.type) {
      case SET_CURRENT_CHANNEL: 
      return {
          ...state,
          currentChannel: action.payload
      }
    default:
      return state;
  }
};
