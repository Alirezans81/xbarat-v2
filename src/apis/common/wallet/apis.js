import axios from "axios";
import queryString from "query-string";

import prod from "../../api";
import dev from "../../api-dev";

const api = process.env.REACT_APP_MODE === "DEVELOPMENT" ? dev() : prod();

const getWallets = (filtersObject, token) => {
  const limit = require("../../pagination/limit.json")["wallet"];

  if (filtersObject) {
    const urlWithQueries = queryString.stringifyUrl({
      url: api["wallet"],
      query: { limit, ...filtersObject, is_active: true },
    });

    const headers = {
      Authorization: `Bearer ${token}`,
    };
    return axios.get(urlWithQueries, { headers });
  } else {
    const urlWithQueries = queryString.stringifyUrl({
      url: api["wallet"],
      query: { limit, is_active: true },
    });

    const headers = {
      Authorization: `Bearer ${token}`,
    };
    return axios.get(urlWithQueries, { headers });
  }
};

const getWalletAssets = (filtersObject, token) => {
  const limit = require("../../pagination/limit.json")["wallet-asset"];

  if (filtersObject) {
    const urlWithQueries = queryString.stringifyUrl({
      url: api["wallet-asset"],
      query: { limit, ...filtersObject, is_active: true },
    });

    const headers = {
      Authorization: `Bearer ${token}`,
    };
    return axios.get(urlWithQueries, { headers });
  } else {
    const urlWithQueries = queryString.stringifyUrl({
      url: api["wallet-asset"],
      query: { limit, is_active: true },
    });

    const headers = {
      Authorization: `Bearer ${token}`,
    };
    return axios.get(urlWithQueries, { headers });
  }
};

const getWalletTanks = (filtersObject, token) => {
  const limit = require("../../pagination/limit.json")["wallet-tank"];

  if (filtersObject) {
    const urlWithQueries = queryString.stringifyUrl({
      url: api["wallet-tank"],
      query: { limit, ...filtersObject, is_active: true },
    });

    const headers = {
      Authorization: `Bearer ${token}`,
    };
    return axios.get(urlWithQueries, { headers });
  } else {
    const urlWithQueries = queryString.stringifyUrl({
      url: api["wallet-tank"],
      query: { limit, is_active: true },
    });

    const headers = {
      Authorization: `Bearer ${token}`,
    };
    return axios.get(urlWithQueries, { headers });
  }
};

const getWalletTankTypes = (filtersObject, token) => {
  const limit = require("../../pagination/limit.json")["wallet-tank-type"];

  if (filtersObject) {
    const urlWithQueries = queryString.stringifyUrl({
      url: api["wallet-tank-type"],
      query: { limit, ...filtersObject, is_active: true },
    });

    const headers = {
      Authorization: `Bearer ${token}`,
    };
    return axios.get(urlWithQueries, { headers });
  } else {
    const urlWithQueries = queryString.stringifyUrl({
      url: api["wallet-tank-type"],
      query: { limit, is_active: true },
    });

    const headers = {
      Authorization: `Bearer ${token}`,
    };
    return axios.get(urlWithQueries, { headers });
  }
};

const createWalletTank = (params, token) => {
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  return axios.post(api["wallet-tank"], params, { headers });
};

const editWalletTank = (walletTankUrl, params, token) => {
  const formData = new FormData();
  params.url && formData.append("url", params.url);
  params.currency_abb && formData.append("currency_abb", params.currency_abb);
  params.wallet_tank_type &&
    formData.append("wallet_tank_type", params.wallet_tank_type);
  params.title && formData.append("title", params.title);
  params.balance && formData.append("balance", params.balance);
  params.locked && formData.append("locked", params.locked);
  params.pending && formData.append("pending", params.pending);
  params.bank_info && formData.append("bank_info", params.bank_info);
  params.bank_name && formData.append("bank_name", params.bank_name);
  params.is_deleted && formData.append("is_deleted", params.is_deleted);
  params.account_name && formData.append("account_name", params.account_name);
  formData.append("is_favorite", params.is_favorite);

  const headers = {
    Authorization: `Bearer ${token}`,
  };
  return axios.patch(walletTankUrl, formData, { headers });
};

const createDeposit = (params, token) => {
  const formData = new FormData();

  formData.append("user_sender", params.user_sender);
  formData.append("currency", params.currency);
  formData.append("amount", params.amount);
  formData.append("status", params.status);
  params.branch && formData.append("branch", params.branch);

  const headers = {
    Authorization: `Bearer ${token}`,
  };
  return axios.post(api["deposit"], formData, { headers });
};

const createWithdrawal = (params, token) => {
  const formData = new FormData();

  formData.append("user_receiver", params.user_receiver);
  formData.append("wallet_tank_detail_receiver", params.wallet_tank_receiver);
  formData.append("currency", params.currency);
  formData.append("amount", params.amount);
  formData.append("status", params.status);
  params.branch && formData.append("branch", params.branch);

  const headers = {
    Authorization: `Bearer ${token}`,
  };
  return axios.post(api["withdrawal"], formData, { headers });
};

const createTransfer = (params, token) => {
  const formData = new FormData();

  formData.append("user_sender", params.user_sender);
  formData.append("user_receiver", params.user_receiver);
  formData.append("currency", params.currency);
  formData.append("amount", params.amount);
  formData.append("status", params.status);

  const headers = {
    Authorization: `Bearer ${token}`,
  };
  return axios.post(api["transfer"], formData, { headers });
};

export {
  getWallets,
  getWalletAssets,
  getWalletTanks,
  getWalletTankTypes,
  createWalletTank,
  createDeposit,
  createWithdrawal,
  createTransfer,
  editWalletTank,
};
