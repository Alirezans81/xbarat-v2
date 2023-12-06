import axios from "axios";

const api = require("../../api.json");

const sendEmail = (params) => {
  const data = {
    service_id: "service_7hdualx",
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

export { sendEmail };
