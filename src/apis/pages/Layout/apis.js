import axios from "axios";

const api = require("../../api.json");

const logout = (token) => {
  const formData = new FormData();

  console.log(token);

  formData.append("token", token);

  return axios.post(api["log-out"], formData);
};

export { logout };
