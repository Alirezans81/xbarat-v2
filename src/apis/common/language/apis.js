import axios from "axios";
import queryString from "query-string";

const api =
  process.env.REACT_APP_MODE === "PRODUCTION"
    ? require("../../api-dev.json")
    : require("../../api.json");

const getLanguages = () => {
  const limit = require("../../pagination/limit.json")["locale"];

  const urlWithQueries = queryString.stringifyUrl({
    url: api["locale"],
    query: { limit },
  });

  return axios.get(urlWithQueries);
};

const getLanguageFile = (fileUrl) => {
  return axios.get(fileUrl);
};

export { getLanguages, getLanguageFile };
