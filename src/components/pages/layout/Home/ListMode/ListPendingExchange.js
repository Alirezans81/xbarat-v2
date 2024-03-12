import React, { useEffect } from "react";
import { useThemeState } from "../../../../../Providers/ThemeProvider";
import { useLanguageState } from "../../../../../Providers/LanguageProvider";
import { useFontState } from "../../../../../Providers/FontProvider";
import CustomTable from "../../../../common/CustomTable";
import { useAddComma } from "../../../../../hooks/useNumberFunctions";
import { useCancelPendingExchange } from "../../../../../apis/pages/Home/hooks";
import AreYouSureModal from "../../../../modals/AreYouSureModal";
import { useRefreshWallet } from "../../../../../hooks/useRefreshWallet";
import { useIsLoadingSplashScreenSetState } from "../../../../../Providers/IsLoadingSplashScreenProvider";
import {
  useModalDataClose,
  useModalDataSetState,
} from "../../../../../Providers/ModalDataProvider";

export default function ListPendingExchange({
  pendingExchanges,
  refreshPendingExchange,
}) {
  const theme = useThemeState();
  const oppositeTheme = theme === "dark" ? "light" : "dark";
  const lang = useLanguageState();
  const font = useFontState();
  const addComma = useAddComma();
  const setLoading = useIsLoadingSplashScreenSetState();
  const setModalData = useModalDataSetState();
  const closeModal = useModalDataClose();
  const refreshWallet = useRefreshWallet();

  const { cancelPendingExchange, isLoading: cancelPendingExchangeIsLoading } =
    useCancelPendingExchange();
  useEffect(
    () => setLoading(cancelPendingExchangeIsLoading),
    [cancelPendingExchangeIsLoading]
  );

  const openEditAreYouSureModal = (url) => {
    setModalData({
      title: lang["are-you-sure-modal-title"] + "?",
      children: (
        <AreYouSureModal
          onClick={() => {
            url &&
              cancelPendingExchange(url, () => {
                refreshPendingExchange();
                refreshWallet();
                closeModal();
              });
          }}
          message={lang["edit-exchange-modal-message"] + "?"}
        />
      ),
      canClose: true,
      isOpen: true,
    });
  };

  const openCancelAreYouSureModal = (url) => {
    setModalData({
      title: lang["are-you-sure-modal-title"] + "?",
      children: (
        <AreYouSureModal
          onClick={() => {
            url &&
              cancelPendingExchange(url, () => {
                refreshPendingExchange();
                refreshWallet();
                closeModal();
              });
          }}
          message={lang["cancel-exchange-modal-message"] + "?"}
        />
      ),
      canClose: true,
      isOpen: true,
    });
  };

  const head = [
    lang["currency-pair"],
    lang["source-amount"],
    lang["target-amount"],
    lang["rate"],
    lang["status"],
    lang["action"],
  ];
  const pending_exchanges_data = pendingExchanges
    ? pendingExchanges.map((row) => {
        let temp = {};
        temp.default_rate_type_title = row.default_rate_type_title;
        temp.amount_source =
          addComma(+row.amount_source) + " " + row.currency_source_abb;
        temp.amount_destination =
          addComma(+row.amount_destination) +
          " " +
          row.currency_destination_abb;
        temp.rate = addComma(+row.rate) + " " + row.default_rate_type_title;
        temp.status_title = row.status_title;
        temp.action = (
          <div className="flex items-center gap-x-2 py-2 -mt-1">
            <button
              onClick={() => {
                row && row.url && openEditAreYouSureModal(row.url);
              }}
              type="button"
            >
              <img
                className="w-5 h-5"
                src={require("../../../../../Images/edit.png")}
              />
            </button>
            <button
              onClick={() =>
                row && row.url && openCancelAreYouSureModal(row.url)
              }
              type="button"
            >
              <img
                className="w-5 h-5"
                src={require("../../../../../Images/multiplication.png")}
              />
            </button>
          </div>
        );

        return temp;
      })
    : [];

  return (
    <div className="px-5 py-3 h-full">
      <div className="flex justify-between items-center w-full">
        <span
          className={`text-2xl font-${font}-bold text-${oppositeTheme} mx-0.5`}
        >
          {lang["pending-orders"]}
        </span>
      </div>
      <div className="mt-3.5 w-full px-4 h-full relative">
        {pendingExchanges.length !== 0 ? (
          <CustomTable heads={head} rows={pending_exchanges_data} />
        ) : (
          <div className="absolute left-0 h-full w-full -mt-8 top-0 flex justify-center items-center">
            <span
              className={`font-${font}-thin text-2xl md:text-3xl text-${oppositeTheme}`}
            >
              {lang["no-data"]}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
