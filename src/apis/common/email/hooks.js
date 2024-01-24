import { checkEmail, sendEmail } from "./apis";
import { useState } from "react";

const useCheckEmail = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("init");

  const fetch = async (
    email,
    customFunction,
    customFunctionWithData,
    customFunctionOnError
  ) => {
    setIsLoading(true);
    await checkEmail(email)
      .then((data) => {
        console.log(data);
        customFunction && customFunction();
        customFunctionWithData && customFunctionWithData(data.data.results);
        setIsLoading(false);
        return data.data.results;
      })
      .catch((error) => {
        console.log(error);
        setError(error);
        customFunctionOnError && customFunctionOnError();
        setIsLoading(false);
      });
  };

  return { checkEmail: fetch, error, isLoading };
};

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

export { useCheckEmail, useSendEmail };
