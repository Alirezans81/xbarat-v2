import axios from "axios";
const api=require("../../api.json")

const getDepositHistory = () => {
    return axios.get(api["deposit"]);
  };
  
  export { getDepositHistory };