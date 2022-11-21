import { LOGIN } from "../types";
import axios from "configs/axios";

export const login = (payload) => (dispatch) => {
  dispatch({
    type: LOGIN,
    payload: payload,
  });
};

export const submitBooking = (payload) => () => {
  return axios.post(`/login`, payload, {
    headers: { contentType: "multipart/form-data" },
  });
};