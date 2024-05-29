import axios from "axios";
import { stringify } from "postcss";
import queryString from "query-string";

const api =
  process.env.REACT_APP_MODE === "DEVELOPMENT"
    ? require("../../api-dev.json")
    : require("../../api.json");
const limit = require("../../pagination/limit.json");

const user = JSON.parse(window.localStorage.getItem("userInfo"));

const getDepositHistorySingleUser = (filtersObject) => {
  const urlWithQueries = queryString.stringifyUrl({
    url: api["deposit"] + "?user_sender=" + user.username,
    query: filtersObject
      ? { limit: limit["deposit"], ...filtersObject }
      : { limit: limit["deposit"] },
  });
  return axios.get(urlWithQueries);
};

const getWithdrawHistorySingleUser = (filtersObject) => {
  const urlWithQueries = queryString.stringifyUrl({
    url: api["withdraw"] + "?user_sender=" + user.username,
    query: filtersObject
      ? { limit: limit["withdraw"], ...filtersObject }
      : { limit: limit["withdraw"] },
  });
  return axios.get(urlWithQueries);
};

const getExchangeHistorySingleUser = (filtersObject) => {
  const urlWithQueries = queryString.stringifyUrl({
    url: api["exchange"] + "?user=" + user.username,
    query: filtersObject
      ? { limit: limit["exchange"], ...filtersObject }
      : { limit: limit["exchange"] },
  });
  return axios.get(urlWithQueries);
};

const getTransferHistorySingleUser = (filtersObject) => {
  const urlWithQueries = queryString.stringifyUrl({
    url: api["transfer"] + "?user_sender=" + user.username,
    query: filtersObject
      ? { limit: limit["transfer"], ...filtersObject }
      : { limit: limit["transfer"] },
  });

  return axios.get(urlWithQueries);
};

const getDepositHistory = (filtersObject) => {
  const urlWithQueries = queryString.stringifyUrl({
    url: api["deposit"],
    query: { limit: limit["deposit"], offset: filtersObject } || {
      limit: limit["deposit"],
    },
  });
  console.log(urlWithQueries);

  return axios.get(urlWithQueries);
};

const getWithdrawHistory = (filtersObject) => {
  const urlWithQueries = queryString.stringifyUrl({
    url: api["withdrawal"],
    query: { limit: limit["withdrawal"], ...filtersObject } || {
      limit: limit["withdrawal"],
    },
  });

  return axios.get(urlWithQueries);
};

const getTransferHistory = (filtersObject) => {
  const urlWithQueries = queryString.stringifyUrl({
    url: api["transfer"],
    query: { limit: limit["transfer"], ...filtersObject } || {
      limit: limit["transfer"],
    },
  });

  return axios.get(urlWithQueries);
};

const getExchangeHistory = (filtersObject) => {
  console.log(filtersObject);

  const urlWithQueries = queryString.stringifyUrl({
    url: api["exchange"],
    query: { limit: limit["exchange"], ...filtersObject } || {
      limit: limit["exchange"],
    },
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
  getDepositHistorySingleUser,
  getWithdrawHistorySingleUser,
  getExchangeHistorySingleUser,
  getTransferHistorySingleUser,
};
