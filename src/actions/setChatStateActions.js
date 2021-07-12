import { SET_CURRENT_CHANNEL } from "./types";

export const setCurrentChannel = (roomName) => {
    return {type: SET_CURRENT_CHANNEL, payload: roomName}
}