import axios from "axios";

import prod from "../../api";
import dev from "../../api-dev";

const api = process.env.REACT_APP_MODE === "DEVELOPMENT" ? prod() : dev();

const checkEmail = (email) => {
  const formData = new FormData();

  formData.append("email", email);

  return axios.post(api["check-email"], formData);
};

const sendEmail = (params) => {
  const data = {
    service_id: "service_8sxros2",
    template_id: "template_ayphmem",
    user_id: "Pn5coBxG6mXj-eatL",
    template_params: {
      from_name: params.from_name,
      to_email: params.to_email,
      subject: params.subject,
      message: params.message,
    },
  };

  return axios.post(api["send-email"], data);
};

export { checkEmail, sendEmail };
