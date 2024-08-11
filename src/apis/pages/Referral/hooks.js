import { useUserState } from "../../../Providers/UserProvider";
import { getReferraledUser } from "./apis";
import { useState } from "react";

const useGetReferraledUser = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const userInfo = useUserState();

  const fetch = async (setState, customFunction, customFunctionWithData) => {
    if (userInfo && userInfo.code) {
      setIsLoading(true);
      await getReferraledUser(userInfo.code)
        .then((data) => {
          process.env.REACT_APP_MODE === "DEVELOPMENT" && console.log(data);
          setState(data.data.results);
          customFunction && customFunction();
          customFunctionWithData && customFunctionWithData(data.data.results);
          setIsLoading(false);
          return data.data;
        })
        .catch((error) => {
          console.log(error);
          setError(error);
          setIsLoading(false);
        });
    }
  };

  return { getReferraledUser: fetch, error, isLoading };
};

export { useGetReferraledUser };
