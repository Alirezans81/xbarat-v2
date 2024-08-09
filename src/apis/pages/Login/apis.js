import axios from "axios";

import prod from "../../api";
import dev from "../../api-dev";

const api = process.env.REACT_APP_MODE === "DEVELOPMENT" ? dev() : prod();
<<<<<<< HEAD
=======

>>>>>>> 18ab923 (fix send and verfy email - fix dropdown horizental scroll - change in language switcher - fix news modal height - add privacy policiy to locale)
const login = (params) => {
  const formData = new FormData();

  formData.append("email", params.email);
  formData.append("password", params.password);

  return axios.post(api["log-in"], formData);
};

export { login };
