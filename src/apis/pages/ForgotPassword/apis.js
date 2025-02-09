import axios from "axios";

import prod from "../../api";
import dev from "../../api-dev";

const api = process.env.REACT_APP_MODE === "DEVELOPMENT" ? dev() : prod();

const forgetPasswordSendEmail = (params) => {
  const formData = new FormData();

  formData.append("email", params.email);

  return axios.post(api["forget-password-send-mail"], formData);
};

const forgetPasswordCheck = (params) => {
  const formData = new FormData();

  formData.append("code", params.code);

  return axios.post(api["forget-password-check"], formData);
};

const forgetPasswordSet = (params, token) => {
  const formData = new FormData();

  formData.append("password", params.password);
  formData.append("token", token);

  return axios.post(api["forget-password-set"], formData);
};

export { forgetPasswordSendEmail, forgetPasswordCheck, forgetPasswordSet };
