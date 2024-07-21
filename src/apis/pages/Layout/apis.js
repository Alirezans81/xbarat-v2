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
    query: { limit },
  });

  return axios.get(urlWithQueries);
};

export { logout, getNews };
