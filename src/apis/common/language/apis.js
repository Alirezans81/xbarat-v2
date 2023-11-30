import axios from "axios";

const api = require("../../api.json");

const getLanguages = () => {
  return axios.get(api["locale"]);
};

const getLanguageFile = (fileUrl) => {
  return axios.get(fileUrl);
};

export { getLanguages, getLanguageFile };
