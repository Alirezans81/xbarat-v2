import axios from "axios";
import queryString from "query-string";

import prod from "../../api";
import dev from "../../api-dev";

const api = process.env.REACT_APP_MODE === "DEVELOPMENT" ? dev() : prod();

const getStatuses = () => {
  const limit = require("../../pagination/limit.json")["status"];

  const urlWithQueries = queryString.stringifyUrl({
    url: api["status"],
    query: { limit },
  });

  return axios.get(urlWithQueries);
};

export { getStatuses };
