import axios from "axios";
import queryString from "query-string";

const api =
  process.env.REACT_APP_MODE === "PRODUCTION"
    ? require("../../api-dev.json")
    : require("../../api.json");


const getDepositHistory = (filtersObject) => {
  const urlWithQueries = queryString.stringifyUrl({
    url: api["deposit"],
    query: filtersObject || {},
  });

  return axios.get(urlWithQueries);
};

const getWithdrawHistory = (filtersObject) => {
  const urlWithQueries = queryString.stringifyUrl({
    url: api["withdrawal"],
    query: filtersObject || {},
  });

  return axios.get(urlWithQueries);
};

const getTransferHistory = (filtersObject) => {
  const urlWithQueries = queryString.stringifyUrl({
    url: api["transfer"],
    query: filtersObject || {},
  });

  return axios.get(urlWithQueries);
};

const getExchangeHistory = (filtersObject) => {
  const urlWithQueries = queryString.stringifyUrl({
    url: api["exchnage"],
    query: filtersObject || {},
  });

  return axios.get(urlWithQueries);
};

const getTop5Report = (token, params) => {
  const formData = new FormData();

  token && formData.append("token", token);
  params.count && formData.append("count", params.count);

  return axios.post(api["top-5-report"], formData);
};

export {
  getDepositHistory,
  getWithdrawHistory,
  getTransferHistory,
  getExchangeHistory,
  getTop5Report,
};
