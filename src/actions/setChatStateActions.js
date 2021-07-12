import { SET_CURRENT_CHANNEL, SET_CHANNEL_USERS } from "./types";

export const setCurrentChannel = (channel) => {
  return { type: SET_CURRENT_CHANNEL, payload: channel };
};

export const setChannelUsers = (users) => {
  return { type: SET_CHANNEL_USERS, payload: users };
};
