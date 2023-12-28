import React, { useEffect, useState } from "react";
import SelectType from "./TransactionModal/SelectType";
import Deposit from "./TransactionModal/Deposit";
import Withdrawal from "./TransactionModal/Withdrawal";
import Transfer from "./TransactionModal/Transfer";
import { useModalDataClose } from "../../Providers/ModalDataProvider";
import { useCurrenciesState } from "../../Providers/CurrenciesProvider";
import { useGetWalletData } from "../../Providers/WalletProvider";
import { useRefreshWallet } from "../../hooks/useRefreshWallet";

export default function TransactionModal({
  data,
  defaultType,
  refreshPendingRequests,
}) {
  const currencies = useCurrenciesState();
  const closeModal = useModalDataClose();
  const refreshWallet = useRefreshWallet();

  const [type, selectType] = useState(defaultType || "deposit");

  return (
    <div className="pb-3">
      <SelectType type={type} selectType={selectType} />
      {type === "deposit" && (
        <Deposit
          refreshPendingRequests={refreshPendingRequests}
          currencies={currencies}
          data={data}
          closeModal={closeModal}
          getWalletData={refreshWallet}
        />
      )}
      {type === "withdrawal" && (
        <Withdrawal
          refreshPendingRequests={refreshPendingRequests}
          currencies={currencies}
          data={data}
          closeModal={closeModal}
          getWalletData={refreshWallet}
        />
      )}
      {type === "transfer" && (
        <Transfer
          refreshPendingRequests={refreshPendingRequests}
          currencies={currencies}
          data={data}
          closeModal={closeModal}
          getWalletData={refreshWallet}
        />
      )}
    </div>
  );
}
