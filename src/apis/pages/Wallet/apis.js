import axios from "axios";

import prod from "../../api";
import dev from "../../api-dev";

const api = process.env.REACT_APP_MODE === "DEVELOPMENT" ? dev() : prod();
const base_route =
  process.env.REACT_APP_MODE === "DEVELOPMENT"
    ? process.env.REACT_APP_DEV_API_DOMAIN
    : process.env.REACT_APP_API_DOMAIN;
const getPendingRequests = (token) => {
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  return axios.get(api["pending-requests"], { headers });
};

const cancelPendingRequest = (requestUrl, token) => {
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  return axios.delete(requestUrl, { headers });
};

const uploadRequestDocument = (requestUrl, params, token) => {
  const formData = new FormData();

  formData.append("document", params.document, "document.png");
  formData.append("wallet_tank_detail_receiver", params.wallet_tank_receiver);
  formData.append("status_str", params.status);

  const headers = {
    Authorization: `Bearer ${token}`,
  };
  return axios.patch(requestUrl, formData, { headers });
};

const depositBackToAdminAssign = (request_url, token) => {
  const formData = new FormData();
  formData.append("status", base_route + "api/status/admin-assign/");
  formData.append("status_title", "Admin Assign");

  const headers = {
    Authorization: `Bearer ${token}`,
  };
  return axios.patch(request_url, formData, { headers });
};

export {
  getPendingRequests,
  cancelPendingRequest,
  uploadRequestDocument,
  depositBackToAdminAssign,
};
