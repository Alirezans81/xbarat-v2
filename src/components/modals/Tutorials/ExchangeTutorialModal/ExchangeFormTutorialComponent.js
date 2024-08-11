import React, { useEffect, useState } from "react";
import Wallet from "../../../pages/layout/Home/Exchanging/Wallet";
import RateType from "../../../pages/layout/Home/Exchanging/RateType";
import ExchangingExchangeFormTutorialComponent from "./ExchangingExchangeFormTurorialComponent";
import { useWalletState } from "../../../../Providers/WalletProvider";
import { useCurrenciesState } from "../../../../Providers/CurrenciesProvider";
import WallExchangeWalletTutorialComponent from "./ExchangeWalletTutorialCompnent";
import { useLanguageState } from "../../../../Providers/LanguageProvider";
import ExchangeRateTypeTutorialComponent from "./ExchangerateTypeTutorialComponent";
import { useFontState } from "../../../../Providers/FontProvider";
export default function ExchangeFormTutorialComponent({ hovered }) {
  const lang = useLanguageState();
  const font = useFontState();
  return (
    <div className="flex flex-col px-6 w-full h-full relative">
      <div className="absolute w-full left-0 -top-5 flex justify-center">
        <span
          className={`bg-blue text-light flex justify-center rounded-xl font-${font}-regular px-5 text-lg pt-1.5`}
        >
          {lang["exchange"]}
        </span>
      </div>
      <div className="flex-1 grid grid-cols-2 grid-rows-6 gap-x-8 w-full h-full mt-5">
        {/* <div className="row-span-6 mt-2">
          <WallExchangeWalletTutorialComponent hovered={hovered} />
        </div> */}
        <div className="row-span-1 col-span-1" />
        <div className="row-span-6 col-span-1 flex items-end flex-row">
          <ExchangeRateTypeTutorialComponent hovered={hovered} />
        </div>
      </div>
      <div className="flex-1 mt-auto">
        <ExchangingExchangeFormTutorialComponent hovered={hovered} />
      </div>
    </div>
  );
}
