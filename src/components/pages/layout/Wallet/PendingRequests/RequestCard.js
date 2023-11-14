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
import AreYouSureModal from "../../../../modals/AreYouSureModal";
import { useCancelPendingRequest } from "../../../../../apis/pages/Wallet/hooks";

export default function RequestCard({ refreshPendingRequests, pendingOrder }) {
  const theme = useThemeState();
  const oppositeTheme = theme === "dark" ? "light" : "dark";
  const lang = useLanguageState();
  const addComma = useAddComma();
  const convertDate = useConvertDateTime();
  const setModalData = useModalDataSetState();
  const closeModal = useModalDataClose();
  const setLoading = useIsLoadingSplashScreenSetState();

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

  const opneAreYouSureModal = () => {
    setModalData({
      title: lang["are-you-sure-modal-title"] + "?",
      children: (
        <AreYouSureModal
          onClick={() => {
            pendingOrder &&
              pendingOrder.url &&
              cancelPendingRequest(pendingOrder.url, () => {
                refreshPendingRequests();
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

  return (
    <div
      className={`flex flex-col justify-center bg-${theme}-back rounded-3xl h-full pt-4 pb-4 px-4`}
    >
      <div className="w-full flex flex-row justify-between items-center">
        {pendingOrder && pendingOrder.type === "deposit" && (
          <span className="font-mine-bold text-green">{lang["deposit"]}</span>
        )}
        {pendingOrder && pendingOrder.type === "withdrawal" && (
          <span className="font-mine-bold text-red">{lang["withdrawal"]}</span>
        )}
        {pendingOrder && pendingOrder.type === "transfer" && (
          <span className="font-mine-bold text-blue">{lang["transfer"]}</span>
        )}
        <button onClick={openWalletRequestModal}>
          <img
            className="w-6 h-6 mb-2"
            src={require(`../../../../../Images/open-modal-${oppositeTheme}.png`)}
          />
        </button>
      </div>
      <div className="flex flex-col">
        <span className={`font-mine-regular text-${oppositeTheme}`}>
          {addComma(+pendingOrder.amount || 0) +
            " " +
            pendingOrder.currency_abb}
        </span>
        <div className="-mb-2">
          <RequestStatus status={pendingOrder.status_title} />
        </div>
      </div>
      <div className="flex flex-row w-full items-end gap-x-2 h-8 font-mine-bold mt-4">
        {pendingOrder && pendingOrder.status_title === "Admin Assign" && (
          <>
            <button className="flex-1 border-2 rounded-lg pt-1.5 border-blue text-blue">
              {lang["edit"]}
            </button>
            <button
              onClick={opneAreYouSureModal}
              className="flex-1 border-2 rounded-lg pt-1.5 border-red text-red"
            >
              {lang["cancel"]}
            </button>
          </>
        )}
        {pendingOrder && pendingOrder.status_title === "Upload Document" && (
          <span
            className={`font-mine-thin text-${oppositeTheme} text-lg leading-4`}
          >
            {lang["upload-document-message"] + "."}
          </span>
        )}
        {pendingOrder &&
          pendingOrder.status_title === "Admin Approve" &&
          pendingOrder.type !== "transfer" && (
            <span
              className={`font-mine-thin text-${oppositeTheme} text-lg leading-4`}
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
                onClick={opneAreYouSureModal}
                className="flex-1 border-2 rounded-lg pt-1.5 border-red text-red"
              >
                {lang["cancel"]}
              </button>
            </>
          )}
        {pendingOrder && pendingOrder.status_title === "Reject" && (
          <span
            className={`font-mine-thin text-${oppositeTheme} text-lg leading-4`}
          >
            {pendingOrder.rejectReason}
          </span>
        )}
      </div>
      <span className="text-gray font-mine-regular text-sm mt-4 -mb-2">
        {convertDate(pendingOrder.datetime)}
      </span>
    </div>
  );
}
