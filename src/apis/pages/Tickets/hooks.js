import { useUserState } from "../../../Providers/UserProvider";
import { getTopics, getChats, getMessages, sendMessages } from "./apis";
import { useState } from "react";

const useGetTopics = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const fetch = async (setState, customFunction) => {
    setIsLoading(true);
    await getTopics()
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
  };

  return { getTopics: fetch, error, isLoading };
};

const useGetChats = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const user = useUserState();

  const fetch = async (topicSlug, setState, customFunction) => {
    if (user.username) {
      setIsLoading(true);
      await getChats(topicSlug, user.username)
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
  };

  return { getChats: fetch, error, isLoading };
};

const useGetMessages = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const user = useUserState();

  const fetch = async (ticketCode, setState, customFunction) => {
    if (user) {
      setIsLoading(true);
      await getMessages(ticketCode)
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
  };

  return { getMessages: fetch, error, isLoading };
};

const useSendMessage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const fetch = async (params, customFunction) => {
    setIsLoading(true);
    await sendMessages(params)
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
  };

  return { sendMessages: fetch, error, isLoading };
};

export { useGetTopics, useGetChats, useGetMessages, useSendMessage };
