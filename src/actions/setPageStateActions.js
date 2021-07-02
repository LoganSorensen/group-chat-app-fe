import { SET_SIDEBAR_COMPONENT } from "./types";

export const setSidebarComponent = (component) => {
    return {type: SET_SIDEBAR_COMPONENT, payload: component}
}
