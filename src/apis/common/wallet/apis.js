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

const createWalletAsset = (params) => {
  return axios.post(api["wallet-asset"], params);
};

const createWalletTank = (params) => {
  return axios.post(api["wallet-tank"], params);
};

export {
  getWallets,
  getWalletAssets,
  getWalletTanks,
  createWalletAsset,
  createWalletTank,
};
