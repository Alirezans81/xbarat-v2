import axios from "axios";

import prod from "../../api";
import dev from "../../api-dev";

const api = process.env.REACT_APP_MODE === "DEVELOPMENT" ? dev() : prod();

const getUserInfo = (token) => {
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  return axios.get(api["patch-profile"], { headers });
};

const updateNameAndAvatar = (username, token, params) => {
  const formData = new FormData();

  formData.append("first_name", params.first_name);
  formData.append("last_name", params.last_name);
  params.avatar && formData.append("avatar", params.avatar, "avatar.png");

  const headers = {
    Authorization: `Bearer ${token}`,
  };
  return axios.patch(api["patch-profile"] + username + "/", formData, {
    headers,
  });
};

const updatePhone = (username, token, params) => {
  const formData = new FormData();

  formData.append("phone", params.phone);

  const headers = {
    Authorization: `Bearer ${token}`,
  };
  return axios.patch(api["patch-profile"] + username + "/", formData, {
    headers,
  });
};

const updateNationalInfo = (username, token, params) => {
  const formData = new FormData();

  formData.append("country", params.country);
  formData.append("city", params.city);

  const headers = {
    Authorization: `Bearer ${token}`,
  };
  return axios.patch(api["patch-profile"] + username + "/", formData, {
    headers,
  });
};

const updateDefaultLocale = (username, token, params) => {
  const formData = new FormData();

  formData.append("default_locale", params.default_locale);

  const headers = {
    Authorization: `Bearer ${token}`,
  };
  return axios.patch(api["patch-profile"] + username + "/", formData, {
    headers,
  });
};

export {
  getUserInfo,
  updateNameAndAvatar,
  updatePhone,
  updateNationalInfo,
  updateDefaultLocale,
};
