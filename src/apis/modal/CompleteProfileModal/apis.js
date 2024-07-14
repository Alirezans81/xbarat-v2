import axios from "axios";

import prod from "../../api";
import dev from "../../api-dev";

const api = process.env.REACT_APP_MODE === "DEVELOPMENT" ? dev() : prod();

const fetchStep1 = (username, params) => {
  const formData = new FormData();

  formData.append("first_name", params.first_name);
  formData.append("last_name", params.last_name);
  formData.append("phone", params.phone);

  return axios.patch(api["patch-profile"] + username + "/", formData);
};

const fetchStep2 = (username, params) => {
  const formData = new FormData();

  formData.append("nationality", params.nationality);
  formData.append("country", params.country);
  formData.append("city", params.city);

  return axios.patch(api["patch-profile"] + username + "/", formData);
};

const fetchStep3 = (username, params) => {
  const formData = new FormData();

  formData.append("identity_type", params.identity_type);
  formData.append("identity_code", params.identity_code);
  formData.append("document", params.document, "document.png");

  return axios.patch(api["patch-profile"] + username + "/", formData);
};

export { fetchStep1, fetchStep2, fetchStep3 };
