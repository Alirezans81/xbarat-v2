import React from "react";
import { useCurrenciesState } from "../../../../Providers/CurrenciesProvider";
const Tutorial = () => {
  const currencies = useCurrenciesState();
  console.log(currencies);
  const selectedCurrecnyPair = {
    rate: 1.6,
    defaultRateType: 1,
    has_reverse_rate: true,
  };
  return <div className="w-fit h-fit bg-red ">Sina</div>;
};

export default Tutorial;
