import React from "react";
import CustomSlider from "../../../common/CustomSlider";
import { useThemeState } from "../../../../Providers/ThemeProvider";
import { useLanguageState } from "../../../../Providers/LanguageProvider";
import PendingExchangeCard from "./PendingExchange/PendingExchangeCard";
import { useFontState } from "../../../../Providers/FontProvider";

export default function PendingExchange({
  pendingExchanges,
  findCurrencyBalanceInWallet,
  refreshPendingExchange,
  resetHome,
  setSource,
  setTarget,
  setAmount,
  setRate,
  focusOnAmountInput,
  selectedCurrecnyPair,
  rateIsReversed,
}) {
  const theme = useThemeState();
  const oppositeTheme = theme === "dark" ? "light" : "dark";
  const lang = useLanguageState();
  const font = useFontState();

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
          <CustomSlider slidesToShow={1} slidesToScroll={1}>
            {pendingExchanges.map((pendingExchange, index) => (
              <div
                key={index}
                className="flex justify-center items-center h-full px-1"
              >
                <PendingExchangeCard
                  lang={lang}
                  data={pendingExchange}
                  findCurrencyBalanceInWallet={findCurrencyBalanceInWallet}
                  refreshPendingExchange={refreshPendingExchange}
                  resetHome={resetHome}
                  setSource={setSource}
                  setTarget={setTarget}
                  setAmount={setAmount}
                  setRate={setRate}
                  focusOnAmountInput={focusOnAmountInput}
                  selectedCurrecnyPair={selectedCurrecnyPair}
                  rateIsReversed={rateIsReversed}
                />
              </div>
            ))}
          </CustomSlider>
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
