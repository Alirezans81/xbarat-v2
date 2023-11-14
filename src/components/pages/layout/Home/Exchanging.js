import React, { useEffect, useState } from "react";
import Wallet from "./Exchanging/Wallet";
import RateType from "./Exchanging/RateType";
import ExchangeForm from "./Exchanging/ExchangeForm";
import { useWalletState } from "../../../../Providers/WalletProvider";
import { useCurrenciesState } from "../../../../Providers/CurrenciesProvider";
import { useCurrencyPairsState } from "../../../../Providers/CurrencyPairsProvider";

export default function Exchanging({
  selectedCurrecnyPair,
  setSelectedCurrencnyPair,
  formDefaultRate,
  rateIsReversed,
  setRateIsReversed,
}) {
  const currencies = useCurrenciesState();
  const currencyPairs = useCurrencyPairsState();
  const wallet = useWalletState();

  const [selectedSourceIndex, setSelectedSourceIndex] = useState(-1);
  const [selectedCurrecnyWalletData, setSelectedCurrecnyWalletData] =
    useState(0);
  const findCurrencyBalanceInWallet = () => {
    if (selectedSourceIndex >= 0) {
      const found = wallet.walletAssets.find(
        (e) => e.currencyId === currencies[selectedSourceIndex].id
      );
      found && found && setSelectedCurrecnyWalletData(found);
    }
  };
  const findAvailableTargets = () => {
    const foundCurrencyPairs = currencyPairs.filter(
      (currencyPair) =>
        currencyPair.currency_source === currencies[selectedSourceIndex].id
    );

    let foundAvailableTargets = [];
    for (let i = 0; i < foundCurrencyPairs.length; i++) {
      for (let j = 0; j < currencies.length; j++) {
        if (foundCurrencyPairs.currency_destination === currencies[j].id) {
          foundAvailableTargets.push(currencies[j]);
          break;
        }
      }
    }

    setAvailableTargets(foundAvailableTargets);
  };
  useEffect(() => {
    findCurrencyBalanceInWallet();
    findAvailableTargets();
    setRateIsReversed(false);
    setSelectedTargetIndex(-1);
    setSelectedCurrencnyPair(null);
  }, [selectedSourceIndex]);

  const [availableTargets, setAvailableTargets] = useState([]);
  const [selectedTargetIndex, setSelectedTargetIndex] = useState(-1);
  useEffect(() => {
    if (selectedSourceIndex >= 0 && selectedTargetIndex >= 0) {
      const found = currencyPairs.find(
        (currencyPair) =>
          currencyPair.currency_source === currencies[selectedSourceIndex].id &&
          currencyPair.currency_destination ===
            availableTargets[selectedTargetIndex].id
      );

      found ? setSelectedCurrencnyPair(found) : selectedCurrecnyPair(null);
    }
  }, [selectedTargetIndex]);

  return (
    <div className="flex flex-col px-6 w-full h-full py-5">
      <div className="flex-1 grid grid-cols-2 grid-rows-6 gap-x-8 w-full h-full">
        <div className="row-span-6">
          {selectedSourceIndex >= 0 && (
            <Wallet
              balance={
                selectedCurrecnyWalletData && selectedCurrecnyWalletData.balance
                  ? +selectedCurrecnyWalletData.balance
                  : 0
              }
              currency={currencies[selectedSourceIndex].abbreviation}
              pending={
                selectedCurrecnyWalletData && selectedCurrecnyWalletData.pending
                  ? +selectedCurrecnyWalletData.pending
                  : 0
              }
              locked={
                selectedCurrecnyWalletData && selectedCurrecnyWalletData.locked
                  ? +selectedCurrecnyWalletData.locked
                  : 0
              }
            />
          )}
        </div>
        <div className="row-span-1 col-span-1" />
        <div className="row-span-6 col-span-1 flex items-end">
          {selectedCurrecnyPair && (
            <RateType
              rate={selectedCurrecnyPair.rate}
              defaultRateType={
                currencies[selectedSourceIndex].abbreviation +
                "/" +
                availableTargets[selectedTargetIndex].abbreviation
              }
              hasReversedRate={selectedCurrecnyPair.has_reverse_rate}
              rateIsReversed={rateIsReversed}
              setRateIsReversed={setRateIsReversed}
            />
          )}
        </div>
      </div>
      <div className="flex-1 mt-auto">
        <ExchangeForm
          currencies={currencies}
          selectedSourceIndex={selectedSourceIndex}
          setSelectedSourceIndex={setSelectedSourceIndex}
          availableTargets={availableTargets}
          setAvailableTargets={setAvailableTargets}
          selectedTargetIndex={selectedTargetIndex}
          setSelectedTargetIndex={setSelectedTargetIndex}
          currencyPairs={currencyPairs}
          formDefaultRate={formDefaultRate}
          setRateIsReversed={setRateIsReversed}
          defaultRateType={
            selectedCurrecnyPair ? selectedCurrecnyPair.defaultRateType : ""
          }
        />
      </div>
    </div>
  );
}
