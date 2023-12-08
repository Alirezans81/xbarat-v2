import { forgotPassword } from "./apis";
import { useState } from "react";

const useForgotPassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const fetch = async (params, customFunction) => {
    setIsLoading(true);
    await forgotPassword(params)
      .then((data) => {
        console.log(data);
        customFunction && customFunction();
        setIsLoading(false);
        return data.data;
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
