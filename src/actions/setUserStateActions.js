import { SET_USER } from "./types";

export const setUser = (user) => {
  console.log("user action", user);
  return { type: SET_USER, payload: user };
};
