import { SET_USER } from "../actions/types";

const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
};

export const setUserState = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
};
