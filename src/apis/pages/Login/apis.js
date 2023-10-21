import axios from "axios";

const api = require("../../api.json");

const login = (params) => {
  const formData = new FormData();

  formData.append("email", params.email);
  formData.append("password", params.password);

  return axios.post(api["log-in"], formData);
};

export { login };
