import {
  getPendingRequests,
  cancelPendingRequest,
  uploadRequestDocument,
} from "./apis";
import { useState } from "react";

const useGetPendingRequests = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const fetch = async (token, setState, customFunction) => {
    setIsLoading(true);
    await getPendingRequests(token)
      .then((data) => {
        console.log(data);
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

  return { getPendingRequests: fetch, error, isLoading };
};

const useCancelPendingRequest = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const fetch = async (requestUrl, customFunction) => {
    setIsLoading(true);
    await cancelPendingRequest(requestUrl)
      .then((data) => {
        console.log(data);
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

  return { cancelPendingRequest: fetch, error, isLoading };
};

const useUploadRequestDocument = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const fetch = async (requestUrl, params, customFunction) => {
    setIsLoading(true);
    await uploadRequestDocument(requestUrl, params)
      .then((data) => {
        console.log(data);
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

  return { uploadRequestDocument: fetch, error, isLoading };
};

export {
  useGetPendingRequests,
  useCancelPendingRequest,
  useUploadRequestDocument,
};
