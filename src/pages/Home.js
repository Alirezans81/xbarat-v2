import React, { useState } from "react";
import { useThemeState } from "../Providers/ThemeProvider";
import { useDirectionState } from "../Providers/DirectionProvider";
import Exchanging from "../components/pages/layout/Home/Exchanging";
import AllOreders from "../components/pages/layout/Home/AllOreders";
import PendingOrders from "../components/pages/layout/Home/PendingOrders";
import OtherExcahnges from "../components/pages/layout/Home/OtherExcahnges";

export default function Home() {
  const theme = useThemeState();
  const { one: oneDirection } = useDirectionState();

  const [selectedCurrecnyPair, setSelectedCurrencnyPair] = useState();
  const [formDefaultRate, setFormDefaultRate] = useState();
  const [rateIsReversed, setRateIsReversed] = useState(false);

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
        />
      </div>
      <div className={`bg-${theme} rounded-3xl col-span-5 row-span-3`}></div>
      <div
        className={`bg-${theme} rounded-${oneDirection}-3xl col-span-4 row-span-3`}
      >
        <OtherExcahnges rateIsReversed={rateIsReversed} />
      </div>
      <div className={`bg-${theme} rounded-3xl col-span-3 row-span-3`}>
        <PendingOrders selectedCurrecnyPair={selectedCurrecnyPair} />
      </div>
      <div
        className={`bg-${theme} rounded-${oneDirection}-3xl col-span-8 xl:col-span-9 row-span-3 pr-24`}
      >
        <AllOreders
          selectedCurrecnyPair={selectedCurrecnyPair}
          setFormDefaultRate={setFormDefaultRate}
        />
      </div>
    </div>
  );
}
