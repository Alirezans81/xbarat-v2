import axios from "axios";
import queryString from "query-string";

const api =
  process.env.REACT_APP_MODE === "PRODUCTION"
    ? require("../../api-dev.json")
    : require("../../api.json");

const getWallets = (filtersObject) => {
  const urlWithQueries = queryString.stringifyUrl({
    url: api["wallet"],
    query: filtersObject,
  });

  return axios.get(urlWithQueries);
};

const getWalletAssets = (filtersObject, token) => {
  const formData = new FormData();

  formData.append("token", token);

  const urlWithQueries = queryString.stringifyUrl({
    url: api["wallet-asset"],
    query: filtersObject,
  });
  const config = {
    headers: {
      token,
    },
  };
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

const createWalletTank = (params) => {
  return axios.post(api["wallet-tank"], params);
};

const editWalletTank=(walletTankUrl,params)=>{
  const formData=new FormData();
  params.url && formData.append("url",params.url);
  params.currency_abb && formData.append("currency_abb",params.currency_abb);
  params.wallet_tank_type && formData.append("wallet_tank_type",params.wallet_tank_type);
  params.title && formData.append("title",params.title);
  params.balance && formData.append("balance",params.balance);
  params.locked && formData.append("locked",params.locked);
  params.pending && formData.append("pending",params.pending);
  params.bank_info && formData.append("bank_info",params.bank_info);
  params.bank_name && formData.append("bank_name",params.bank_name);
  params.is_deleted && formData.append("is_deleted",params.is_deleted);
  params.account_name && formData.append("account_name",params.account_name);
  return axios.patch(walletTankUrl,formData)
}

const createDeposit = (params) => {
  const formData = new FormData();

  formData.append("user_sender", params.user_sender);
  formData.append("currency", params.currency);
  formData.append("amount", params.amount);
  formData.append("status", params.status);
  params.branch && formData.append("branch", params.branch);

  return axios.post(api["deposit"], formData);
};

const createWithdrawal = (params) => {
  const formData = new FormData();

  formData.append("user_receiver", params.user_receiver);
  formData.append("wallet_tank_receiver", params.wallet_tank_receiver);
  formData.append("currency", params.currency);
  formData.append("amount", params.amount);
  formData.append("status", params.status);
  params.branch && formData.append("branch", params.branch);

  return axios.post(api["withdrawal"], formData);
};

const createTransfer = (params) => {
  const formData = new FormData();

  formData.append("user_sender", params.user_sender);
  formData.append("user_receiver", params.user_receiver);
  formData.append("currency", params.currency);
  formData.append("amount", params.amount);
  formData.append("status", params.status);

  return axios.post(api["transfer"], formData);
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
