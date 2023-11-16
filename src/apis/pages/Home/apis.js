import axios from "axios";

const api = require("../../api.json");

const getTableExchange = (params) => {
  const formData = new FormData();

  formData.append("source", params.source);
  formData.append("target", params.target);

  return axios.post(api["table-exchange"], formData);
};

const exchange = (params) => {
  const formData = new FormData();

  formData.append("user", params.user);
  formData.append("currency_pair", params.currency_pair);
  formData.append("amount_source", params.amount_source);
  formData.append("amount_destination", params.amount_destination);
  formData.append("rate", params.rate);

  return axios.post(api["table-exchange"], formData);
};

const getPendingExchanges = (token) => {
  const formData = new FormData();

  formData.append("token", token);

  return axios.post(api["pending-exchange"], formData);
};

const cancelPendingExchange = (pendingExchangeUrl) => {
  return axios.delete(pendingExchangeUrl);
};

export {
  getTableExchange,
  exchange,
  getPendingExchanges,
  cancelPendingExchange,
};
