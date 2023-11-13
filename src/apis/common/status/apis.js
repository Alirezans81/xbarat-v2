import axios from "axios";

const api = require("../../api.json");

const getStatuses = () => {
  return axios.get(api["status"]);
};

export { getStatuses };
