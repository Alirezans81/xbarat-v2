import React, { useEffect } from "react";
import { useThemeState } from "../../../../../Providers/ThemeProvider";
import { useIsLoadingSplashScreenSetState } from "../../../../../Providers/IsLoadingSplashScreenProvider";
import {
  useModalDataClose,
  useModalDataSetState,
} from "../../../../../Providers/ModalDataProvider";
import { useAddComma } from "../../../../../hooks/useNumberFunctions";
import { useConvertDateTime } from "../../../../../hooks/useConvertDateTime";
import { useCancelPendingExchange } from "../../../../../apis/pages/Home/hooks";
import AreYouSureModal from "../../../../../components/modals/AreYouSureModal";
import { useFontState } from "../../../../../Providers/FontProvider";
import { useRefreshWallet } from "../../../../../hooks/useRefreshWallet";

export default function PendingExchangeCard({
  lang,
  data,
  refreshPendingExchange,
  resetHome,
  setSource,
  setTarget,
  setAmount,
  setRate,
}) {
  const theme = useThemeState();
  const font = useFontState();
  const oppositeTheme = theme === "dark" ? "light" : "dark";
  const addComma = useAddComma();
  const convertDateTime = useConvertDateTime();
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

  const openEditAreYouSureModal = () => {
    setModalData({
      title: lang["are-you-sure-modal-title"] + "?",
      children: (
        <AreYouSureModal
          onClick={() => {
            data &&
              data.url &&
              cancelPendingExchange(data.url, () => {
                refreshPendingExchange();
                refreshWallet();
                closeModal();

                resetHome();

                setSource(data.currency_source_url);
                setTarget(data.currency_destination_url);
                setAmount(addComma(+data.amount_source));
                setRate(addComma(+data.rate));
              });
          }}
          message={lang["edit-exchange-modal-message"] + "?"}
        />
      ),
      canClose: true,
      isOpen: true,
    });
  };

  const openCancelAreYouSureModal = () => {
    setModalData({
      title: lang["are-you-sure-modal-title"] + "?",
      children: (
        <AreYouSureModal
          onClick={() => {
            data &&
              data.url &&
              cancelPendingExchange(data.url, () => {
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

  return (
    <div
      className={`flex flex-col justify-center items-center bg-${theme}-back rounded-3xl h-full pt-2 pb-1`}
    >
      <div className="flex flex-col items-center">
        <div className="flex justify-between">
          <span className={`text-gray font-${font}-regular`}>
            {lang["currency-pair"]}
          </span>
        </div>
        <div className="flex gap-1 -mt-0.5">
          <span className={`font-${font}-regular mt-0.5 text-${oppositeTheme}`}>
            {addComma(+data.amount_source) + " " + data.currency_source_abb}
          </span>
          <img
            className="w-6 h-6"
            src={require("../../../../../Images/arrow-right-blue.png")}
          />
          <span className={`font-${font}-regular mt-0.5 text-${oppositeTheme}`}>
            {addComma(+data.amount_destination) +
              " " +
              data.currency_destination_abb}
          </span>
        </div>
      </div>
      <div className="flex flex-col items-center mt-1">
        <span className={`text-gray font-${font}-regular`}>{lang["rate"]}</span>
        <div className="flex gap-1">
          <span className={`font-${font}-regular text-${oppositeTheme}`}>
            {addComma(+data.rate)}
          </span>
          <span className={`font-${font}-regular text-blue-gradient`}>
            {data.default_rate_type_title}
          </span>
        </div>
      </div>
      <div className="flex gap-2 mt-2 w-full px-6">
        <button
          type="button"
          // onClick={openEditAreYouSureModal}
          className="flex-1 border-2 border-blue rounded-lg pt-0.5"
        >
          <span className={`font-${font}-bold text-blue`}>{lang["edit"]}</span>
        </button>
        <button
          type="button"
          onClick={openCancelAreYouSureModal}
          className="border-2 border-red rounded-lg flex-1 pt-0.5"
        >
          <span className={`font-${font}-bold text-red`}>{lang["cancel"]}</span>
        </button>
      </div>
      <span className={`font-${font}-regular text-sm text-gray mt-3`}>
        {convertDateTime(data.datetime_create)}
      </span>
    </div>
  );
}
