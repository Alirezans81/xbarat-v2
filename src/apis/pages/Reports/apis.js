import axios from "axios";
import queryString from "query-string";
import prod from "../../api";
import dev from "../../api-dev";

const api = process.env.REACT_APP_MODE === "DEVELOPMENT" ? dev() : prod();
const limit = require("../../pagination/limit.json");

const user = JSON.parse(window.localStorage.getItem("userInfo"));

const getDepositHistorySingleUser = (filtersObject, token) => {
  const urlWithQueries = queryString.stringifyUrl({
    url: api["deposit"] + "?user_sender=" + user.username,
    query: filtersObject
      ? { limit: limit["deposit"], ...filtersObject }
      : { limit: limit["deposit"] },
  });

  const headers = {
    Authorization: `Bearer ${token}`,
  };
  return axios.get(urlWithQueries, { headers });
};

const getWithdrawHistorySingleUser = (filtersObject, token) => {
  const urlWithQueries = queryString.stringifyUrl({
    url: api["withdrawal"] + "?user_receiver=" + user.username,
    query: filtersObject
      ? { limit: limit["withdrawal"], ...filtersObject }
      : { limit: limit["withdrawal"] },
  });

  const headers = {
    Authorization: `Bearer ${token}`,
  };
  return axios.get(urlWithQueries, { headers });
};

const getExchangeHistorySingleUser = (filtersObject, token) => {
  const urlWithQueries = queryString.stringifyUrl({
    url: api["exchange"] + "?user=" + user.username,
    query: filtersObject
      ? { limit: limit["exchange"], ...filtersObject }
      : { limit: limit["exchange"] },
  });

  const headers = {
    Authorization: `Bearer ${token}`,
  };
  return axios.get(urlWithQueries, { headers });
};

const getTransferHistorySingleUser = (filtersObject, token) => {
  const urlWithQueries = queryString.stringifyUrl({
    url: api["transfer"] + "?user_sender=" + user.username,
    query: filtersObject
      ? { limit: limit["transfer"], ...filtersObject }
      : { limit: limit["transfer"] },
  });

  const headers = {
    Authorization: `Bearer ${token}`,
  };
  return axios.get(urlWithQueries, { headers });
};

const getDepositHistory = (filtersObject, token) => {
  const urlWithQueries = queryString.stringifyUrl({
    url: api["deposit"],
    query: { limit: limit["deposit"], offset: filtersObject } || {
      limit: limit["deposit"],
    },
  });

  const headers = {
    Authorization: `Bearer ${token}`,
  };
  return axios.get(urlWithQueries, { headers });
};

const getWithdrawHistory = (filtersObject, token) => {
  const urlWithQueries = queryString.stringifyUrl({
    url: api["withdrawal"],
    query: { limit: limit["withdrawal"], ...filtersObject } || {
      limit: limit["withdrawal"],
    },
  });

  const headers = {
    Authorization: `Bearer ${token}`,
  };
  return axios.get(urlWithQueries, { headers });
};

const getTransferHistory = (filtersObject, token) => {
  const urlWithQueries = queryString.stringifyUrl({
    url: api["transfer"],
    query: { limit: limit["transfer"], ...filtersObject } || {
      limit: limit["transfer"],
    },
  });

  const headers = {
    Authorization: `Bearer ${token}`,
  };
  return axios.get(urlWithQueries, { headers });
};

const getExchangeHistory = (filtersObject, token) => {
  const urlWithQueries = queryString.stringifyUrl({
    url: api["exchange"],
    query: { limit: limit["exchange"], ...filtersObject } || {
      limit: limit["exchange"],
    },
  });

  const headers = {
    Authorization: `Bearer ${token}`,
  };
  return axios.get(urlWithQueries, { headers });
};

const getTop5Report = (token, params) => {
  const formData = new FormData();

  params.count && formData.append("count", params.count);

  const headers = {
    Authorization: `Bearer ${token}`,
  };
  return axios.post(api["top-5-report"], formData, { headers });
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
