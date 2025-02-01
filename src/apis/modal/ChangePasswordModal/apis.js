import axios from "axios";

import prod from "../../api";
import dev from "../../api-dev";

const api = process.env.REACT_APP_MODE === "DEVELOPMENT" ? dev() : prod();

const changePassword = (params, token) => {
  const formData = new FormData();

  formData.append("password", params.password);
  formData.append("new_password", params.new_password);

  const headers = {
    Authorization: `Bearer ${token}`,
  };
  return axios.post(api["change-password"], formData, { headers });
};

export { changePassword };
