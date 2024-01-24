import axios from "axios";

const api =
  process.env.REACT_APP_MODE === "PRODUCTION"
    ? require("../../api-dev.json")
    : require("../../api.json");

const getLanguages = () => {
  return axios.get(api["locale"]);
};

const getLanguageFile = (fileUrl) => {
  return axios.get(fileUrl);
};

export { getLanguages, getLanguageFile };
