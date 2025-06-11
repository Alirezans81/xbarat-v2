import { useCheckTokenExpired } from "../../../hooks/useAuth";
import { useTokenState } from "../../../Providers/TokenProvider";
import {
  getPendingRequests,
  cancelPendingRequest,
  uploadRequestDocument,
  depositBackToAdminAssign,
} from "./apis";
import { useState } from "react";

const useGetPendingRequests = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const token = useTokenState();
  const checkTokenExpired = useCheckTokenExpired();

  const fetch = (_token, setState, customFunction) => {
    checkTokenExpired(async () => {
      setIsLoading(true);
      await getPendingRequests(token.access)
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

  return { getPendingRequests: fetch, error, isLoading };
};
const useDepositBackToAdminAssign = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const token = useTokenState();
  const checkTokenExpired = useCheckTokenExpired();

  const fetch = (requestUrl, setState, customFunction) => {
    checkTokenExpired(async () => {
      setIsLoading(true);
      await depositBackToAdminAssign(requestUrl, token.access)
        .then((data) => {
          process.env.REACT_APP_MODE === "DEVELOPMENT" && console.log(data);
          setState(data.data);
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
  return { depositBackToAdminAssign: fetch, error, isLoading };
};
const useCancelPendingRequest = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const token = useTokenState();
  const checkTokenExpired = useCheckTokenExpired();

  const fetch = (requestUrl, customFunction) => {
    checkTokenExpired(async () => {
      setIsLoading(true);
      await cancelPendingRequest(requestUrl, token.access)
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

  return { cancelPendingRequest: fetch, error, isLoading };
};

const useUploadRequestDocument = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const token = useTokenState();
  const checkTokenExpired = useCheckTokenExpired();

  const fetch = (requestUrl, params, customFunction) => {
    checkTokenExpired(async () => {
      setIsLoading(true);
      await uploadRequestDocument(requestUrl, params, token.access)
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

  return { uploadRequestDocument: fetch, error, isLoading };
};

export {
  useGetPendingRequests,
  useCancelPendingRequest,
  useUploadRequestDocument,
  useDepositBackToAdminAssign,
};
