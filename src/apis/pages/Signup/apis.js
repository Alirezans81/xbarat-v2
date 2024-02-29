import axios from "axios";

const api =
  process.env.REACT_APP_MODE === "PRODUCTION"
    ? require("../../api-dev.json")
    : require("../../api.json");

const signup = (params) => {
  const formData = new FormData();

  formData.append("email", params.email);
  formData.append("password", params.password);
  params.referral && formData.append("referral", params.referral);

  return axios.post(api["sign-up"], formData);
};

export { signup };
