import axios from "axios";
import queryString from "query-string";

const api =
  process.env.REACT_APP_MODE === "PRODUCTION"
    ? require("../../api-dev.json")
    : require("../../api.json");

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
