import { getNationalities, getCounties, getCities } from "./apis";
import { useState } from "react";

const useGetNationalities = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const fetch = async (setState, customFunction) => {
    setIsLoading(true);
    await getNationalities()
      .then((data) => {
        console.log(data);
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
  };

  return { getNationalities: fetch, error, isLoading };
};

const useGetCountries = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const fetch = async (setState, customFunction) => {
    setIsLoading(true);
    await getCounties()
      .then((data) => {
        console.log(data);
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
  };

  return { getCountries: fetch, error, isLoading };
};

const useGetCities = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const fetch = async (filtersObject, setState, customFunction) => {
    setIsLoading(true);
    await getCities(filtersObject)
      .then((data) => {
        console.log(data);
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
  };

  return { getCities: fetch, error, isLoading };
};

export { useGetNationalities, useGetCountries, useGetCities };
