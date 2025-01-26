import { useCheckTokenExpired } from "../../../hooks/useAuth";
import { useTokenState } from "../../../Providers/TokenProvider";
import { useUserState } from "../../../Providers/UserProvider";
import {
  getTopics,
  getChats,
  getMessages,
  sendMessages,
  createChat,
} from "./apis";
import { useState } from "react";

const useGetTopics = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const token = useTokenState();
  const checkTokenExpired = useCheckTokenExpired();

  const fetch = (setState, customFunction) => {
    checkTokenExpired(async () => {
      setIsLoading(true);
      await getTopics(token.access)
        .then((data) => {
          process.env.REACT_APP_MODE === "DEVELOPMENT" && console.log(data);
          setState(data.data.results);
          customFunction && customFunction();
          setIsLoading(false);
          return data.data.results;
        })
        .catch((error) => {
          console.log(error);
          setError(error);
          setIsLoading(false);
        });
    });
  };

  return { getTopics: fetch, error, isLoading };
};

const useGetChats = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const user = useUserState();

  const token = useTokenState();
  const checkTokenExpired = useCheckTokenExpired();

  const fetch = (topicSlug, setState, customFunction) => {
    checkTokenExpired(async () => {
      if (user.username) {
        setIsLoading(true);
        await getChats(topicSlug, user.username, token.access)
          .then((data) => {
            process.env.REACT_APP_MODE === "DEVELOPMENT" && console.log(data);
            setState(data.data.results);
            customFunction && customFunction();
            setIsLoading(false);
            return data.data.results;
          })
          .catch((error) => {
            console.log(error);
            setError(error);
            setIsLoading(false);
          });
      }
    });
  };

  return { getChats: fetch, error, isLoading };
};

const useGetMessages = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const user = useUserState();

  const token = useTokenState();
  const checkTokenExpired = useCheckTokenExpired();

  const fetch = (ticketCode, setState, customFunction) => {
    checkTokenExpired(async () => {
      if (user) {
        setIsLoading(true);
        await getMessages(ticketCode, token.access)
          .then((data) => {
            process.env.REACT_APP_MODE === "DEVELOPMENT" && console.log(data);
            setState(data.data.results);
            customFunction && customFunction();
            setIsLoading(false);
            return data.data.results;
          })
          .catch((error) => {
            console.log(error);
            setError(error);
            setIsLoading(false);
          });
      }
    });
  };

  return { getMessages: fetch, error, isLoading };
};

const useSendMessage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const token = useTokenState();
  const checkTokenExpired = useCheckTokenExpired();

  const fetch = (params, customFunction) => {
    checkTokenExpired(async () => {
      setIsLoading(true);
      await sendMessages(params, token.access)
        .then((data) => {
          process.env.REACT_APP_MODE === "DEVELOPMENT" && console.log(data);
          customFunction && customFunction();
          setIsLoading(false);
          return data.data;
        })
        .catch((error) => {
          console.log(error);
          setError(error);
          setIsLoading(false);
        });
    });
  };

  return { sendMessages: fetch, error, isLoading };
};

const useCreateChat = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const token = useTokenState();
  const checkTokenExpired = useCheckTokenExpired();

  const fetch = (params, customFunctionWithData) => {
    checkTokenExpired(async () => {
      setIsLoading(true);
      await createChat(params, token.access)
        .then((data) => {
          process.env.REACT_APP_MODE === "DEVELOPMENT" && console.log(data);
          customFunctionWithData && customFunctionWithData(data.data);
          setIsLoading(false);
          return data.data;
        })
        .catch((error) => {
          console.log(error);
          setError(error);
          setIsLoading(false);
        });
    });
  };

  return { createChat: fetch, error, isLoading };
};

export {
  useGetTopics,
  useGetChats,
  useGetMessages,
  useSendMessage,
  useCreateChat,
};
