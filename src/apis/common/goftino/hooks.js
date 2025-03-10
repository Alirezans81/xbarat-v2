import { useState } from "react";
import { goftinoSetUser } from "./apis";
import { useUserState } from "../../../Providers/UserProvider";

export const useGoftinoSetUser = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const user = useUserState();

  const fetch = async (customFunction) => {
    setIsLoading(true);
    await goftinoSetUser(user)
      .then((data) => {
        process.env.REACT_APP_MODE === "DEVELOPMENT" && console.log(data);
        customFunction && customFunction();
        setIsLoading(false);
      })
      .catch((error) => {
        console.log("error: ", error);
        console.log(error);
        setError(error);
        setIsLoading(false);
      });
  };

  return { goftinoSetUser: fetch, error, isLoading };
};
