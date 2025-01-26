import axios from "axios";
import queryString from "query-string";

import prod from "../../api";
import dev from "../../api-dev";

const api = process.env.REACT_APP_MODE === "DEVELOPMENT" ? dev() : prod();
const limit = require("../../pagination/limit.json");

const getNationalities = (token) => {
  const urlWithQueries = queryString.stringifyUrl({
    url: api["nationality"],
    query: { limit: limit["nationality"], is_active: true },
  });

  const headers = {
    Authorization: `Bearer ${token}`,
  };
  return axios.get(urlWithQueries, { headers });
};

const getCounties = (token) => {
  const urlWithQueries = queryString.stringifyUrl({
    url: api["country"],
    query: { limit: limit["country"], is_active: true },
  });

  const headers = {
    Authorization: `Bearer ${token}`,
  };
  return axios.get(urlWithQueries, { headers });
};

const getCities = (filtersObject, token) => {
  const urlWithQueries = queryString.stringifyUrl({
    url: api["city"],
    query: { ...filtersObject, limit: limit["city"], is_active: true },
  });

  const headers = {
    Authorization: `Bearer ${token}`,
  };
  return axios.get(urlWithQueries, { headers });
};

const getNationality = (nationalityUrl, token) => {
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  return axios.get(nationalityUrl, { headers });
};

const getCountry = (countryUrl, token) => {
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  return axios.get(countryUrl, { headers });
};

const getCity = (cityUrl, token) => {
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  return axios.get(cityUrl, { headers });
};

const getRequiredFeild = (requiredFeildUrl, token) => {
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  return axios.get(requiredFeildUrl, { headers });
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
