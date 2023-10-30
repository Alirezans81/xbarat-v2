import { getNationalities, getCounties, getCities } from "./apis";
import { useState } from "react";

const useGetNationalities = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const fetch = async (setState) => {
    setIsLoading(true);
    await getNationalities()
      .then((data) => {
        console.log(data);
        setState(data.data);
        setIsLoading(false);
        return data.data;
      })
      .catch((error) => {
        console.log(error);
        setError(error);
        setIsLoading(false);
      });
  };

  return { getNationalities: fetch, error, isLoading };
};

const useGetCounties = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const fetch = async (setState) => {
    setIsLoading(true);
    await getCounties()
      .then((data) => {
        console.log(data);
        setState(data.data);
        setIsLoading(false);
        return data.data;
      })
      .catch((error) => {
        console.log(error);
        setError(error);
        setIsLoading(false);
      });
  };

  return { getCounties: fetch, error, isLoading };
};

const useGetCities = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const fetch = async (setState) => {
    setIsLoading(true);
    await getCities()
      .then((data) => {
        console.log(data);
        setState(data.data);
        setIsLoading(false);
        return data.data;
      })
      .catch((error) => {
        console.log(error);
        setError(error);
        setIsLoading(false);
      });
  };

  return { getCounties: fetch, error, isLoading };
};

export { useGetNationalities, useGetCounties, useGetCities };
