import axios from "axios";

const api =
  process.env.REACT_APP_MODE === "PRODUCTION"
    ? require("../../api-dev.json")
    : require("../../api.json");

const changePassword = (token, params) => {
  const formData = new FormData();

  formData.append("token", token);
  formData.append("password", params.password);
  formData.append("new_password", params.new_password);

  return axios.post(api["change-password"], formData);
};

export { changePassword };
