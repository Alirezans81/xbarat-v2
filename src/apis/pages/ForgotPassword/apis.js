import axios from "axios";

import prod from "../../api";
import dev from "../../api-dev";

const api = dev();

const forgotPassword = (params) => {
  const formData = new FormData();

  formData.append("password", params.password);
  formData.append("token", params.token);

  return axios.post(api["forgot-password"], formData);
};

export { forgotPassword };
