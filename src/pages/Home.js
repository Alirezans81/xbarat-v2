import React, { useEffect, useState } from "react";
import { useThemeState } from "../Providers/ThemeProvider";
import { useDirectionState } from "../Providers/DirectionProvider";
import Exchanging from "../components/pages/layout/Home/Exchanging";
import TableExchange from "../components/pages/layout/Home/TableExchange";
import PendingExchange from "../components/pages/layout/Home/PendingExchange";
import OtherExcahnges from "../components/pages/layout/Home/OtherExchanges";
import { useGetPendingExchanges } from "../apis/pages/Home/hooks";
import { useIsLoadingSplashScreenSetState } from "../Providers/IsLoadingSplashScreenProvider";
import { useTokenState } from "../Providers/TokenProvider";

export default function Home() {
  const theme = useThemeState();
  const { one: oneDirection } = useDirectionState();
  const setLoading = useIsLoadingSplashScreenSetState();
  const token = useTokenState();

  const [selectedCurrecnyPair, setSelectedCurrencnyPair] = useState();
  const [formDefaultRate, setFormDefaultRate] = useState();
  const [rateIsReversed, setRateIsReversed] = useState(true);

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
    <div className="grid grid-cols-12 grid-rows-6 fixed h-full w-full pb-40 gap-x-10 gap-y-7">
      <div
        className={`bg-${theme} rounded-3xl flex justify-center items-center col-span-4 xl:col-span-3 row-span-3`}
      >
        <Exchanging
          selectedCurrecnyPair={selectedCurrecnyPair}
          setSelectedCurrencnyPair={setSelectedCurrencnyPair}
          formDefaultRate={formDefaultRate}
          rateIsReversed={rateIsReversed}
          setRateIsReversed={setRateIsReversed}
          refreshPendingExchange={refreshPendingExchange}
        />
      </div>
      <div className={`bg-${theme} rounded-3xl col-span-5 row-span-3`}></div>
      <div
        className={`bg-${theme} rounded-${oneDirection}-3xl col-span-4 row-span-3`}
      >
        <OtherExcahnges rateIsReversed={rateIsReversed} />
      </div>
      <div className={`bg-${theme} rounded-3xl col-span-3 row-span-3`}>
        <PendingExchange
          pendingExchanges={pendingExchanges}
          refreshPendingExchange={refreshPendingExchange}
        />
      </div>
      <div
        className={`bg-${theme} rounded-${oneDirection}-3xl col-span-8 xl:col-span-9 row-span-3 pr-24`}
      >
        <TableExchange
          selectedCurrecnyPair={selectedCurrecnyPair}
          setFormDefaultRate={setFormDefaultRate}
        />
      </div>
    </div>
  );
}
