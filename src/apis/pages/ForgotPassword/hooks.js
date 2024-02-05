import { forgotPassword } from "./apis";
import { useState } from "react";

const useForgotPassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const fetch = async (params, customFunction) => {
    setIsLoading(true);
    await forgotPassword(params)
      .then((data) => {
        process.env.REACT_APP_MODE === "PRODUCTION" && console.log(data);
        customFunction && customFunction();
        setIsLoading(false);
        return data.data.results;
      })
      .catch((error) => {
        console.log(error);
        setError(error);
        setIsLoading(false);
      });
  };

  return { forgotPassword: fetch, error, isLoading };
};

export { useForgotPassword };
