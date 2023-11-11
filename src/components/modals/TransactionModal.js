import React, { useEffect, useState } from "react";
import SelectType from "./TransactionModal/SelectType";
import Deposit from "./TransactionModal/Deposit";
import Withdrawal from "./TransactionModal/Withdrawal";
import Transfer from "./TransactionModal/Transfer";
import { useGetCurrencies } from "../../apis/common/currency/hooks";
import { useIsLoadingSplashScreenSetState } from "../../Providers/IsLoadingSplashScreenProvider";

export default function TransactionModal({ data, defaultType }) {
  const setIsLoadingSplashScreen = useIsLoadingSplashScreenSetState();

  const [type, selectType] = useState(defaultType || "deposit");
  const [currencies, setCurrencies] = useState([]);

  const { getCurrencies, isLoading: getCurrenciesIsLoading } =
    useGetCurrencies();
  useEffect(
    () => setIsLoadingSplashScreen(getCurrenciesIsLoading),
    [getCurrenciesIsLoading]
  );
  useEffect(() => {
    getCurrencies(setCurrencies);
  }, []);

  return (
    <div className="pb-3">
      <SelectType type={type} selectType={selectType} />
      {type === "deposit" && <Deposit currencies={currencies} data={data} />}
      {type === "withdrawal" && (
        <Withdrawal currencies={currencies} data={data} />
      )}
      {type === "transfer" && <Transfer currencies={currencies} data={data} />}
    </div>
  );
}
