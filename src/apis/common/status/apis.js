import axios from "axios";

const api =
  process.env.REACT_APP_MODE === "PRODUCTION"
    ? require("../../api-dev.json")
    : require("../../api.json");

const getStatuses = () => {
  return axios.get(api["status"]);
};

export { getStatuses };
