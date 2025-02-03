import axios from "axios";
import queryString from "query-string";

import prod from "../../api";
import dev from "../../api-dev";

const api = process.env.REACT_APP_MODE === "DEVELOPMENT" ? dev() : prod();

const getNews = () => {
  const limit = require("../../pagination/limit.json")["news"];

  const urlWithQueries = queryString.stringifyUrl({
    url: api["news"],
    query: { limit, is_active: true },
  });

  return axios.get(urlWithQueries);
};
const getNotifs = (user, token) => {
  const limit = require("../../pagination/limit.json")["notify"];

  const urlWithQueries = queryString.stringifyUrl({
    url: api["notify"],
    query: { limit, user, is_active: true },
  });

  const headers = {
    Authorization: `Bearer ${token}`,
  };
  return axios.get(urlWithQueries, { headers });
};
const deleteNotification = (requestUrl, token) => {
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  return axios.delete(requestUrl, { headers });
};

export { getNews, getNotifs, deleteNotification };
