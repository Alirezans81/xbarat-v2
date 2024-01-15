import React, { useEffect, useRef, useState } from "react";
import { useThemeState } from "../Providers/ThemeProvider";
import { useDirectionState } from "../Providers/DirectionProvider";
import Exchanging from "../components/pages/layout/Home/Exchanging";
import TableExchange from "../components/pages/layout/Home/TableExchange";
import PendingExchange from "../components/pages/layout/Home/PendingExchange";
import OtherExchanges from "../components/pages/layout/Home/OtherExchanges";
import { useGetPendingExchanges } from "../apis/pages/Home/hooks";
import { useIsLoadingSplashScreenSetState } from "../Providers/IsLoadingSplashScreenProvider";
import { useTokenState } from "../Providers/TokenProvider";
import WatchList from "../components/pages/layout/Home/WatchList";
import { useLanguageState } from "../Providers/LanguageProvider";
import { useFontState } from "../Providers/FontProvider";
import { useCurrenciesState } from "../Providers/CurrenciesProvider";
import ListWatchList from "../components/pages/layout/Home/ListMode/ListWatchList";
import ListOtherExchanges from "../components/pages/layout/Home/ListMode/ListOtherExchanges";
import ListPendingExchange from "../components/pages/layout/Home/ListMode/ListPendingExchange";

