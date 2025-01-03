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
  const limit = require("../../pagination/limit.json")["news"];

  const urlWithQueries = queryString.stringifyUrl({
    url: api["news"],
    query: { limit, is_active: true },
  });

  return axios.get(urlWithQueries);
};

const getNotifs = (user) => {
  const limit = require("../../pagination/limit.json")["notify"];

  const urlWithQueries = queryString.stringifyUrl({
    url: api["notify"],
    query: { limit, user, is_active: true },
  });

  return axios.get(urlWithQueries);
};

const deleteNotification = (requestUrl) => {
  return axios.delete(requestUrl);
};

export { logout, getNews, getNotifs, deleteNotification };
