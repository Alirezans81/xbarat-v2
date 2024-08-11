import { useCurrenciesState } from "../Providers/CurrenciesProvider";

const useGetCurrencyByUrl = () => {
  const currnecies = useCurrenciesState();

  const getCurrencyByUrl = (currencyUrl) => {
    if (currencyUrl && currnecies && currnecies.length > 0) {
      return currnecies.find((e) => e.url === currencyUrl);
    } else return null;
  };

  return getCurrencyByUrl;
};

export { useGetCurrencyByUrl };
