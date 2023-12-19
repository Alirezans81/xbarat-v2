import axios from "axios";

const api = require("../../api.json");

const getUserInfo = (username, params) => {
  return axios.get(api["patch-profile"] + username + "/");
};

const updateNameAndAvatar = (username, params) => {
  const formData = new FormData();

  formData.append("first_name", params.first_name);
  formData.append("last_name", params.last_name);
  params.avatar && formData.append("avatar", params.avatar);

  return axios.patch(api["patch-profile"] + username + "/", formData);
};

const updatePhone = (username, params) => {
  const formData = new FormData();

  formData.append("phone", params.phone);

  return axios.patch(api["patch-profile"] + username + "/", formData);
};

const updateNationalInfo = (username, params) => {
  const formData = new FormData();

  formData.append("country", params.country);
  formData.append("city", params.city);

  return axios.patch(api["patch-profile"] + username + "/", formData);
};

export { getUserInfo, updateNameAndAvatar, updatePhone, updateNationalInfo };
