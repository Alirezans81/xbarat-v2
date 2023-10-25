import axios from "axios";

const api = require("../../api.json");

const updateNameAndAvatar = (id, params) => {
  const formData = new FormData();

  formData.append("first_name", params.first_name);
  formData.append("last_name", params.last_name);
  params.avatar && formData.append("avatar", params.avatar);

  return axios.patch(api["patch-profile"] + id + "/", formData);
};

const getNationalities = (params) => {
  return axios.get(api["nationality"]);
};

const getCounties = (params) => {
  return axios.get(api["nationality"]);
};

const getCities = (params) => {
  return axios.get(api["nationality"]);
};

export { updateNameAndAvatar };
