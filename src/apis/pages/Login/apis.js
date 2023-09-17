import axios from "axios";

const api = require("../../api.json");

const login = (params) => {
  return axios.post(api["log-in"], params);
};

export { login };
