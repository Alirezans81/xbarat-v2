import axios from "axios";

const api =
  process.env.REACT_APP_MODE === "DEVELOPMENT"
    ? require("../../api-dev.json")
    : require("../../api.json");

const logout = (token) => {
  const formData = new FormData();

  formData.append("token", token);

  return axios.post(api["log-out"], formData);
};
const getNews = (offset) => {
  axios.get(api["news"] + "?" + `offset=${offset}`);
};

export { logout, getNews };
