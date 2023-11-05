import axios from "axios";

const api = require("../../api.json");

const getCurrencies = () => {
  return axios.get(api["currency"]);
};

export { getCurrencies };
