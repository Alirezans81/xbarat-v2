import axios from "axios";

const api =
  process.env.REACT_APP_MODE === "PRODUCTION"
    ? require("../../api-dev.json")
    : require("../../api.json");

const forgotPassword = (params) => {
  const formData = new FormData();

  formData.append("password", params.password);
  formData.append("token", params.token);

  return axios.post(api["forgot-password"], formData);
};

export { forgotPassword };
