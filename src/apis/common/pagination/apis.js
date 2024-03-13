import axios from "axios";

const getNextData = (url) => {
  return axios.get(url);
};

const getPreviousData = (url) => {
  return axios.get(url);
};

export { getNextData, getPreviousData };
