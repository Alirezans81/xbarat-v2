import axios from "axios";

import prod from "../../api";
import dev from "../../api-dev";

const api = process.env.REACT_APP_MODE === "DEVELOPMENT" ? prod() : dev();

const signup = (params) => {
  const formData = new FormData();

  formData.append("email", params.email);
  formData.append("password", params.password);
  params.referral && formData.append("referral", params.referral);

  return axios.post(api["sign-up"], formData);
};

export { signup };
