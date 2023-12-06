import { sendEmail } from "./apis";
import { useState } from "react";

const useSendEmail = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const fetch = async (params, customFunction, customFunctionWithData) => {
    setIsLoading(true);
    await sendEmail({ from_name: "Xbarat Team", ...params })
      .then((data) => {
        console.log(data);
        customFunction && customFunction();
        customFunctionWithData && customFunctionWithData(data.data);
        setIsLoading(false);
        return data.data;
      })
      .catch((error) => {
        console.log(error);
        setError(error);
        setIsLoading(false);
      });
  };

  return { sendEmail: fetch, error, isLoading };
};

export { useSendEmail };
