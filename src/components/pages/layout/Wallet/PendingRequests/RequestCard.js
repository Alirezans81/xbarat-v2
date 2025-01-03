import React, { useEffect } from "react";
import { useThemeState } from "../../../../../Providers/ThemeProvider";
import { useLanguageState } from "../../../../../Providers/LanguageProvider";
import { useAddComma } from "../../../../../hooks/useNumberFunctions";
import { useConvertDateTime } from "../../../../../hooks/useConvertDateTime";
import RequestStatus from "../../common/RequestStatus";
import {
  useModalDataClose,
  useModalDataSetState,
} from "../../../../../Providers/ModalDataProvider";
import { useIsLoadingSplashScreenSetState } from "../../../../../Providers/IsLoadingSplashScreenProvider";
import PendingRequestModal from "../../../../modals/PendingRequestModal";
import EditRequestModal from "../../../../modals/EditRequestModal";
import AreYouSureModal from "../../../../modals/AreYouSureModal";
import { useCancelPendingRequest } from "../../../../../apis/pages/Wallet/hooks";
import { useFontState } from "../../../../../Providers/FontProvider";
import { useRefreshWallet } from "../../../../../hooks/useRefreshWallet";
import TransactionModal from "../../../../modals/TransactionModal";
import { useGetWalletAssetByCurrency } from "../../../../../hooks/useWalletFilter";

