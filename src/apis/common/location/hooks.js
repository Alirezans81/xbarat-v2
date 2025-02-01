import {
  getNationalities,
  getCounties,
  getCities,
  getNationality,
  getRequiredFeild,
  getCountry,
  getCity,
} from "./apis";
import FilterIsActive from "../../../functions/filterIsActivefunction";
import { useState } from "react";
import { useTokenState } from "../../../Providers/TokenProvider";
import { useCheckTokenExpired } from "../../../hooks/useAuth";

const useGetNationalities = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const token = useTokenState();
  const checkTokenExpired = useCheckTokenExpired();

  const fetch = (setState, customFunction) => {
    checkTokenExpired(async () => {
      setIsLoading(true);
      await getNationalities(token.access)
        .then((data) => {
          process.env.REACT_APP_MODE === "DEVELOPMENT" && console.log(data);
          setState(data.data.results);
          customFunction && customFunction();
          setIsLoading(false);
          return FilterIsActive(data.data.results);
        })
        .catch((error) => {
          console.log(error);
          setError(error);
          setIsLoading(false);
        });
    });
  };

  return { getNationalities: fetch, error, isLoading };
};

const useGetCountries = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const token = useTokenState();
  const checkTokenExpired = useCheckTokenExpired();

  const fetch = async (setState, customFunction) => {
    checkTokenExpired(async () => {
      setIsLoading(true);
      await getCounties(token.access)
        .then((data) => {
          process.env.REACT_APP_MODE === "DEVELOPMENT" && console.log(data);
          setState(data.data.results);
          customFunction && customFunction();
          setIsLoading(false);
          return FilterIsActive(data.data.results);
        })
        .catch((error) => {
          console.log(error);
          setError(error);
          setIsLoading(false);
        });
    });
  };

  return { getCountries: fetch, error, isLoading };
};

const useGetCities = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const token = useTokenState();
  const checkTokenExpired = useCheckTokenExpired();

  const fetch = (filtersObject, setState, customFunction) => {
    checkTokenExpired(async () => {
      setIsLoading(true);
      await getCities(filtersObject, token.access)
        .then((data) => {
          process.env.REACT_APP_MODE === "DEVELOPMENT" && console.log(data);
          setState(data.data.results);
          customFunction && customFunction();
          setIsLoading(false);
          return FilterIsActive(data.data.results);
        })
        .catch((error) => {
          console.log(error);
          setError(error);
          setIsLoading(false);
        });
    });
  };

  return { getCities: fetch, error, isLoading };
};

const useGetNationality = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const token = useTokenState();
  const checkTokenExpired = useCheckTokenExpired();

  const fetch = (nationalityUrl, setState, customFunction) => {
    checkTokenExpired(async () => {
      setIsLoading(true);
      await getNationality(nationalityUrl, token.access)
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

  return { getNationality: fetch, error, isLoading };
};

const useGetCountry = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const token = useTokenState();
  const checkTokenExpired = useCheckTokenExpired();

  const fetch = (countryUrl, setState, customFunction) => {
    checkTokenExpired(async () => {
      setIsLoading(true);
      await getCountry(countryUrl, token.access)
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

  return { getCountry: fetch, error, isLoading };
};

const useGetCity = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const token = useTokenState();
  const checkTokenExpired = useCheckTokenExpired();

  const fetch = (cityUrl, setState, customFunction) => {
    checkTokenExpired(async () => {
      setIsLoading(true);
      await getCity(cityUrl, token.access)
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

  return { getCity: fetch, error, isLoading };
};

const useGetRequiredFeild = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const token = useTokenState();
  const checkTokenExpired = useCheckTokenExpired();

  const fetch = (requiredFeildUrl, currentState, setState, customFunction) => {
    checkTokenExpired(async () => {
      setIsLoading(true);
      currentState &&
        (await getRequiredFeild(requiredFeildUrl, token.access)
          .then((data) => {
            process.env.REACT_APP_MODE === "DEVELOPMENT" && console.log(data);
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
    });
  };

  return { getRequiredFeild: fetch, error, isLoading };
};

export {
  useGetNationalities,
  useGetCountries,
  useGetCities,
  useGetNationality,
  useGetCountry,
  useGetCity,
  useGetRequiredFeild,
};
