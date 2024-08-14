import React, { useEffect, useState } from "react";
import Wallet from "../../../pages/layout/Home/Exchanging/Wallet";
import RateType from "../../../pages/layout/Home/Exchanging/RateType";
import ExchangingExchangeFormTutorialComponent from "./ExchangingExchangeFormTurorialComponent";
import { useWalletState } from "../../../../Providers/WalletProvider";
import { useCurrenciesState } from "../../../../Providers/CurrenciesProvider";
import { useCurrencyPairsState } from "../../../../Providers/CurrencyPairsProvider";
import { useLanguageState } from "../../../../Providers/LanguageProvider";
import { useFontState } from "../../../../Providers/FontProvider";
export default function ExchangeFormTutorialComponent() {
  const lang = useLanguageState();
  const font = useFontState();
  const currencies = useCurrenciesState();
  const wallet = useWalletState();
  return (
    <div className="flex flex-col px-6 w-full h-full py-5 relative">
      <div className="absolute w-full left-0 -top-5 flex justify-center">
        <span
          className={`bg-blue text-light flex justify-center rounded-xl font-${font}-regular px-5 text-lg pt-1.5`}
        >
          {lang["exchange"]}
        </span>
      </div>
      <div className="flex-1 grid grid-cols-2 grid-rows-6 gap-x-8 w-full h-full">
        <div className="row-span-6 mt-2">
          <Wallet
            walletData={wallet.walletAssets[0]}
            currency={currencies[0].abbreviation}
          />
        </div>
        <div className="row-span-1 col-span-1" />
        <div className="row-span-6 col-span-1 flex items-end flex-row">
          <RateType
            rate={selectedCurrecnyPair.rate}
            defaultRateType={selectedCurrecnyPair.defaultRateType}
            hasReversedRate={selectedCurrecnyPair.has_reverse_rate}
            rateIsReversed={rateIsReversed}
            setRateIsReversed={setRateIsReversed}
            selectedCurrecnyPair={selectedCurrecnyPair}
            default_rate_type_title={
              selectedCurrecnyPair &&
              selectedCurrecnyPair.default_rate_type_title
                ? selectedCurrecnyPair.default_rate_type_title
                : ""
            }
            setFormDefaultRate={setFormDefaultRate}
          />
        </div>
      </div>
      <div className="flex-1 mt-auto">
        <ExchangingExchangeFormTutorialComponent />
      </div>
    </div>
  );
}
