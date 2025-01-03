import axios from "axios";

import prod from "../../api";
import dev from "../../api-dev";

const api = process.env.REACT_APP_MODE === "DEVELOPMENT" ? dev() : prod();

const changePassword = (token, params) => {
  const formData = new FormData();

  formData.append("token", token);
  formData.append("password", params.password);
  formData.append("new_password", params.new_password);

  return axios.post(api["change-password"], formData);
};

export { changePassword };
