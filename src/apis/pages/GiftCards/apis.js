import axios from "axios";
import queryString from "query-string";

import prod from "../../api";
import dev from "../../api-dev";

const api = process.env.REACT_APP_MODE === "DEVELOPMENT" ? dev() : prod();
const limit = require("../../pagination/limit.json");

const getGiftCardSites = () => {
  const urlWithQueries = queryString.stringifyUrl({
    url: api["giftcard-site"],
    query: { limit: limit["giftcard-site"], is_active: true },
  });

  return axios.get(urlWithQueries);
};

export { getGiftCardSites };
