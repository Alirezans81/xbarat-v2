import axios from "axios";
import queryString from "query-string";

const api = require("../../api.json");

const getNationalities = () => {
  return axios.get(api["nationality"]);
};

const getCounties = () => {
  return axios.get(api["country"]);
};

const getCities = (filtersObject) => {
  const urlWithQueries = queryString.stringifyUrl({
    url: api["city"],
    query: filtersObject,
  });

  return axios.get(urlWithQueries);
};

export { getNationalities, getCounties, getCities };
