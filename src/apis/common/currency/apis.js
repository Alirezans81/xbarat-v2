import axios from "axios";

const api = require("../../api.json");

const getCurrencies = () => {
  return axios.get(api["currency"]);
};

const getCurrency = (currencyUrl) => {
  return axios.get(currencyUrl);
};

export { getCurrencies, getCurrency };
