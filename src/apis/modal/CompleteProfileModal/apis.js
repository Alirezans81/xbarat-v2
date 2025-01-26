import axios from "axios";

import prod from "../../api";
import dev from "../../api-dev";

const api = process.env.REACT_APP_MODE === "DEVELOPMENT" ? dev() : prod();

const fetchStep1 = (username, token, params) => {
  const formData = new FormData();

  formData.append("first_name", params.first_name);
  formData.append("last_name", params.last_name);
  formData.append("phone", params.phone);
  formData.append("address", params.address);

  const headers = {
    Authorization: `Bearer ${token}`,
  };
  return axios.patch(api["patch-profile"] + username + "/", formData, {
    headers,
  });
};

const fetchStep2 = (username, token, params) => {
  const formData = new FormData();

  formData.append("nationality", params.nationality);
  formData.append("country", params.country);
  formData.append("city", params.city);
  formData.append("city_str", params.city_str);

  const headers = {
    Authorization: `Bearer ${token}`,
  };
  return axios.patch(api["patch-profile"] + username + "/", formData, {
    headers,
  });
};

const fetchStep3 = (username, token, params) => {
  const formData = new FormData();

  formData.append("identity_type", params.identity_type);
  formData.append("identity_code", params.identity_code);
  formData.append("document", params.document, "document.png");

  const headers = {
    Authorization: `Bearer ${token}`,
  };
  return axios.patch(api["patch-profile"] + username + "/", formData, {
    headers,
  });
};

const fetchStep4 = (username, token, params) => {
  const formData = new FormData();

  formData.append("main_currency", params.main_currency);

  const headers = {
    Authorization: `Bearer ${token}`,
  };
  return axios.patch(api["patch-profile"] + username + "/", formData, {
    headers,
  });
};

const fetchStep5 = (username, token) => {
  const formData = new FormData();

  formData.append("has_completed_profile", true);

  const headers = {
    Authorization: `Bearer ${token}`,
  };
  return axios.patch(api["patch-profile"] + username + "/", formData, {
    headers,
  });
};

export { fetchStep1, fetchStep2, fetchStep3, fetchStep4, fetchStep5 };
