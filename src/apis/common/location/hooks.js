import {
  getNationalities,
  getCounties,
  getCities,
  getNationality,
  getRequiredFeild,
} from "./apis";
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

const useGetNationality = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const fetch = async (nationalityUrl, setState, customFunction) => {
    setIsLoading(true);
    await getNationality(nationalityUrl)
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

  return { getNationality: fetch, error, isLoading };
};

const useGetRequiredFeild = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const fetch = async (
    requiredFeildUrl,
    currentState,
    setState,
    customFunction
  ) => {
    setIsLoading(true);
    currentState &&
      (await getRequiredFeild(requiredFeildUrl)
        .then((data) => {
          console.log(data);
          let temp = currentState;
          temp.push(data.data);
          setState(temp);
          customFunction && customFunction();
          setIsLoading(false);
          return data.data;
        })
        .catch((error) => {
          console.log(error);
          setError(error);
          setIsLoading(false);
        }));
  };

  return { getRequiredFeild: fetch, error, isLoading };
};

export {
  useGetNationalities,
  useGetCountries,
  useGetCities,
  useGetNationality,
  useGetRequiredFeild,
};
