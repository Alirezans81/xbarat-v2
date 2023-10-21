import axios from "axios";

const api = require("../../api.json");

const logout = (id) => {
  return axios.get(api["log-out"] + id);
};

export { logout };
