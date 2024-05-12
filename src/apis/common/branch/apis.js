import axios from "axios";
import queryString from "query-string";

const api =
  process.env.REACT_APP_MODE === "DEVELOPMENT"
    ? require("../../api-dev.json")
    : require("../../api.json");

const getBranches = (filtersObject) => {
  const limit = require("../../pagination/limit.json")["branch"];

  if (filtersObject) {
    const urlWithQueries = queryString.stringifyUrl({
      url: api["branch"],
      query: { limit, ...filtersObject },
    });

    return axios.get(urlWithQueries);
  } else {
    const urlWithQueries = queryString.stringifyUrl({
      url: api["branch"],
      query: { limit },
    });

    return axios.get(urlWithQueries);
  }
};

const getBranch = (branchUrl) => {
  return axios.get(branchUrl);
};

export { getBranches, getBranch };
