import React, { useEffect, useState } from "react";
import SelectType from "./TransactionModal/SelectType";
import Deposit from "./TransactionModal/Deposit";
import Withdrawal from "./TransactionModal/Withdrawal";
import Transfer from "./TransactionModal/Transfer";
import { useGetCurrencies } from "../../apis/common/currency/hooks";
import { useIsLoadingSplashScreenSetState } from "../../Providers/IsLoadingSplashScreenProvider";
import { useModalDataClose } from "../../Providers/ModalDataProvider";

export default function TransactionModal({
  data,
  defaultType,
  refreshPendingRequests,
}) {
  const setIsLoadingSplashScreen = useIsLoadingSplashScreenSetState();
  const closeModal = useModalDataClose();

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
      {type === "deposit" && (
        <Deposit
          refreshPendingRequests={refreshPendingRequests}
          currencies={currencies}
          data={data}
          closeModal={closeModal}
        />
      )}
      {type === "withdrawal" && (
        <Withdrawal
          refreshPendingRequests={refreshPendingRequests}
          currencies={currencies}
          data={data}
          closeModal={closeModal}
        />
      )}
      {type === "transfer" && (
        <Transfer
          refreshPendingRequests={refreshPendingRequests}
          currencies={currencies}
          data={data}
          closeModal={closeModal}
        />
      )}
    </div>
  );
}
