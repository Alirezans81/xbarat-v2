import React, { useState } from "react";
import { useThemeState } from "../../../../Providers/ThemeProvider";
import { useLanguageState } from "../../../../Providers/LanguageProvider";
import { useAddComma } from "../../../../hooks/useNumberFunctions";
import RequestStatus from "../common/RequestStatus";
import { useConvertDateTime } from "../../../../hooks/useConvertDateTime";
import PendingRequestModal from "../../../modals/PendingRequestModal";
import { useModalDataSetState } from "../../../../Providers/ModalDataProvider";

export default function LastDeposit({ refreshPendingRequests, lastDeposit }) {
  const theme = useThemeState();
  const oppositeTheme = theme === "dark" ? "light" : "dark";
  const lang = useLanguageState();
  const addComma = useAddComma();
  const convertDateTime = useConvertDateTime();
  const setModalData = useModalDataSetState();

  const openWalletRequestModal = () => {
    setModalData({
      title: lang["pending-request"],
      children: (
        <PendingRequestModal
          refreshPendingRequests={refreshPendingRequests}
          data={lastDeposit}
        />
      ),
      canClose: true,
      isOpen: true,
    });
  };

  if (lastDeposit) {
    return (
      <div className="h-full flex flex-col justify-between">
        <div className="flex flex-row w-full justify-between items-center">
          <span className={`text-${oppositeTheme} font-mine-bold text-xl`}>
            {lang["last-deposit"]}
          </span>
          <span className="text-gray text-sm font-mine-regular">
            {convertDateTime(lastDeposit.datetime)}
          </span>
        </div>
        <div className="flex flex-row w-full justify-between items-end">
          <div className="flex flex-col">
            <span className={`font-mine-regular text-${oppositeTheme}`}>
              {addComma(+lastDeposit.amount) + " " + lastDeposit.currency_abb}
            </span>
            <div className="-mb-2">
              <RequestStatus status={lastDeposit.status_title} />
            </div>
          </div>
          <button onClick={openWalletRequestModal}>
            <img
              className="w-6 h-6"
              src={require(`../../../../Images/open-modal-${oppositeTheme}.png`)}
            />
          </button>
        </div>
      </div>
    );
  } else {
    return (
      <div className="h-full flex flex-col justify-between">
        <div className="flex flex-row w-full justify-between items-center">
          <span className={`text-${oppositeTheme} font-mine-bold text-xl`}>
            {lang["last-deposit"]}
          </span>
        </div>
        <div className="flex flex-row w-full justify-center items-center">
          <span className={`font-mine-regular text-xl text-${oppositeTheme}`}>
            {lang["no-data"]}
          </span>
        </div>
      </div>
    );
  }
}
