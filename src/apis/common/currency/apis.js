import axios from "axios";
import queryString from "query-string";

const api =
  process.env.REACT_APP_MODE === "PRODUCTION"
    ? require("../../api-dev.json")
    : require("../../api.json");

const getCurrencies = () => {
  return axios.get(api["currency"]);
};

const getCurrency = (currencyUrl) => {
  return axios.get(currencyUrl);
};

const getCurrencyPairs = (filtersObject) => {
  if (filtersObject) {
    const urlWithQueries = queryString.stringifyUrl({
      url: api["currency-pair"],
      query: filtersObject,
    });

    return axios.get(urlWithQueries);
  }
  return axios.get(api["currency-pair"]);
};

export { getCurrencies, getCurrency, getCurrencyPairs };
