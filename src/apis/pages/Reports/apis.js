import axios from "axios";
const api=require("../../api.json")

const getDepositHistory = () => {
    return axios.get(api["deposit"]);
};
const getWithdrawHistory = () => {
  return axios.get(api["withdraw"]);
};
const getTransferHistory = () => {
  return axios.get(api["trasnfer"]);
};
const getExchangeHistory = () => {
  return axios.get(api["exchange"]);
};
  export { getDepositHistory,getWithdrawHistory,getTransferHistory,getExchangeHistory };