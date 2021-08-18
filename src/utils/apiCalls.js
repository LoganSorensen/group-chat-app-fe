import axios from "axios";

export const baseURL = "https://lsorensen-group-chat-app.herokuapp.com/api";

export const axiosWithAuth = () => {
  return axios.create({
    baseURL: baseURL,
    header: {
      Authorization: localStorage.getItem("token"),
    },
  });
};
