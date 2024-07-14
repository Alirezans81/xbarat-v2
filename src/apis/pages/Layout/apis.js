import axios from "axios";

import prod from "../../api";
import dev from "../../api-dev";

const api = dev();

const logout = (token) => {
  const formData = new FormData();

  formData.append("token", token);

  return axios.post(api["log-out"], formData);
};
const getNews = () => {
  axios.get(api["news"]);
};
const getNotifs = () => {
  return axios.get(api["notify"]);
};
const deleteNotification = (requestUrl) => {
  axios.delete(requestUrl);
};
export { logout, getNews, getNotifs, deleteNotification };
