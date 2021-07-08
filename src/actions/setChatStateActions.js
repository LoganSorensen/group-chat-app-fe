import { SET_CURRENT_ROOM } from "./types";

export const setCurrentRoom = (roomName) => {
    return {type: SET_CURRENT_ROOM, payload: roomName}
}