import { useUserSetState, useUserState } from "../../../Providers/UserProvider";
import { updateNameAndAvatar } from "./apis";
import { useState } from "react";

const useUpdateNameAndAvatar = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const userInfo = useUserState();
  const setUser = useUserSetState();
  const saveUser = (value) =>
    window.localStorage.setItem("userInfo", JSON.stringify(value));

  const fetch = async (params, customFunction) => {
    setIsLoading(true);
    userInfo && userInfo.username
      ? await updateNameAndAvatar(userInfo.username, params)
          .then((data) => {
            console.log(data);
            setUser(data.data);
            saveUser(data.data);
            customFunction();
            setIsLoading(false);
            return data.data;
          })
          .catch((error) => {
            console.log(error);
            setError(error);
            setIsLoading(false);
          })
      : setError("Somthing Wrong!");
  };

  return { updateNameAndAvatar: fetch, error, isLoading };
};

export { useUpdateNameAndAvatar };
