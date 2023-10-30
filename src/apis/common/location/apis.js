import axios from "axios";

const api = require("../../api.json");

const getNationalities = () => {
  return axios.get(api["nationality"]);
};

const getCounties = () => {
  return axios.get(api["nationality"]);
};

const getCities = () => {
  return axios.get(api["nationality"]);
};

export { updateNameAndAvatar, getNationalities, getCounties, getCities };
