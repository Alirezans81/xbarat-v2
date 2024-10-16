import axios from "axios";
import queryString from "query-string";
import prod from "../../api";
import dev from "../../api-dev";
const api = process.env.REACT_APP_MODE === "DEVELOPMENT" ? dev() : prod();
const getLanguages = () => {
  const limit = require("../../pagination/limit.json")["locale"];

  const urlWithQueries = queryString.stringifyUrl({
    url: api["locale"],
    query: { limit, is_active: true },
  });

  return axios.get(urlWithQueries);
};

const getLanguageFile = (fileUrl) => {
  return axios.get(fileUrl);
};

export { getLanguages, getLanguageFile };
