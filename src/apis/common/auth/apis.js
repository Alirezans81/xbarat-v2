import axios from "axios";

import prod from "../../api";
import dev from "../../api-dev";

const api = process.env.REACT_APP_MODE === "DEVELOPMENT" ? dev() : prod();

const refreshAccessToken = (refresh) => {
  const formData = new FormData();

  formData.append("refresh", refresh);

  return axios.post(api["refresh"], formData);
};

export { refreshAccessToken };
