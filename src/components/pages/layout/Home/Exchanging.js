import React, { useEffect, useState } from "react";
import Wallet from "./Exchanging/Wallet";
import RateType from "./Exchanging/RateType";
import ExchangeForm from "./Exchanging/ExchangeForm";
import {
  useAreRatesReversedSetState,
  useAreRatesReversedState,
} from "../../../../Providers/AreRatesReversedProvider";
import { useReverseRate } from "../../../../hooks/useNumberFunctions";
import { useWalletState } from "../../../../Providers/WalletProvider";

export default function Exchanging({
  selectedCurrecnyPair,
  setSelectedCurrencnyPair,
  formDefaultRate,
  setFormDefaultRate,
}) {
  const [currencies, setCurrencies] = useState([
    {
      id: 1,
      title: "USD",
      imageSource: {
        gray: require("../../../../Images/currency symbols/usd-gray.png"),
        dark: require("../../../../Images/currency symbols/usd-dark.png"),
        light: require("../../../../Images/currency symbols/usd-light.png"),
      },
    },
    {
      id: 2,
      title: "IRR",
      imageSource: {
        gray: require("../../../../Images/currency symbols/irr-gray.png"),
        dark: require("../../../../Images/currency symbols/irr-dark.png"),
        light: require("../../../../Images/currency symbols/irr-light.png"),
      },
    },
    {
      id: 3,
      title: "AFN",
      imageSource: {
        gray: require("../../../../Images/currency symbols/usd-gray.png"),
        dark: require("../../../../Images/currency symbols/usd-dark.png"),
        light: require("../../../../Images/currency symbols/usd-light.png"),
      },
    },
    {
      id: 4,
      title: "TRY",
      imageSource: {
        gray: require("../../../../Images/currency symbols/try-gray.png"),
        dark: require("../../../../Images/currency symbols/try-dark.png"),
        light: require("../../../../Images/currency symbols/try-light.png"),
      },
    },
    {
      id: 5,
      title: "EUR",
      imageSource: {
        gray: require("../../../../Images/currency symbols/eur-gray.png"),
        dark: require("../../../../Images/currency symbols/eur-dark.png"),
        light: require("../../../../Images/currency symbols/eur-light.png"),
      },
    },
  ]);
  const [currencyPairs, setCurrenciesPairs] = useState([
    {
      id: 1,
      source: {
        id: 2,
        title: "IRR",
        imageSource: {
          gray: require("../../../../Images/currency symbols/irr-gray.png"),
          dark: require("../../../../Images/currency symbols/irr-dark.png"),
          light: require("../../../../Images/currency symbols/irr-light.png"),
        },
      },
      target: {
        id: 3,
        title: "AFN",
        imageSource: {
          gray: require("../../../../Images/currency symbols/usd-gray.png"),
          dark: require("../../../../Images/currency symbols/usd-dark.png"),
          light: require("../../../../Images/currency symbols/usd-light.png"),
        },
      },
      rate: 1.717,
      defaultRateType: "IRR/AFN",
      hasReversedRate: true,
    },
    {
      id: 2,
      source: {
        id: 3,
        title: "AFN",
        imageSource: {
          gray: require("../../../../Images/currency symbols/usd-gray.png"),
          dark: require("../../../../Images/currency symbols/usd-dark.png"),
          light: require("../../../../Images/currency symbols/usd-light.png"),
        },
      },
      target: {
        id: 2,
        title: "IRR",
        imageSource: {
          gray: require("../../../../Images/currency symbols/irr-gray.png"),
          dark: require("../../../../Images/currency symbols/irr-dark.png"),
          light: require("../../../../Images/currency symbols/irr-light.png"),
        },
      },
      rate: 1.717,
      defaultRateType: "IRR/AFN",
      hasReversedRate: true,
    },
    {
      id: 3,
      source: {
        id: 1,
        title: "USD",
        imageSource: {
          gray: require("../../../../Images/currency symbols/usd-gray.png"),
          dark: require("../../../../Images/currency symbols/usd-dark.png"),
          light: require("../../../../Images/currency symbols/usd-light.png"),
        },
      },
      target: {
        id: 2,
        title: "IRR",
        imageSource: {
          gray: require("../../../../Images/currency symbols/irr-gray.png"),
          dark: require("../../../../Images/currency symbols/irr-dark.png"),
          light: require("../../../../Images/currency symbols/irr-light.png"),
        },
      },
      rate: 497500,
      defaultRateType: "USD/IRR",
      hasReversedRate: false,
    },
    {
      id: 4,
      source: {
        id: 2,
        title: "IRR",
        imageSource: {
          gray: require("../../../../Images/currency symbols/irr-gray.png"),
          dark: require("../../../../Images/currency symbols/irr-dark.png"),
          light: require("../../../../Images/currency symbols/irr-light.png"),
        },
      },
      target: {
        id: 1,
        title: "USD",
        imageSource: {
          gray: require("../../../../Images/currency symbols/usd-gray.png"),
          dark: require("../../../../Images/currency symbols/usd-dark.png"),
          light: require("../../../../Images/currency symbols/usd-light.png"),
        },
      },
      rate: 497500,
      defaultRateType: "USD/IRR",
      hasReversedRate: false,
    },
  ]);
  const wallet = useWalletState();

  const [selectedSourceIndex, setSelectedSourceIndex] = useState(-1);

  const [selectedCurrecnyBalance, setSelectedCurrecnyBalance] = useState([]);
  const findCurrencyInWallet = () => {
    if (selectedSourceIndex >= 0) {
      const found = wallet.find(
        (e) => e.currencyId === currencies[selectedSourceIndex].id
      );
      setSelectedCurrecnyBalance([found]);
    }
  };

  const [availableTargets, setAvailableTargets] = useState([]);
  const [selectedTargetIndex, setSelectedTargetIndex] = useState(-1);

  useEffect(() => {
    if (selectedSourceIndex >= 0 && selectedTargetIndex >= 0) {
      const found = currencyPairs.find(
        (currencyPair) =>
          currencyPair.source.id === currencies[selectedSourceIndex].id &&
          currencyPair.target.id === availableTargets[selectedTargetIndex].id
      );

      found ? setSelectedCurrencnyPair(found) : selectedCurrecnyPair(null);
    }
  }, [selectedTargetIndex]);
  useEffect(() => {
    // findCurrencyInWallet();
    setFormDefaultRate(null);
    setAreRatesReversed(false);
    setSelectedTargetIndex(-1);
    setSelectedCurrencnyPair(null);
  }, [selectedSourceIndex]);

  const areRatesReversed = useAreRatesReversedState();
  const setAreRatesReversed = useAreRatesReversedSetState();
  const reverseRate = useReverseRate();
  const [rateInputReversedEnabled, setRateInputReversedEnabled] =
    useState(areRatesReversed);

  return (
    <div className="flex flex-col px-6 w-full h-full py-5">
      <div className="flex-1 grid grid-cols-2 grid-rows-6 gap-x-8 w-full h-full">
        <div className="row-span-6">
          {selectedSourceIndex >= 0 && (
            <Wallet
              money={
                selectedCurrecnyBalance[0]
                  ? selectedCurrecnyBalance[0].money
                  : 0
              }
              currency={currencies[selectedSourceIndex].title}
              pending={
                selectedCurrecnyBalance[0]
                  ? selectedCurrecnyBalance[0].pneding
                  : 0
              }
              locked={
                selectedCurrecnyBalance[0]
                  ? selectedCurrecnyBalance[0].locked
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
              hasReversedRate={selectedCurrecnyPair.hasReversedRate}
              setFormDefaultRate={setFormDefaultRate}
              setRateInputReversedEnabled={setRateInputReversedEnabled}
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
          formDefaultRate={
            areRatesReversed ? reverseRate(formDefaultRate) : formDefaultRate
          }
          setFormDefaultRate={setFormDefaultRate}
          rateInputReversedEnabled={rateInputReversedEnabled}
          setRateInputReversedEnabled={setRateInputReversedEnabled}
          defaultRateType={
            selectedCurrecnyPair ? selectedCurrecnyPair.defaultRateType : ""
          }
        />
      </div>
    </div>
  );
}
