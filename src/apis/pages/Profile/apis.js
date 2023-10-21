import axios from "axios";

const api = require("../../api.json");

const updateName = (id, params) => {
  const formData = new FormData();

  formData.append("first_name", params.first_name);
  formData.append("last_name", params.last_name);

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

export { updateName };