export default function Home({ isDemo }) {
  const theme = useThemeState();
  const oppositeTheme = theme === "dark" ? "light" : "dark";
  const lang = useLanguageState();
  const font = useFontState();
  const { one: oneDirection } = useDirectionState();
  const setLoading = useIsLoadingSplashScreenSetState();
  const token = useTokenState();

  const rateInputRef = useRef();
  const focusOnInput = () => {
    rateInputRef.current.focus();
  };

  const [pageMode, setPageMode] = useState("list");
  const canSwitchPageModeWidth = 1280;
  useEffect(() => {
    const result = window.localStorage.getItem("homePageMode");
    if (result) setPageMode(result);
  });

  const [selectedCurrecnyPair, setSelectedCurrencnyPair] = useState();
  const [formDefaultRate, setFormDefaultRate] = useState();
  const [rateIsReversed, setRateIsReversed] = useState(true);

  const [selectedSourceIndex, setSelectedSourceIndex] = useState(-1);
  const [availableTargets, setAvailableTargets] = useState([]);
  const [selectedTargetIndex, setSelectedTargetIndex] = useState(-1);

  const [pendingExchanges, setPendingExchanges] = useState([]);
  const { getPendingExchanges, isLoading: getPendingExchangesIsLoading } =
    useGetPendingExchanges();
  useEffect(
    () => setLoading(getPendingExchangesIsLoading),
    [getPendingExchangesIsLoading]
  );
  const refreshPendingExchange = () => {
    getPendingExchanges(token, setPendingExchanges);
  };
  useEffect(() => refreshPendingExchange(), []);

  if (pageMode === "card" || window.innerWidth <= canSwitchPageModeWidth) {
    return (
      <>
        {window.innerWidth >= canSwitchPageModeWidth && (
          <div className={`fixed left-4 ${isDemo ? 'bottom-32' : 'bottom-60'}`}>
            <button
              onClick={() => {
                window.localStorage.setItem("homePageMode", "list");
                setPageMode("list");
              }}
              className="flex gap-x-2 items-center bg-blue rounded-full p-2.5"
            >
              <img
                className="w-5 h-5"
                src={require(`../Images/pages/layout/Home/list-mode.png`)}
              />
            </button>
          </div>
        )}
        <div className="absolute flex flex-col w-full h-full overflow-y-auto px-8 md:p-0">
          <div
            className={`w-full bg-${theme} shadow-${theme} rounded-2xl flex justify-center md:hidden pt-5 pb-2.5 px-5 mt-2`}
          >
            <span
              className={`text-2xl md:hidden text-${oppositeTheme} font-${font}-bold`}
            >
              {lang["home"]}
            </span>
          </div>
          <div className="mt-5 md:mt-0 grid grid-cols-11 grid-rows-6 md:gap-x-10 gap-y-7 pb-16">
            <div
              className={`order-2 md:order-1 h-72 bg-${theme} rounded-3xl flex justify-center items-center row-span-3 xl:col-span-3 lg:col-span-4 md:col-span-5 col-span-12`}
            >
              <Exchanging
                selectedCurrecnyPair={selectedCurrecnyPair}
                setSelectedCurrencnyPair={setSelectedCurrencnyPair}
                formDefaultRate={formDefaultRate}
                rateIsReversed={rateIsReversed}
                setRateIsReversed={setRateIsReversed}
                refreshPendingExchange={refreshPendingExchange}
                setFormDefaultRate={setFormDefaultRate}
                selectedSourceIndex={selectedSourceIndex}
                setSelectedSourceIndex={setSelectedSourceIndex}
                availableTargets={availableTargets}
                selectedTargetIndex={selectedTargetIndex}
                setAvailableTargets={setAvailableTargets}
                setSelectedTargetIndex={setSelectedTargetIndex}
                rateInputRef={rateInputRef}
                focusOnInput={focusOnInput}
                isDemo={isDemo}
              />
            </div>
            <div
              className={`order-1 md:order-2 h-72 bg-${theme} xl:rounded-3xl lg:rounded-l-3xl row-span-3 xl:col-span-5 lg:col-span-7 md:rounded-r-none md:col-span-6 md:rounded-l-3xl col-span-12 rounded-3xl`}
            >
              <WatchList
                selectedSourceIndex={selectedSourceIndex}
                setSelectedSourceIndex={setSelectedSourceIndex}
                availableTargets={availableTargets}
                setSelectedTargetIndex={setSelectedTargetIndex}
              />
            </div>
            <div
              className={`order-4 md:order-3 h-72 bg-${theme} lg:rounded-3xl xl:rounded-l-3xl xl:rounded-r-none row-span-3 xl:col-span-3 lg:col-span-5 md:col-span-5 md:rounded-3xl col-span-12 rounded-3xl`}
            >
              <OtherExchanges
                selectedCurrecnyPair={selectedCurrecnyPair}
                rateIsReversed={rateIsReversed}
              />
            </div>
            <div
              className={`order-5 md:order-4 h-72 bg-${theme} lg:rounde xl:rounded-3xl row-span-3 xl:col-span-3 lg:col-span-6 lg:rounded-r-none md:col-span-6 md:rounded-r-none col-span-12 rounded-3xl`}
            >
              <PendingExchange
                pendingExchanges={pendingExchanges}
                refreshPendingExchange={refreshPendingExchange}
              />
            </div>
            <div
              className={`order-3 md:order-5 min-h-72 md:h-72 mt-2 pb-2 md:pb-0 md:mt-0 bg-${theme} rounded-${oneDirection}-3xl row-span-3 xl:col-span-8 lg:col-span-11 md:col-span-11 col-span-12 rounded-3xl`}
            >
              <TableExchange
                selectedSourceIndex={selectedSourceIndex}
                availableTargets={availableTargets}
                selectedTargetIndex={selectedTargetIndex}
                selectedCurrecnyPair={selectedCurrecnyPair}
                setFormDefaultRate={setFormDefaultRate}
                focusOnInput={focusOnInput}
              />
            </div>
          </div>
        </div>
      </>
    );
  } else if (pageMode === "list") {
    return (
      <>
        {window.innerWidth >= canSwitchPageModeWidth && (
          <div className={`fixed left-4 ${isDemo ? 'bottom-32' : 'bottom-60'}`}>
            <button
              onClick={() => {
                window.localStorage.setItem("homePageMode", "card");
                setPageMode("card");
              }}
              className="flex gap-x-2 items-center bg-blue rounded-full p-2.5"
            >
              <img
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
                selectedSourceIndex={selectedSourceIndex}
                setSelectedSourceIndex={setSelectedSourceIndex}
                availableTargets={availableTargets}
                setSelectedTargetIndex={setSelectedTargetIndex}
              />
            </div>
            <div
              className={`h-72 bg-${theme} rounded-3xl flex justify-center items-center row-span-3 col-span-3`}
            >
              <Exchanging
                selectedCurrecnyPair={selectedCurrecnyPair}
                setSelectedCurrencnyPair={setSelectedCurrencnyPair}
                formDefaultRate={formDefaultRate}
                rateIsReversed={rateIsReversed}
                setRateIsReversed={setRateIsReversed}
                refreshPendingExchange={refreshPendingExchange}
                setFormDefaultRate={setFormDefaultRate}
                selectedSourceIndex={selectedSourceIndex}
                setSelectedSourceIndex={setSelectedSourceIndex}
                availableTargets={availableTargets}
                selectedTargetIndex={selectedTargetIndex}
                setAvailableTargets={setAvailableTargets}
                setSelectedTargetIndex={setSelectedTargetIndex}
                rateInputRef={rateInputRef}
                focusOnInput={focusOnInput}
                isDemo={isDemo}
              />
            </div>
            <div
              className={`h-72 pb-0 mt-0 bg-${theme} rounded-${oneDirection}-3xl row-span-3 col-span-8 `}
            >
              <TableExchange
                selectedSourceIndex={selectedSourceIndex}
                availableTargets={availableTargets}
                selectedTargetIndex={selectedTargetIndex}
                selectedCurrecnyPair={selectedCurrecnyPair}
                setFormDefaultRate={setFormDefaultRate}
                focusOnInput={focusOnInput}
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
