import axios from "axios";
import queryString from "query-string";

const api = require("../../api.json");

const getBranches = ({ filtersObject }) => {
  if (filtersObject) {
    const urlWithQueries = queryString.stringifyUrl({
      url: api["branch"],
      query: filtersObject,
    });
    return axios.get(urlWithQueries);
  } else {
    return axios.get(api["branch"]);
  }
};

const getBranch = (branchUrl) => {
  return axios.get(branchUrl);
};

export { getBranches, getBranch };
