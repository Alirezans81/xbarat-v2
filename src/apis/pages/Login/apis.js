import axios from "axios";

const api =
  process.env.REACT_APP_MODE === "PRODUCTION"
    ? require("../../api-dev.json")
    : require("../../api.json");

const login = (params) => {
  const formData = new FormData();

  formData.append("email", params.email);
  formData.append("password", params.password);

  return axios.post(api["log-in"], formData);
};

export { login };
