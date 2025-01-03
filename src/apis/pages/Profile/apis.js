import axios from "axios";

import prod from "../../api";
import dev from "../../api-dev";

const api = process.env.REACT_APP_MODE === "DEVELOPMENT" ? dev() : prod();

const getUserInfo = (username) => {
  return axios.get(api["patch-profile"] + username + "/");
};

const updateNameAndAvatar = (username, params) => {
  const formData = new FormData();

  formData.append("first_name", params.first_name);
  formData.append("last_name", params.last_name);
  params.avatar && formData.append("avatar", params.avatar, "avatar.png");

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

const updateDefaultLocale = (username, params) => {
  const formData = new FormData();

  formData.append("default_locale", params.default_locale);

  return axios.patch(api["patch-profile"] + username + "/", formData);
};

export {
  getUserInfo,
  updateNameAndAvatar,
  updatePhone,
  updateNationalInfo,
  updateDefaultLocale,
};
