import axios from "axios";

import prod from "../../api";
import dev from "../../api-dev";

const api = process.env.REACT_APP_MODE === "DEVELOPMENT" ? dev() : prod();

const fetchStep1 = (username, params) => {
  const formData = new FormData();

  formData.append("first_name", params.first_name);
  formData.append("last_name", params.last_name);
  formData.append("phone", params.phone);
  formData.append("address", params.address);

  return axios.patch(api["patch-profile"] + username + "/", formData);
};

const fetchStep2 = (username, params) => {
  const formData = new FormData();

  formData.append("nationality", params.nationality);
  formData.append("country", params.country);
  formData.append("city", params.city);
  formData.append("city_str", params.city_str);

  return axios.patch(api["patch-profile"] + username + "/", formData);
};

const fetchStep3 = (username, params) => {
  const formData = new FormData();

  formData.append("identity_type", params.identity_type);
  formData.append("identity_code", params.identity_code);
  formData.append("document", params.document, "document.png");

  return axios.patch(api["patch-profile"] + username + "/", formData);
};

const fetchStep4 = (username, params) => {
  const formData = new FormData();

  formData.append("main_currency", params.main_currency);

  return axios.patch(api["patch-profile"] + username + "/", formData);
};

const fetchStep5 = (username) => {
  const formData = new FormData();

  formData.append("has_completed_profile", true);

  return axios.patch(api["patch-profile"] + username + "/", formData);
};

export { fetchStep1, fetchStep2, fetchStep3, fetchStep4, fetchStep5 };
