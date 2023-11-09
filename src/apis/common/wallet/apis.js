import axios from "axios";
import queryString from "query-string";

const api = require("../../api.json");

const getWallets = (filtersObject) => {
  const urlWithQueries = queryString.stringifyUrl({
    url: api["wallet"],
    query: filtersObject,
  });

  return axios.get(urlWithQueries);
};

const getWalletAssets = (filtersObject) => {
  const urlWithQueries = queryString.stringifyUrl({
    url: api["wallet-asset"],
    query: filtersObject,
  });

  return axios.get(urlWithQueries);
};

const getWalletTanks = (filtersObject) => {
  const urlWithQueries = queryString.stringifyUrl({
    url: api["wallet-tank"],
    query: filtersObject,
  });

  return axios.get(urlWithQueries);
};

const getWalletTankTypes = (filtersObject) => {
  if (filtersObject) {
    const urlWithQueries = queryString.stringifyUrl({
      url: api["wallet-tank-type"],
      query: filtersObject,
    });
    return axios.get(urlWithQueries);
  } else {
    return axios.get(api["wallet-tank-type"]);
  }
};

const createWalletAsset = (params) => {
  const formData = new FormData();

  formData.append("title", "");

  return axios.post(api["wallet-asset"], params);
};

const createWalletTank = (params) => {
  return axios.post(api["wallet-tank"], params);
};

const createDeposit = (params) => {
  const formData = new FormData();

  formData.append("user_sender", params.user_sender);
  formData.append("wallet_tank_sender", params.wallet_tank_sender);
  formData.append("currency", params.currency);
  formData.append("amount", params.amount);
  formData.append("branch", params.branch);

  return axios.post(api["deposit"], formData);
};

const createWithdrawal = (params) => {
  const formData = new FormData();

  formData.append("user_receiver", params.user_receiver);
  formData.append("wallet_tank_receiver", params.wallet_tank_receiver);
  formData.append("currency", params.currency);
  formData.append("amount", params.amount);

  return axios.post(api["withdrawal"], formData);
};

const createTransfer = (params) => {
  const formData = new FormData();

  formData.append("user_sender", params.user_sender);
  formData.append("wallet_tank_sender", params.wallet_tank_sender);
  formData.append("user_receiver", params.user_receiver);
  formData.append("wallet_tank_receiver", params.wallet_tank_receiver);
  formData.append("currency", params.currency);
  formData.append("amount", params.amount);

  return axios.post(api["transfer"], formData);
};

export {
  getWallets,
  getWalletAssets,
  getWalletTanks,
  getWalletTankTypes,
  createWalletAsset,
  createWalletTank,
  createDeposit,
  createWithdrawal,
  createTransfer,
};
