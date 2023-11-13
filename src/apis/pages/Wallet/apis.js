import axios from "axios";

const api = require("../../api.json");

const getPendingRequests = (token) => {
  const formData = new FormData();

  formData.append("token", token);

  return axios.post(api["pending-requests"], formData);
};

const cancelPendingRequest = (requestUrl) => {
  return axios.delete(requestUrl);
};

const uploadRequestDocument = (requestUrl, params) => {
  const formData = new FormData();

  formData.append("document", params.document);
  formData.append("status", params.status);

  return axios.patch(requestUrl, formData);
};

export { getPendingRequests, cancelPendingRequest, uploadRequestDocument };
