import axios from "axios";

import prod from "../../api";
import dev from "../../api-dev";

const api = process.env.REACT_APP_MODE === "DEVELOPMENT" ? dev() : prod();
console.log(process.env);
const login = (params) => {
  const formData = new FormData();

  formData.append("email", params.email);
  formData.append("password", params.password);

  return axios.post(api["log-in"], formData);
};

export { login };