export default function RequestCard({ refreshPendingRequests, pendingOrder }) {
  const theme = useThemeState();
  const oppositeTheme = theme === "dark" ? "light" : "dark";
  const lang = useLanguageState();
  const font = useFontState();
  const addComma = useAddComma();
  const convertDate = useConvertDateTime();
  const setModalData = useModalDataSetState();
  const closeModal = useModalDataClose();
  const setLoading = useIsLoadingSplashScreenSetState();
  const refreshWallet = useRefreshWallet();

  const { cancelPendingRequest, isLoading: cancelPendingRequestIsLoading } =
    useCancelPendingRequest();
  useEffect(
    () => setLoading(cancelPendingRequestIsLoading),
    [cancelPendingRequestIsLoading]
  );

  const openWalletRequestModal = () => {
    setModalData({
      title: lang["pending-request"],
      children: (
        <PendingRequestModal
          refreshPendingRequests={refreshPendingRequests}
          data={pendingOrder}
        />
      ),
      canClose: true,
      isOpen: true,
    });
  };

  const checkHoverOn = () => {
    if (
      pendingOrder &&
      (pendingOrder.type === "deposit" || pendingOrder.type === "withdrawal")
    ) {
      if (pendingOrder.status_title !== "Admin Assign") {
        return true;
      }
      return false;
    } else if (pendingOrder && pendingOrder.type === "transfer") {
      return true;
    }
    return false;
  };

  const onCardClickHandler = () => {
    if (
      pendingOrder &&
      (pendingOrder.type === "deposit" || pendingOrder.type === "withdrawal")
    ) {
      if (pendingOrder.status_title !== "Admin Assign") {
        openWalletRequestModal();
      }
    } else if (pendingOrder && pendingOrder.type === "transfer") {
      openWalletRequestModal();
    }
  };

  const opneCancelAreYouSureModal = () => {
    setModalData({
      title: lang["are-you-sure-modal-title"] + "?",
      children: (
        <AreYouSureModal
          onClick={() => {
            pendingOrder &&
              pendingOrder.url &&
              cancelPendingRequest(pendingOrder.url, () => {
                refreshPendingRequests();
                refreshWallet();
                closeModal();
              });
          }}
          message={lang["cancel-request-modal-message"] + "?"}
        />
      ),
      canClose: true,
      isOpen: true,
    });
  };

  const getWalletAssetByCurrency = useGetWalletAssetByCurrency();
  const openTransactionModal = (
    currencyUrl,
    defaultType,
    refreshPendingRequests,
    amount
  ) => {
    setModalData({
      title: lang["transaction"],
      children: <TransactionModal />,
      props: {
        walletAsset: getWalletAssetByCurrency(currencyUrl),
        defaultType,
        refreshPendingRequests,
        amount,
      },
      canClose: true,
      isOpen: true,
    });
  };

  const openEditAreYouSureModal = () => {
    setModalData({
      title: lang["are-you-sure-modal-title"] + "?",
      children: (
        <AreYouSureModal
          onClick={() => {
            pendingOrder &&
              pendingOrder.url &&
              cancelPendingRequest(pendingOrder.url, () => {
                refreshPendingRequests();
                refreshWallet();
                openTransactionModal(
                  pendingOrder.currency,
                  pendingOrder.type,
                  refreshPendingRequests,
                  addComma(+pendingOrder.amount)
                );
              });
          }}
          message={lang["edit-request-modal-message"] + "?"}
        />
      ),
      canClose: true,
      isOpen: true,
    });
  };

  return (
    <button
      type="button"
      onClick={onCardClickHandler}
      className={`w-full text-left ${
        !checkHoverOn() ? "cursor-default" : ""
      } flex flex-col justify-center bg-${theme}-back rounded-3xl h-full pt-4 pb-4 px-4`}
    >
      <div className="w-full flex flex-row justify-between items-center">
        {pendingOrder && pendingOrder.type === "deposit" && (
          <span className={`font-${font}-bold text-green`}>
            {lang["deposit"]}
          </span>
        )}
        {pendingOrder && pendingOrder.type === "withdrawal" && (
          <span className={`font-${font}-bold text-red`}>
            {lang["withdrawal"]}
          </span>
        )}
        {pendingOrder && pendingOrder.type === "transfer" && (
          <span className={`font-${font}-bold text-blue`}>
            {lang["transfer"]}
          </span>
        )}
        <button onClick={openWalletRequestModal}>
          <img
            className="w-6 h-6 mb-2"
            src={require(`../../../../../Images/open-modal-${oppositeTheme}.png`)}
          />
        </button>
      </div>
      <div className="flex flex-col">
        <span className={`font-${font}-regular text-${oppositeTheme}`}>
          {addComma(+pendingOrder.amount || 0) +
            " " +
            pendingOrder.currency_abb}
        </span>
        <div className="-mb-2">
          <RequestStatus status={pendingOrder.status_title} />
        </div>
      </div>
      <div
        className={`flex flex-row w-full items-end gap-x-2 h-8 font-${font}-bold mt-4`}
      >
        {pendingOrder && pendingOrder.status_title === "Admin Assign" && (
          <>
            <button
              type="button"
              onClick={openEditAreYouSureModal}
              className="flex-1 border-2 rounded-lg pt-1.5 border-blue text-blue"
            >
              {lang["edit"]}
            </button>
            <button
              type="button"
              onClick={opneCancelAreYouSureModal}
              className="flex-1 border-2 rounded-lg pt-1.5 border-red text-red"
            >
              {lang["cancel"]}
            </button>
          </>
        )}
        {pendingOrder && pendingOrder.status_title === "Upload Document" && (
          <span
            className={`font-${font}-thin text-${oppositeTheme} text-sm md:text-lg md:leading-none`}
          >
            {lang["upload-document-message"] + "."}
          </span>
        )}
        {pendingOrder &&
          pendingOrder.status_title === "Admin Approve" &&
          pendingOrder.type !== "transfer" && (
            <span
              className={`font-${font}-thin text-${oppositeTheme} text-sm md:text-lg md:leading-none`}
            >
              {lang["admin-approve-message"] + "."}
            </span>
          )}
        {pendingOrder &&
          pendingOrder.status_title === "Admin Approve" &&
          pendingOrder.type === "transfer" && (
            <>
              <button className="flex-1 border-2 rounded-lg pt-1.5 border-blue text-blue">
                {lang["edit"]}
              </button>
              <button
                onClick={opneCancelAreYouSureModal}
                className="flex-1 border-2 rounded-lg pt-1.5 border-red text-red"
              >
                {lang["cancel"]}
              </button>
            </>
          )}
        {pendingOrder && pendingOrder.status_title === "Reject" && (
          <span
            className={`font-${font}-thin overflow-hidden whitespace-nowrap text-ellipsis text-${oppositeTheme} text-sm md:text-lg md:leading-none`}
          >
            {pendingOrder.reject_description}
          </span>
        )}
      </div>
      <span className={`text-gray font-${font}-regular text-sm mt-4 -mb-2`}>
        {convertDate(pendingOrder.datetime_create)}
      </span>
    </button>
  );
}
