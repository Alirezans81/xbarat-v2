import React from "react";
import {
  useAreRatesReversedState,
  useAreRatesReversedSetState,
} from "../../../../../Providers/AreRatesReversedProvider";
import { useThemeState } from "../../../../../Providers/ThemeProvider";
import { useDirectionState } from "../../../../../Providers/DirectionProvider";
import { useAddComma } from "../../../../../hooks/useNumberFunctions";

export default function RateType({
  defaultRateType,
  rate,
  hasReversedRate,
  setFormDefaultRate,
  setRateInputReversedEnabled,
}) {
  const theme = useThemeState();
  const oppositeTheme = theme === "dark" ? "light" : "dark";

  const { one: oneDirection } = useDirectionState();
  const oppositOneDirection = oneDirection === "r" ? "l" : "r";

  const areRatesReversed = useAreRatesReversedState();
  const setAreRatesReversed = useAreRatesReversedSetState();
  const activeButtonClass = "bg-blue-gradient";
  const secondButtonTextClass = hasReversedRate
    ? `text-${oppositeTheme}`
    : "text-gray";

  const reversedRateType = defaultRateType.split("/").reverse().join("/");

  const addComma = useAddComma();

  return (
    <div className="flex flex-col w-full">
      <div className="flex">
        <button onClick={() => setFormDefaultRate(rate)}>
          <span className={`font-mine-thin text-${oppositeTheme} `}>
            {areRatesReversed
              ? rate && (1 / +rate).toFixed(4)
              : rate && (rate < 1000 ? rate : addComma(rate))}
          </span>
          <span className={`font-mine-thin text-blue  m${oneDirection}-1`}>
            {areRatesReversed ? reversedRateType : defaultRateType}
          </span>
        </button>
      </div>
      <div className="flex -mt-1">
        <button
          className={
            !areRatesReversed
              ? `flex-1 bg-${theme}-back pt-2 pb-1 text-xs text-light transition-all font-mine-regular duration-500 rounded-${oneDirection}-full ` +
                activeButtonClass
              : `flex-1 bg-${theme}-back pt-2 pb-1 text-xs text-${oppositeTheme} transition-all font-mine-regular duration-500 rounded-${oneDirection}-full`
          }
          onClick={() => {
            setAreRatesReversed(false);
            setRateInputReversedEnabled(true);
          }}
        >
          {defaultRateType}
        </button>
        <button
          disabled={!hasReversedRate}
          className={
            areRatesReversed
              ? `flex-1 bg-${theme}-back pt-2 pb-1 text-xs text-light transition-all font-mine-regular duration-500 rounded-${oppositOneDirection}-full ` +
                activeButtonClass
              : `flex-1 bg-${theme}-back pt-2 pb-1 text-xs text-${oppositeTheme} transition-all font-mine-regular duration-500 rounded-${oppositOneDirection}-full`
          }
          onClick={() => {
            setAreRatesReversed(true);
            setRateInputReversedEnabled(true);
          }}
        >
          <span className={secondButtonTextClass}>{reversedRateType}</span>
        </button>
      </div>
    </div>
  );
}
