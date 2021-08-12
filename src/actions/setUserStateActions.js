import { SET_USER } from "./types";

export const setUser = (user) => {
  console.log("user action");
  return { type: SET_USER, payload: user };
};
