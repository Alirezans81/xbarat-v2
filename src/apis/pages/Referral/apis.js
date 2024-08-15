import axios from "axios";
import queryString from "query-string";

import prod from "../../api";
import dev from "../../api-dev";

const api = process.env.REACT_APP_MODE === "DEVELOPMENT" ? dev() : prod();

const getReferraledUser = (referred_by) => {
  const limit = require("../../pagination/limit.json")["patch-profile"];

  const urlWithQueries = queryString.stringifyUrl({
    url: api["patch-profile"],
    query: { limit, referred_by },
  });

  return axios.get(urlWithQueries);
};

export { getReferraledUser };
