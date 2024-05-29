import axios from "axios";
import queryString from "query-string";

const api =
  process.env.REACT_APP_MODE === "DEVELOPMENT"
    ? require("../../api-dev.json")
    : require("../../api.json");

const getCurrencies = () => {
  const limit = require("../../pagination/limit.json")["currency"];

  const urlWithQueries = queryString.stringifyUrl({
    url: api["currency"],
    query: { limit },
  });

  return axios.get(urlWithQueries);
};

const getCurrency = (currencyUrl) => {
  return axios.get(currencyUrl);
};

const getCurrencyPairs = (filtersObject) => {
  const limit = require("../../pagination/limit.json")["currency-pair"];

  if (filtersObject) {
    const urlWithQueries = queryString.stringifyUrl({
      url: api["currency-pair"],
      query: { limit, ...filtersObject },
    });

    return axios.get(urlWithQueries);
  } else {
    const urlWithQueries = queryString.stringifyUrl({
      url: api["currency-pair"],
      query: { limit },
    });

    return axios.get(urlWithQueries);
  }
};

export { getCurrencies, getCurrency, getCurrencyPairs };
