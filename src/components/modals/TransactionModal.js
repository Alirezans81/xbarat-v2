import React, { useState } from "react";
import SelectType from "./TransactionModal/SelectType";
import Deposit from "./TransactionModal/Deposit";
import Withdrawal from "./TransactionModal/Withdrawal";
import Transfer from "./TransactionModal/Transfer";
import {
  useModalDataClose,
  useModalDataState,
} from "../../Providers/ModalDataProvider";
import { useCurrenciesState } from "../../Providers/CurrenciesProvider";
import { useRefreshWallet } from "../../hooks/useRefreshWallet";

export default function TransactionModal() {
  const currencies = useCurrenciesState();
  const closeModal = useModalDataClose();
  const refreshWallet = useRefreshWallet();
  const modalData = useModalDataState();

  const walletAsset =
    modalData && modalData.props && modalData.props.walletAsset
      ? modalData.props.walletAsset
      : null;
  const defaultType =
    modalData && modalData.props && modalData.props.defaultType
      ? modalData.props.defaultType
      : null;
  const refreshPendingRequests =
    modalData && modalData.props && modalData.props.refreshPendingRequests
      ? modalData.props.refreshPendingRequests
      : null;
  const amount =
    modalData && modalData.props && modalData.props.amount
      ? modalData.props.amount
      : null;

  const [type, selectType] = useState(defaultType || "deposit");

  return (
    <div className="pb-3">
      <SelectType type={type} selectType={selectType} />
      {type === "deposit" && (
        <Deposit
          refreshPendingRequests={refreshPendingRequests}
          currencies={currencies}
          data={walletAsset}
          closeModal={closeModal}
          getWalletData={refreshWallet}
          amount={amount}
        />
      )}
      {type === "withdrawal" && (
        <Withdrawal
          refreshPendingRequests={refreshPendingRequests}
          currencies={currencies}
          data={walletAsset}
          closeModal={closeModal}
          getWalletData={refreshWallet}
          amount={amount}
        />
      )}
      {type === "transfer" && (
        <Transfer
          refreshPendingRequests={refreshPendingRequests}
          currencies={currencies}
          data={walletAsset}
          closeModal={closeModal}
          getWalletData={refreshWallet}
          amount={amount}
        />
      )}
    </div>
  );
}
