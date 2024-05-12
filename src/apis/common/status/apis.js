import axios from "axios";
import queryString from "query-string";

const api =
  process.env.REACT_APP_MODE === "DEVELOPMENT"
    ? require("../../api-dev.json")
    : require("../../api.json");

const getStatuses = () => {
  const limit = require("../../pagination/limit.json")["status"];

  const urlWithQueries = queryString.stringifyUrl({
    url: api["status"],
    query: { limit },
  });

  return axios.get(urlWithQueries);
};

export { getStatuses };
