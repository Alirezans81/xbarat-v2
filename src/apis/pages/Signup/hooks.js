import { signup } from "./apis";
import { useState } from "react";

const useSignup = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const fetch = async (params, customFunction) => {
    setIsLoading(true);
    await signup(params)
      .then((data) => {
        console.log(data);
        customFunction();
        setIsLoading(false);
        return data.data;
      })
      .catch((error) => {
        console.log(error);
        setError(error);
        setIsLoading(false);
      });
  };

  return { signup: fetch, error, isLoading };
};

export { useSignup };
