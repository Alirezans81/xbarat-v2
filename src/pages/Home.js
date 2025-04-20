/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from "react";
import { useThemeState } from "../Providers/ThemeProvider";
import { useDirectionState } from "../Providers/DirectionProvider";
import Exchanging from "../components/pages/layout/Home/Exchanging";
import TableExchange from "../components/pages/layout/Home/TableExchange";
import TableExchangeExchanging from "../components/pages/layout/Home/TableExchangeExchanging";
import PendingExchange from "../components/pages/layout/Home/PendingExchange";
import OtherExchanges from "../components/pages/layout/Home/OtherExchanges";
import { useGetPendingExchanges } from "../apis/pages/Home/hooks";
import { useIsLoadingSplashScreenSetState } from "../Providers/IsLoadingSplashScreenProvider";
import { useTokenState } from "../Providers/TokenProvider";
import WatchList from "../components/pages/layout/Home/WatchList";
import { useLanguageState } from "../Providers/LanguageProvider";
import { useFontState } from "../Providers/FontProvider";
import ListWatchList from "../components/pages/layout/Home/ListMode/ListWatchList";
import ListOtherExchanges from "../components/pages/layout/Home/ListMode/ListOtherExchanges";
import ListPendingExchange from "../components/pages/layout/Home/ListMode/ListPendingExchange";
import { useCurrenciesState } from "../Providers/CurrenciesProvider";
import { useWalletState } from "../Providers/WalletProvider";
import PiechartAssets from "../components/pages/Dashboard/PiechartAssets";
import Joyride from "react-joyride";
export default function Home({ isDemo, platform }) {
  const theme = useThemeState();
  const oppositeTheme = theme === "dark" ? "light" : "dark";
  const lang = useLanguageState();
  const font = useFontState();
  const { one: oneDirection } = useDirectionState();
  const setLoading = useIsLoadingSplashScreenSetState();
  const token = useTokenState();
  const currencies = useCurrenciesState();
  const wallet = useWalletState();

  const amountInputRef = useRef();
  const focusOnAmountInput = () => {
    amountInputRef.current.focus();
  };
  const rateInputRef = useRef();
  const focusOnRateInput = () => {
    rateInputRef.current.focus();
  };

  const [pageMode, setPageMode] = useState("card");
  const canSwitchPageModeWidth = 1280;
  useEffect(() => {
    const result = window.localStorage.getItem("homePageMode");
    if (result) setPageMode(result);
  }, []);

  const resetHome = () => {
    setSelectedSourceIndex(-1);
    setSelectedTargetIndex(-1);
    setSelectedCurrencnyPair(null);
    setPendingExchanges([]);
    refreshPendingExchange();
  };
  useEffect(() => {
    resetHome();
  }, [pageMode]);

  const [selectedCurrecnyPair, setSelectedCurrencnyPair] = useState();
  const [formDefaultAmount, setFormDefaultAmount] = useState();
  const [formDefaultRate, setFormDefaultRate] = useState();
  const [rateIsReversed, setRateIsReversed] = useState(true);

  const [selectedSourceIndex, setSelectedSourceIndex] = useState(-1);
  const [availableTargets, setAvailableTargets] = useState([]);
  const [selectedTargetIndex, setSelectedTargetIndex] = useState(-1);

  const [selectedCurrecnyWalletData, setSelectedCurrecnyWalletData] =
    useState();

  const [pendingExchanges, setPendingExchanges] = useState([]);
  const { getPendingExchanges, isLoading: getPendingExchangesIsLoading } =
    useGetPendingExchanges();
  useEffect(
    () => setLoading(getPendingExchangesIsLoading),
    [getPendingExchangesIsLoading]
  );
  const refreshPendingExchange = () => {
    token && getPendingExchanges(token, setPendingExchanges);
  };
  useEffect(() => refreshPendingExchange(), [token]);

  const [source, setSource] = useState();
  const findSource = (currency_slug) => {
    let result = -1;
    result = currencies.findIndex(
      (currency) => currency.slug === currency_slug
    );
    result >= 0 ? setSelectedSourceIndex(result) : setSelectedSourceIndex(-1);
  };
  const [target, setTarget] = useState();
  const findTarget = (currency_slug) => {
    let result = -1;
    result = availableTargets.findIndex(
      (currency) => currency.slug === currency_slug
    );
    result >= 0 ? setSelectedTargetIndex(result) : setSelectedTargetIndex(-1);
  };

  useEffect(() => {
    source && findSource(source);
  }, [source]);
  useEffect(() => {
    target && availableTargets.length > 0 && findTarget(target);
  }, [target, availableTargets]);

  const findCurrencyBalanceInWallet = (newWalletAssets) => {
    if (newWalletAssets) {
      if (selectedSourceIndex >= 0) {
        const found = newWalletAssets.find(
          (walletAsset) =>
            walletAsset.currency === currencies[selectedSourceIndex].url
        );
        found
          ? setSelectedCurrecnyWalletData(found)
          : setSelectedCurrecnyWalletData(null);
      }
    } else {
      if (selectedSourceIndex >= 0) {
        const found = wallet.walletAssets.find(
          (walletAsset) =>
            walletAsset.currency === currencies[selectedSourceIndex].url
        );
        found
          ? setSelectedCurrecnyWalletData(found)
          : setSelectedCurrecnyWalletData(null);
      }
    }
  };
  const [runTour, setRunTour] = useState(true);
  const width = window.innerWidth;

  const steps =
    width > 767
      ? [
          {
            target: ".exchanging-component",
            content: "Enter the amount and rate to exchange currencies.",
          },
          {
            target: ".watchlist-component",
            content:
              "This is your watchlist. Select currencies to exchange here.",
          },
          {
            target: ".other-exchange-component",
            content: "Check Other exchanges in Currency Exchanges.",
          },
          {
            target: ".pending-exchange-component",
            content: "Check your pending exchanges and manage them here.",
          },
          {
            target: ".table-exchange-component",
            content: "Check Table exchanges and see them here.",
          },
        ]
      : [
          {
            target: ".watchlist-component",
            content:
              "This is your watchlist. Select currencies to exchange here.",
          },
          {
            target: ".table-exchange-exchanging-component",
            content: "Check Table exchanges and see them here.",
          },
          {
            target: ".other-exchange-component",
            content: "Check Other exchanges in Currency Exchanges.",
          },
          {
            target: ".pending-exchange-component",
            content: "Check your pending exchanges and manage them here.",
          },
        ];

  if (pageMode === "card" || window.innerWidth <= canSwitchPageModeWidth) {
    return (
      <>
        <Joyride
          steps={steps}
          run={runTour}
          continuous
          hideBackButton={true}
          hideCloseButton={true}
          showSkipButton={false}
          showProgress={true}
          styles={{
            beaconInner: { borderRadius: "50px" },
            options: {
              zIndex: 10000,
              arrowColor: theme === "dark" ? "#152831" : "#FFFFFF",
              backgroundColor: theme === "dark" ? "#152831" : "#FFFFFF",
              textColor: theme === "dark" ? "#FFFFFF" : "#2A2B2E",
              primaryColor: "#0A8DFF",
            },
          }}
          callback={(data) => {
            if (data.status === "finished" || data.status === "skipped") {
              setRunTour(false);
            }
          }}
        />
        {window.innerWidth >= canSwitchPageModeWidth && (
          <div className={`fixed left-4 ${isDemo ? "bottom-32" : "bottom-60"}`}>
            <button
              onClick={() => {
                window.localStorage.setItem("homePageMode", "list");
                setPageMode("list");
              }}
              className="flex gap-x-2 items-center bg-blue rounded-full p-2.5"
            >
              <img
                alt=""
                className="w-5 h-5"
                src={require(`../Images/pages/layout/Home/list-mode.png`)}
              />
            </button>
          </div>
        )}
        <div className="absolute flex flex-col w-full h-full overflow-y-auto px-0 md:px-8 md:p-0 pb-20">
          <div
            className={`w-full bg-${theme} shadow-${theme} rounded-2xl flex justify-center md:hidden pt-5 pb-2.5 px-5 mt-2`}
          >
            <span
              className={`text-2xl md:hidden text-${oppositeTheme} font-${font}-bold`}
            >
              {lang["home"]}
            </span>
          </div>

          {/* Pie Chart */}
          <div className="hidden grid-cols-11 grid-rows-1 md:gap-x-10 gap-y-7 pb-16 pt-4">
            <div
              className={`xl:col-span-3 lg:col-span-4 md:col-span-5 col-span-11 bg-${theme} rounded-3xl h-72 w-full flex justify-center items-center`}
            >
              <PiechartAssets />
            </div>
            <div className="xl:col-span-8 lg:col-span-7 md:col-span-6 col-span-11">
              Other
            </div>
          </div>

          <div className="flex-1 mt-5 md:mt-0 grid grid-cols-11 grid-rows-6 md:gap-x-10 gap-y-7 pb-16 pt-4">
            <div
              className={`order-3 md:order-1 h-72 bg-${theme} border-4 border-blue rounded-3xl md:flex hidden justify-center items-center row-span-3 xl:col-span-3 lg:col-span-4 md:col-span-5 col-span-12 exchanging-component`}
            >
              <Exchanging
                selectedCurrecnyPair={selectedCurrecnyPair}
                setSelectedCurrencnyPair={setSelectedCurrencnyPair}
                formDefaultAmount={formDefaultAmount}
                setFormDefaultAmount={setFormDefaultAmount}
                formDefaultRate={formDefaultRate}
                setFormDefaultRate={setFormDefaultRate}
                rateIsReversed={rateIsReversed}
                setRateIsReversed={setRateIsReversed}
                refreshPendingExchange={refreshPendingExchange}
                selectedSourceIndex={selectedSourceIndex}
                setSelectedSourceIndex={setSelectedSourceIndex}
                availableTargets={availableTargets}
                selectedTargetIndex={selectedTargetIndex}
                setAvailableTargets={setAvailableTargets}
                setSelectedTargetIndex={setSelectedTargetIndex}
                selectedCurrecnyWalletData={selectedCurrecnyWalletData}
                findCurrencyBalanceInWallet={findCurrencyBalanceInWallet}
                amountInputRef={amountInputRef}
                rateInputRef={rateInputRef}
                focusOnInput={focusOnRateInput}
                isDemo={isDemo}
                setSource={setSource}
                setTarget={setTarget}
              />
            </div>
            <div
              className={`order-1 md:order-2 h-72 bg-${theme} xl:rounded-3xl lg:rounded-l-3xl row-span-3 xl:col-span-5 lg:col-span-7 md:rounded-r-none md:col-span-6 md:rounded-l-3xl col-span-12 rounded-3xl watchlist-component`}
            >
              <WatchList
                setSource={setSource}
                setTarget={setTarget}
                rateIsReversed={rateIsReversed}
                selectedCurrecnyPair={selectedCurrecnyPair}
                platform={platform}
              />
            </div>
            <div
              className={`order-4 md:order-3 h-72 bg-${theme} lg:rounded-3xl xl:rounded-l-3xl xl:rounded-r-none row-span-3 xl:col-span-3 lg:col-span-5 md:col-span-5 md:rounded-3xl col-span-12 rounded-3xl other-exchange-component`}
            >
              <OtherExchanges
                selectedCurrecnyPair={selectedCurrecnyPair}
                rateIsReversed={rateIsReversed}
              />
            </div>
            <div
              className={`order-5 md:order-4 h-72 bg-${theme} lg:rounde xl:rounded-3xl row-span-3 xl:col-span-3 lg:col-span-6 lg:rounded-r-none md:col-span-6 md:rounded-r-none col-span-12 rounded-3xl pending-exchange-component`}
            >
              <PendingExchange
                pendingExchanges={pendingExchanges}
                findCurrencyBalanceInWallet={findCurrencyBalanceInWallet}
                refreshPendingExchange={refreshPendingExchange}
                resetHome={resetHome}
                setSource={setSource}
                setTarget={setTarget}
                setAmount={setFormDefaultAmount}
                setRate={setFormDefaultRate}
                focusOnAmountInput={focusOnAmountInput}
                selectedCurrecnyPair={selectedCurrecnyPair}
                rateIsReversed={rateIsReversed}
              />
            </div>
            <div
              className={`order-2 md:hidden min-h-72 mt-2 bg-${theme} rounded-2xl row-span-6 xl:col-span-8   col-span-12 table-exchange-exchanging-component`}
            >
              <TableExchangeExchanging
                selectedSourceIndex={selectedSourceIndex}
                availableTargets={availableTargets}
                selectedTargetIndex={selectedTargetIndex}
                selectedCurrecnyPair={selectedCurrecnyPair}
                setFormDefaultRate={setFormDefaultRate}
                focusOnInput={focusOnRateInput}
                rateIsReversed={rateIsReversed}
                setSelectedCurrencnyPair={setSelectedCurrencnyPair}
                formDefaultAmount={formDefaultAmount}
                setFormDefaultAmount={setFormDefaultAmount}
                formDefaultRate={formDefaultRate}
                setRateIsReversed={setRateIsReversed}
                refreshPendingExchange={refreshPendingExchange}
                setSelectedSourceIndex={setSelectedSourceIndex}
                setAvailableTargets={setAvailableTargets}
                setSelectedTargetIndex={setSelectedTargetIndex}
                selectedCurrecnyWalletData={selectedCurrecnyWalletData}
                findCurrencyBalanceInWallet={findCurrencyBalanceInWallet}
                amountInputRef={amountInputRef}
                rateInputRef={rateInputRef}
                isDemo={isDemo}
                setSource={setSource}
                setTarget={setTarget}
              />
            </div>
            <div
              className={`md:flex hidden md:order-5 min-h-72 md:h-72 mt-2 pb-2 md:pb-0 md:mt-0 rounded-2xl md:bg-${theme} rounded-${oneDirection}-3xl row-span-3 xl:col-span-8 lg:col-span-11 md:col-span-11 col-span-12 rounded-3xl table-exchange-component`}
            >
              <TableExchange
                selectedSourceIndex={selectedSourceIndex}
                availableTargets={availableTargets}
                selectedTargetIndex={selectedTargetIndex}
                selectedCurrecnyPair={selectedCurrecnyPair}
                setFormDefaultRate={setFormDefaultRate}
                focusOnInput={focusOnRateInput}
                rateIsReversed={rateIsReversed}
              />
            </div>
          </div>
        </div>
      </>
    );
  } else if (pageMode === "list") {
    <Joyride
      steps={steps}
      run={runTour}
      continuous
      showSkipButton
      showProgress
      styles={{ options: { zIndex: 10000 } }}
      callback={(data) => {
        if (data.status === "finished" || data.status === "skipped") {
          setRunTour(false);
        }
      }}
    />;
    return (
      <>
        {window.innerWidth >= canSwitchPageModeWidth && (
          <div className={`fixed left-4 ${isDemo ? "bottom-32" : "bottom-60"}`}>
            <button
              onClick={() => {
                window.localStorage.setItem("homePageMode", "card");
                setPageMode("card");
              }}
              className="flex gap-x-2 items-center bg-blue rounded-full p-2.5"
            >
              <img
                alt=""
                className="w-5 h-5"
                src={require(`../Images/pages/layout/Home/card-mode.png`)}
              />
            </button>
          </div>
        )}
        <div className="absolute flex flex-col w-full h-full overflow-y-auto px-8 md:p-0">
          <div className="mt-5 md:mt-0 grid grid-cols-11 grid-rows-6 md:gap-x-10 gap-y-7 pb-16">
            <div
              className={`h-72 bg-${theme} col-span-11 row-span-3 rounded-l-3xl`}
            >
              <ListWatchList
                setSource={setSource}
                setTarget={setTarget}
                rateIsReversed={rateIsReversed}
                selectedCurrecnyPair={selectedCurrecnyPair}
                platform={platform}
              />
            </div>
            <div
              className={`h-72 bg-${theme} border-4 border-blue rounded-3xl flex justify-center items-center row-span-3 col-span-3 exchanging-component`}
            >
              <Exchanging
                selectedCurrecnyPair={selectedCurrecnyPair}
                setSelectedCurrencnyPair={setSelectedCurrencnyPair}
                formDefaultAmount={formDefaultAmount}
                setFormDefaultAmount={setFormDefaultAmount}
                formDefaultRate={formDefaultRate}
                setFormDefaultRate={setFormDefaultRate}
                rateIsReversed={rateIsReversed}
                setRateIsReversed={setRateIsReversed}
                refreshPendingExchange={refreshPendingExchange}
                selectedSourceIndex={selectedSourceIndex}
                setSelectedSourceIndex={setSelectedSourceIndex}
                availableTargets={availableTargets}
                selectedTargetIndex={selectedTargetIndex}
                setAvailableTargets={setAvailableTargets}
                setSelectedTargetIndex={setSelectedTargetIndex}
                selectedCurrecnyWalletData={selectedCurrecnyWalletData}
                findCurrencyBalanceInWallet={findCurrencyBalanceInWallet}
                amountInputRef={amountInputRef}
                rateInputRef={rateInputRef}
                focusOnInput={focusOnRateInput}
                isDemo={isDemo}
              />
            </div>
            <div
              className={`h-72 pb-0 mt-0 bg-${theme} rounded-${oneDirection}-3xl row-span-3 col-span-8 table-exchange-component`}
            >
              <TableExchange
                selectedSourceIndex={selectedSourceIndex}
                availableTargets={availableTargets}
                selectedTargetIndex={selectedTargetIndex}
                selectedCurrecnyPair={selectedCurrecnyPair}
                setFormDefaultRate={setFormDefaultRate}
                focusOnInput={focusOnRateInput}
              />
            </div>
            <div className={`h-72 bg-${theme} rounded-l-3xl col-span-11`}>
              <ListOtherExchanges
                selectedCurrecnyPair={selectedCurrecnyPair}
                rateIsReversed={rateIsReversed}
              />
            </div>
            <div
              className={`h-72 bg-${theme} row-span-3 col-span-11 rounded-l-3xl`}
            >
              <ListPendingExchange
                pendingExchanges={pendingExchanges}
                refreshPendingExchange={refreshPendingExchange}
              />
            </div>
          </div>
        </div>
      </>
    );
  }
}
