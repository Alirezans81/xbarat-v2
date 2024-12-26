import axios from "axios";

import prod from "../../api";
import dev from "../../api-dev";

const api = process.env.REACT_APP_MODE === "DEVELOPMENT" ? dev() : prod();

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

  formData.append("document", params.document, "document.png");
  formData.append("wallet_tank_detail_receiver", params.wallet_tank_receiver);
  formData.append("status", params.status);

  return axios.patch(requestUrl, formData);
};

export { getPendingRequests, cancelPendingRequest, uploadRequestDocument };
