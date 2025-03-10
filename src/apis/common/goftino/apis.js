import axios from "axios";
import queryString from "query-string";

import prod from "../../api";
import dev from "../../api-dev";

const api = process.env.REACT_APP_MODE === "DEVELOPMENT" ? dev() : prod();

export const goftinoSetUser = (user_data) => {
  let data = {};

  data.user_id = user_data.email;
  data.email = user_data.email;
  data.name = user_data.first_name + " " + user_data.last_name;
  data.phone = user_data.phone;

  const headers = {
    "Content-Type": "application/json",
    "goftino-key": process.env.REACT_APP_GOFTINO_API_KEY,
  };
  return axios.post(api["goftino-set-user"], data, { headers });
};
