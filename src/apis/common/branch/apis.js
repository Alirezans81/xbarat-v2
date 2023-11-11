import axios from "axios";
import queryString from "query-string";

const api = require("../../api.json");

const getBranches = (filtersObject) => {
  console.log(filtersObject);
  if (filtersObject) {
    const urlWithQueries = queryString.stringifyUrl({
      url: api["branch"],
      query: filtersObject,
    });

    console.log(urlWithQueries);
    return axios.get(urlWithQueries);
  } else {
    return axios.get(api["branch"]);
  }
};

const getBranch = (branchUrl) => {
  return axios.get(branchUrl);
};

export { getBranches, getBranch };
