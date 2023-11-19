import React from "react";
import { useThemeState } from "../../../../../Providers/ThemeProvider";
import { useDirectionState } from "../../../../../Providers/DirectionProvider";
import { useAddComma } from "../../../../../hooks/useNumberFunctions";

export default function RateType({
  rate,
  defaultRateType,
  hasReversedRate,
  rateIsReversed,
  setRateIsReversed,
  selectedCurrecnyPair,
  default_rate_type_title,
}) {
  const theme = useThemeState();
  const oppositeTheme = theme === "dark" ? "light" : "dark";

  const { one: oneDirection } = useDirectionState();
  const oppositOneDirection = oneDirection === "r" ? "l" : "r";

  const activeButtonClass = "bg-blue-gradient";
  const secondButtonTextClass = hasReversedRate
    ? `text-${oppositeTheme}`
    : "text-gray";

  const reversedRateType = default_rate_type_title
    .split("/")
    .reverse()
    .join("/");

  const addComma = useAddComma();

  return (
    <div className="flex flex-col w-full">
      <div className="flex">
        <button>
          <span className={`font-mine-thin text-${oppositeTheme} `}>
            {rateIsReversed
              ? rate &&
                ((1 / +rate) * +selectedCurrecnyPair.rate_multiplier).toFixed(
                  selectedCurrecnyPair.floating_number
                )
              : rate && (rate < 1000 ? rate : addComma(rate))}
          </span>
          <span className={`font-mine-thin text-blue  m${oneDirection}-1`}>
            {rateIsReversed ? reversedRateType : default_rate_type_title}
          </span>
        </button>
      </div>
      <div className="flex -mt-1">
        <button
          className={
            !rateIsReversed
              ? `flex-1 bg-${theme}-back pt-2 pb-1 text-xs text-light transition-all font-mine-regular duration-500 rounded-${oneDirection}-full ` +
                activeButtonClass
              : `flex-1 bg-${theme}-back pt-2 pb-1 text-xs text-${oppositeTheme} transition-all font-mine-regular duration-500 rounded-${oneDirection}-full`
          }
          onClick={() => setRateIsReversed(false)}
        >
          {default_rate_type_title}
        </button>
        <button
          disabled={!hasReversedRate}
          className={
            rateIsReversed
              ? `flex-1 bg-${theme}-back pt-2 pb-1 text-xs text-light transition-all font-mine-regular duration-500 rounded-${oppositOneDirection}-full ` +
                activeButtonClass
              : `flex-1 bg-${theme}-back pt-2 pb-1 text-xs text-${oppositeTheme} transition-all font-mine-regular duration-500 rounded-${oppositOneDirection}-full`
          }
          onClick={() => setRateIsReversed(true)}
        >
          <span className={secondButtonTextClass}>{reversedRateType}</span>
        </button>
      </div>
    </div>
  );
}
