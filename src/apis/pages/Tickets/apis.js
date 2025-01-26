import axios from "axios";
import queryString from "query-string";

import prod from "../../api";
import dev from "../../api-dev";

const api = process.env.REACT_APP_MODE === "DEVELOPMENT" ? dev() : prod();
const limit = require("../../pagination/limit.json");

const getTopics = (token) => {
  const urlWithQueries = queryString.stringifyUrl({
    url: api["ticket-category"],
    query: { limit: limit["ticket-category"], is_active: true },
  });

  const headers = {
    Authorization: `Bearer ${token}`,
  };
  return axios.get(urlWithQueries, { headers });
};

const getChats = (topicSlug, username, token) => {
  const urlWithQueries = queryString.stringifyUrl({
    url: api["ticket"],
    query: {
      limit: limit["ticket"],
      user: username,
      category: topicSlug,
      is_active: true,
    },
  });

  const headers = {
    Authorization: `Bearer ${token}`,
  };
  return axios.get(urlWithQueries, { headers });
};

const getMessages = (ticketCode, token) => {
  const urlWithQueries = queryString.stringifyUrl({
    url: api["ticket-detail"],
    query: {
      limit: limit["ticket-detail"],
      ticket: ticketCode,
      ordering: "datetime",
      is_active: true,
    },
  });

  const headers = {
    Authorization: `Bearer ${token}`,
  };
  return axios.get(urlWithQueries, { headers });
};

const sendMessages = (params, token) => {
  const formData = new FormData();
  params &&
    params.ticket &&
    formData.append("ticket", api["ticket"] + params.ticket + "/");
  params && params.user && formData.append("user", params.user);
  params && params.text && formData.append("text", params.text);
  params && params.file && formData.append("file", params.file);

  const headers = {
    Authorization: `Bearer ${token}`,
  };
  return axios.post(api["ticket-detail"], formData, { headers });
};

const createChat = (params, token) => {
  const formData = new FormData();

  params && params.user && formData.append("user", params.user);
  params && params.category && formData.append("category", params.category);
  params && params.title && formData.append("title", params.title);
  formData.append("is_active", true + "");

  const headers = {
    Authorization: `Bearer ${token}`,
  };
  return axios.post(api["ticket"], formData, { headers });
};

export { getTopics, getChats, getMessages, sendMessages, createChat };
