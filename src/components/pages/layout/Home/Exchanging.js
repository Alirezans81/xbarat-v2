import React, { useEffect, useState } from "react";
import Wallet from "./Exchanging/Wallet";
import RateType from "./Exchanging/RateType";
import ExchangeForm from "./Exchanging/ExchangeForm";
import { useWalletState } from "../../../../Providers/WalletProvider";
import { useCurrenciesState } from "../../../../Providers/CurrenciesProvider";
import { useCurrencyPairsState } from "../../../../Providers/CurrencyPairsProvider";
import { useLanguageState } from "../../../../Providers/LanguageProvider";
import { useFontState } from "../../../../Providers/FontProvider";

export default function Exchanging({
  selectedCurrecnyPair,
  setSelectedCurrencnyPair,
  rateIsReversed,
  setRateIsReversed,
  refreshPendingExchange,
  formDefaultAmount,
  setFormDefaultAmount,
  formDefaultRate,
  setFormDefaultRate,
  selectedSourceIndex,
  setSelectedSourceIndex,
  availableTargets,
  selectedTargetIndex,
  setAvailableTargets,
  setSelectedTargetIndex,
  amountInputRef,
  rateInputRef,
  focusOnInput,
  isDemo,
}) {
  const lang = useLanguageState();
  const font = useFontState();

  const currencies = useCurrenciesState();
  const currencyPairs = useCurrencyPairsState();
  const wallet = useWalletState();

  const [selectedCurrecnyWalletData, setSelectedCurrecnyWalletData] =
    useState();

  const [sourceLabel, setSourceLabel] = useState(lang["source"]);
  useEffect(() => {
    selectedSourceIndex >= 0
      ? setSourceLabel(currencies[selectedSourceIndex].abbreviation)
      : setSourceLabel(lang["source"]);
  }, [selectedSourceIndex]);
  const [targetLabel, setTargetLabel] = useState(lang["target"]);
  useEffect(() => {
    selectedTargetIndex >= 0
      ? setTargetLabel(availableTargets[selectedTargetIndex].abbreviation)
      : setTargetLabel(lang["target"]);
  }, [selectedTargetIndex]);
  useEffect(() => {
    setSourceLabel(lang["source"]);
    setTargetLabel(lang["target"]);
  }, [lang]);

  const findCurrencyBalanceInWallet = () => {
    if (selectedSourceIndex >= 0) {
      const found = wallet.walletAssets.find(
        (walletAsset) =>
          walletAsset.currency === currencies[selectedSourceIndex].url
      );
      found
        ? setSelectedCurrecnyWalletData(found)
        : setSelectedCurrecnyWalletData(null);
    }
  };
  const findAvailableTargets = () => {
    const foundCurrencyPairs = currencyPairs.filter(
      (currencyPair) =>
        currencies[selectedSourceIndex] &&
        currencyPair.currency_source === currencies[selectedSourceIndex].url
    );

    let foundAvailableTargets = [];
    for (let i = 0; i < foundCurrencyPairs.length; i++) {
      for (let j = 0; j < currencies.length; j++) {
        if (foundCurrencyPairs[i].currency_destination === currencies[j].url) {
          foundAvailableTargets.push(currencies[j]);
          break;
        }
      }
    }

    setAvailableTargets(foundAvailableTargets);
  };

  useEffect(() => {
    findAvailableTargets();
    setRateIsReversed(false);
    setSelectedTargetIndex(-1);
    setSelectedCurrencnyPair(null);
  }, [selectedSourceIndex]);

  useEffect(() => {
    findCurrencyBalanceInWallet();
  }, [selectedSourceIndex, wallet]);

  useEffect(() => {
    if (selectedSourceIndex >= 0 && selectedTargetIndex >= 0) {
      const found = currencyPairs.find(
        (currencyPair) =>
          currencyPair.currency_source ===
            currencies[selectedSourceIndex].url &&
          currencyPair.currency_destination ===
            availableTargets[selectedTargetIndex].url
      );

      found ? setSelectedCurrencnyPair(found) : setSelectedCurrencnyPair(null);

      setRateIsReversed(false);
    }
  }, [selectedTargetIndex]);

  return (
    <div className="flex flex-col px-6 w-full h-full py-5 relative">
      <div className="absolute w-full left-0 -top-4 flex justify-center">
        <span
          className={`bg-blue text-light flex justify-center rounded-xl font-${font}-regular px-5 text-lg pt-1.5`}
        >
          {lang["exchange"]}
        </span>
      </div>
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
              focusOnInput={focusOnInput}
            />
          )}
        </div>
      </div>
      <div className="flex-1 mt-auto">
        <ExchangeForm
          walletBalance={
            selectedCurrecnyWalletData ? selectedCurrecnyWalletData.balance : 0
          }
          selectedCurrecnyPair={selectedCurrecnyPair}
          currencies={currencies}
          selectedSourceIndex={selectedSourceIndex}
          setSelectedSourceIndex={setSelectedSourceIndex}
          sourceLabel={sourceLabel}
          availableTargets={availableTargets}
          selectedTargetIndex={selectedTargetIndex}
          targetLabel={targetLabel}
          setSelectedTargetIndex={setSelectedTargetIndex}
          currencyPairs={currencyPairs}
          formDefaultAmount={formDefaultAmount}
          setFormDefaultAmount={setFormDefaultAmount}
          formDefaultRate={formDefaultRate}
          setFormDefaultRate={setFormDefaultRate}
          rateIsReversed={rateIsReversed}
          setRateIsReversed={setRateIsReversed}
          defaultRateType={
            selectedCurrecnyPair ? selectedCurrecnyPair.defaultRateType : ""
          }
          refreshPendingExchange={refreshPendingExchange}
          amountInputRef={amountInputRef}
          rateInputRef={rateInputRef}
          isDemo={isDemo}
        />
      </div>
    </div>
  );
}
