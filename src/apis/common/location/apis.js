import axios from "axios";
import queryString from "query-string";

const api =
  process.env.REACT_APP_MODE === "DEVELOPMENT"
    ? require("../../api-dev.json")
    : require("../../api.json");
const limit = require("../../pagination/limit.json");

const getNationalities = () => {
  const urlWithQueries = queryString.stringifyUrl({
    url: api["nationality"],
    query: { limit: limit["nationality"] },
  });

  return axios.get(urlWithQueries);
};

const getCounties = () => {
  const urlWithQueries = queryString.stringifyUrl({
    url: api["country"],
    query: { limit: limit["country"] },
  });

  return axios.get(urlWithQueries);
};

const getCities = (filtersObject) => {
  const urlWithQueries = queryString.stringifyUrl({
    url: api["city"],
    query: { ...filtersObject, limit: limit["city"] },
  });

  return axios.get(urlWithQueries);
};

const getNationality = (nationalityUrl) => {
  return axios.get(nationalityUrl);
};

const getCountry = (countryUrl) => {
  return axios.get(countryUrl);
};

const getCity = (cityUrl) => {
  return axios.get(cityUrl);
};

const getRequiredFeild = (requiredFeildUrl) => {
  return axios.get(requiredFeildUrl);
};

export {
  getNationalities,
  getCounties,
  getCities,
  getNationality,
  getCountry,
  getCity,
  getRequiredFeild,
};
