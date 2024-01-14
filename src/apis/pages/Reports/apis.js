import axios from "axios";
const api=require("../../api.json")

const getDepositHistory = () => {
    return axios.get(api["deposit"]);
};
const getWithdrawHistory = () => {
  return axios.get(api["withdraw"]);
};
  
  export { getDepositHistory,getWithdrawHistory };