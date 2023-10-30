import axios from "axios";

const api = require("../../api.json");

const fetchStep1 = (username, params) => {
  const formData = new FormData();

  formData.append("first_name", params.first_name);
  formData.append("last_name", params.last_name);
  formData.append("phone", params.phone);

  return axios.patch(api["patch-profile"] + username + "/", formData);
};

const fetchStep2 = (username, params) => {
  const formData = new FormData();

  formData.append("first_name", params.first_name);
  formData.append("last_name", params.last_name);
  params.avatar && formData.append("phone", params.phone);

  return axios.patch(api["patch-profile"] + username + "/", formData);
};

const fetchStep3 = (username, params) => {
  const formData = new FormData();

  formData.append("first_name", params.first_name);
  formData.append("last_name", params.last_name);
  params.avatar && formData.append("phone", params.phone);

  return axios.patch(api["patch-profile"] + username + "/", formData);
};

const fetchStep4 = (username, params) => {
  const formData = new FormData();

  formData.append("first_name", params.first_name);
  formData.append("last_name", params.last_name);
  params.avatar && formData.append("phone", params.phone);

  return axios.patch(api["patch-profile"] + username + "/", formData);
};

export { fetchStep1, fetchStep2, fetchStep3, fetchStep4 };
