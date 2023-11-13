import axios from "axios";

const api = require("../../api.json");

const logout = (token) => {
  const formData = new FormData();

  formData.append("token", token);

  return axios.post(api["log-out"], formData);
};

export { logout };
