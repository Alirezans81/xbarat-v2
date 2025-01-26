import axios from "axios";

import prod from "../../api";
import dev from "../../api-dev";

const api = process.env.REACT_APP_MODE === "DEVELOPMENT" ? dev() : prod();

const forgetPasswordSendEmail = (params) => {
  const formData = new FormData();

  formData.append("email", params.email);

  return axios.post(api["forget-password-send-mail"], formData);
};

const forgetPasswordCheck = (params, token) => {
  const formData = new FormData();

  formData.append("code", params.code);

  const headers = {
    Authorization: `Bearer ${token}`,
  };
  return axios.post(api["forget-password-check"], formData, { headers });
};

const forgetPasswordSet = (params, token) => {
  const formData = new FormData();

  formData.append("token", params.token);
  formData.append("password", params.password);

  const headers = {
    Authorization: `Bearer ${token}`,
  };
  return axios.post(api["forget-password-set"], formData, { headers });
};

export { forgetPasswordSendEmail, forgetPasswordCheck, forgetPasswordSet };
