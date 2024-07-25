import axios from "axios";
import queryString from "query-string";

import prod from "../../api";
import dev from "../../api-dev";

const api = process.env.REACT_APP_MODE === "DEVELOPMENT" ? dev() : prod();

const logout = (token) => {
  const formData = new FormData();

  formData.append("token", token);

  return axios.post(api["log-out"], formData);
};
const getNews = () => {
<<<<<<< HEAD
  axios.get(api["news"]);
=======
  const limit = require("../../pagination/limit.json")["news"];

  const urlWithQueries = queryString.stringifyUrl({
    url: api["news"],
    query: { limit },
  });

  return axios.get(urlWithQueries);
>>>>>>> 69ff67a4f2671f49108fb88bdc1fd2fd23a9bb4c
};
const getNotifs = () => {
  return axios.get(api["notify"]);
};
const deleteNotification = (requestUrl) => {
  axios.delete(requestUrl);
};
export { logout, getNews, getNotifs, deleteNotification };
