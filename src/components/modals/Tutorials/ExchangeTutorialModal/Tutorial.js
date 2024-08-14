import { React, useState } from "react";
import { useCurrenciesState } from "../../../../Providers/CurrenciesProvider";
import ExchangeFormTutorialComponent from "./ExchangeFormTutorialComponent";
import { useWalletState } from "../../../../Providers/WalletProvider";
const Tutorial = () => {
  return (
    <div className="w-full h-full justify-center border-blue border-solid border-2 rounded-2xl w-fit h-fit">
      <ExchangeFormTutorialComponent />
    </div>
  );
};

export default Tutorial;
