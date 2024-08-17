import axios from "axios";
import queryString from "query-string";

import prod from "../../api";
import dev from "../../api-dev";

const api = process.env.REACT_APP_MODE === "DEVELOPMENT" ? dev() : prod();
const limit = require("../../pagination/limit.json");

const getTopics = () => {
  const urlWithQueries = queryString.stringifyUrl({
    url: api["ticket-category"],
    query: { limit: limit["ticket-category"] },
  });

  return axios.get(urlWithQueries);
};

const getChats = (topicSlug, username) => {
  const urlWithQueries = queryString.stringifyUrl({
    url: api["ticket"],
    query: { limit: limit["ticket"], user: username, category: topicSlug },
  });

  return axios.get(urlWithQueries);
};

const getMessages = (ticketCode) => {
  const urlWithQueries = queryString.stringifyUrl({
    url: api["ticket-detail"],
    query: {
      limit: limit["ticket-detail"],
      ticket: ticketCode,
      ordering: "datetime",
    },
  });

  return axios.get(urlWithQueries);
};

const sendMessages = (params) => {
  const formData = new FormData();

  formData.append("ticket", params.ticket);
  formData.append("user", params.user);
  formData.append("text", params.text);

  return axios.post(api["ticket-detail"], formData);
};

export { getTopics, getChats, getMessages, sendMessages };
