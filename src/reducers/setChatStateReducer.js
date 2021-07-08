import { SET_CURRENT_ROOM } from "../actions/types";

const initialState = {
  currentRoom: 'Welcome',
  username: '',
  user_id: ''
};

export const setChatState = (state = initialState, action) => {
  switch (action.type) {
      case SET_CURRENT_ROOM: 
      return {
          ...state,
          currentRoom: action.payload
      }
    default:
      return state;
  }
};