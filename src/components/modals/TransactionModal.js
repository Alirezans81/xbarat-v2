import React, { useEffect, useState } from "react";
import SelectType from "./TransactionModal/SelectType";
import Deposit from "./TransactionModal/Deposit";
import Withdrawal from "./TransactionModal/Withdrawal";
import Transfer from "./TransactionModal/Transfer";
import {
  useModalDataClose,
  useModalDataState,
} from "../../Providers/ModalDataProvider";
import { useCurrenciesState } from "../../Providers/CurrenciesProvider";
import { useGetWalletData } from "../../Providers/WalletProvider";
import { useRefreshWallet } from "../../hooks/useRefreshWallet";

export default function TransactionModal() {
  const currencies = useCurrenciesState();
  const closeModal = useModalDataClose();
  const refreshWallet = useRefreshWallet();
  const modalData = useModalDataState();

  const data =
    modalData && modalData.props && modalData.props.data
      ? modalData.props.data
      : null;
  const defaultType =
    modalData && modalData.props && modalData.props.defaultType
      ? modalData.props.defaultType
      : null;
  const refreshPendingRequests =
    modalData && modalData.props && modalData.props.refreshPendingRequests
      ? modalData.props.refreshPendingRequests
      : null;

  modalData &&
    modalData.props &&
    modalData.props.data &&
    console.log(modalData.props.data);
  modalData &&
    modalData.props &&
    modalData.props.defaultType &&
    console.log(modalData.props.defaultType);
  modalData &&
    modalData.props &&
    modalData.props.refreshPendingRequests &&
    console.log(modalData.props.refreshPendingRequests);

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
