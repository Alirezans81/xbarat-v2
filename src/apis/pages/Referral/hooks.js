import { useState } from "react";
import { getReferraledUser } from "./apis";
import { useUserState } from "../../../Providers/UserProvider";
import { useTokenState } from "../../../Providers/TokenProvider";
import { useCheckTokenExpired } from "../../../hooks/useAuth";

const useGetReferraledUser = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const token = useTokenState();
  const checkTokenExpired = useCheckTokenExpired();

  const userInfo = useUserState();

  const fetch = (setState, customFunction, customFunctionWithData) => {
    checkTokenExpired(async () => {
      if (userInfo && userInfo.code) {
        setIsLoading(true);
        await getReferraledUser(userInfo.code, token.access)
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
    });
  };

  return { getReferraledUser: fetch, error, isLoading };
};

export { useGetReferraledUser };
