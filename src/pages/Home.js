import React, { useEffect, useRef, useState } from "react";
import { useThemeState } from "../Providers/ThemeProvider";
import { useDirectionState } from "../Providers/DirectionProvider";
import Exchanging from "../components/pages/layout/Home/Exchanging";
import TableExchange from "../components/pages/layout/Home/TableExchange";
import PendingExchange from "../components/pages/layout/Home/PendingExchange";
import OtherExcahnges from "../components/pages/layout/Home/OtherExchanges";
import { useGetPendingExchanges } from "../apis/pages/Home/hooks";
import { useIsLoadingSplashScreenSetState } from "../Providers/IsLoadingSplashScreenProvider";
import { useTokenState } from "../Providers/TokenProvider";
import WatchList from "../components/pages/layout/Home/WatchList";

export default function Home({ isDemo }) {
  const theme = useThemeState();
  const { one: oneDirection } = useDirectionState();
  const setLoading = useIsLoadingSplashScreenSetState();
  const token = useTokenState();

  const rateInputRef = useRef();
  const focusOnInput = () => {
    rateInputRef.current.focus();
  };

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

  return (
    <div className="grid grid-cols-11 grid-rows-6 h-full w-full overflow-y-auto gap-x-10 gap-y-7">
      <div
        className={`bg-${theme} rounded-3xl flex justify-center items-center row-span-3 xl:col-span-3 lg:col-span-4 md:col-span-5`}
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
        className={`bg-${theme} xl:rounded-3xl lg:rounded-l-3xl row-span-3 xl:col-span-5 lg:col-span-7 md:col-span-6 md:rounded-l-3xl`}
      >
        <WatchList
          setSelectedSourceIndex={setSelectedSourceIndex}
          availableTargets={availableTargets}
          setSelectedTargetIndex={setSelectedTargetIndex}
        />
      </div>
      <div
        className={`bg-${theme} lg:rounded-3xl xl:rounded-l-3xl xl:rounded-r-none row-span-3 xl:col-span-3 lg:col-span-3 lg:hidden xl:block`}
      >
        <OtherExcahnges
          selectedCurrecnyPair={selectedCurrecnyPair}
          rateIsReversed={rateIsReversed}
        />
      </div>
      <div
        className={`bg-${theme} lg:rounde xl:rounded-3xl row-span-3 xl:col-span-3 lg:col-span-4 lg:rounded-3xl md:col-span-5 md:rounded-3xl`}
      >
        <PendingExchange
          pendingExchanges={pendingExchanges}
          refreshPendingExchange={refreshPendingExchange}
        />
      </div>
      <div
        className={`bg-${theme} rounded-${oneDirection}-3xl row-span-3 xl:col-span-8 lg:col-span-7 md:col-span-6`}
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
  );
}
