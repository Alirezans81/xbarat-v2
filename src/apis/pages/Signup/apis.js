import axios from "axios";

const api = require("../../api.json");

const signup = (params) => {
  const formData = new FormData();

  formData.append("email", params.email);
  formData.append("password", params.password);
  params.referral_code &&
    formData.append("referral_code", params.referral_code);

  return axios.post(api["sign-up"], formData);
};

export { signup };
