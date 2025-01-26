import axios from "axios";
import queryString from "query-string";

import prod from "../../api";
import dev from "../../api-dev";

const api = process.env.REACT_APP_MODE === "DEVELOPMENT" ? dev() : prod();

const getBranches = (filtersObject, token) => {
  const limit = require("../../pagination/limit.json")["branch"];

  if (filtersObject) {
    const urlWithQueries = queryString.stringifyUrl({
      url: api["branch"],
      query: { limit, ...filtersObject, is_active: true },
    });

    const headers = {
      Authorization: `Bearer ${token}`,
    };
    return axios.get(urlWithQueries, { headers });
  } else {
    const urlWithQueries = queryString.stringifyUrl({
      url: api["branch"],
      query: { limit, is_active: true },
    });

    const headers = {
      Authorization: `Bearer ${token}`,
    };
    return axios.get(urlWithQueries, { headers });
  }
};

const getBranch = (branchUrl, token) => {
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  return axios.get(branchUrl, { headers });
};

export { getBranches, getBranch };
