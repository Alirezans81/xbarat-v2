import React from "react";
import { useThemeState } from "../../../../Providers/ThemeProvider";
import { useAddComma } from "../../../../hooks/useNumberFunctions";
import { useDirectionState } from "../../../../Providers/DirectionProvider";
import { useFontState } from "../../../../Providers/FontProvider";

export default function ExchangeRateTypeTutorialComponent({ hovered }) {
  const theme = useThemeState();
  const font = useFontState();
  const oppositeTheme = theme === "dark" ? "light" : "dark";

  const { one: oneDirection } = useDirectionState();
  const oppositOneDirection = oneDirection === "r" ? "l" : "r";

  const activeButtonClass = "bg-blue-gradient";
  const secondButtonTextClass = true ? `text-${oppositeTheme}` : "text-gray";
  const rateIsReversed = true;
  const addComma = useAddComma();

  return (
    <div className="flex flex-col w-full">
      <div className="flex">
        <button>
          <span
            className={`font-${font}-thin text-${oppositeTheme} transition-all duration-500 text-${
              hovered === "Average Rate" ? "xl" : "base"
            }`}
          >
            {addComma(1.6)}
          </span>
          <span
            className={`font-${font}-thin text-blue  m${oneDirection}-1 transition-all duration-500 text-${
              hovered === "Average Rate" ? "xl" : "base"
            }`}
          >
            IRR/AFN
          </span>
        </button>
      </div>
      <div className="flex -mt-1">
        <button
          className={
            !rateIsReversed
              ? `flex-1 bg-${theme}-back pt-2 pb-1 px-2 text-${
                  hovered === "Toggle" ? "base" : "xs"
                } text-center-important text-light transition-all font-${font}-regular duration-500 rounded-${oneDirection}-full ` +
                activeButtonClass
              : `flex-1 bg-${theme}-back pt-2 pb-1 px-2 text-${
                  hovered === "Toggle" ? "base" : "xs"
                } text-center-important text-${oppositeTheme} transition-all font-${font}-regular duration-500 rounded-${oneDirection}-full`
          }
        >
          IRR/AFN
        </button>
        <button
          className={
            rateIsReversed
              ? `flex-1 bg-${theme}-back pt-2 pb-1 px-2 text-${
                  hovered === "Toggle" ? "base" : "xs"
                } text-center-important text-light transition-all font-${font}-regular duration-500 rounded-${oppositOneDirection}-full ` +
                activeButtonClass
              : `flex-1 bg-${theme}-back pt-2 pb-1 px-2 text-${
                  hovered === "Toggle" ? "base" : "xs"
                } text-center-important text-${oppositeTheme} transition-all font-${font}-regular duration-500 rounded-${oppositOneDirection}-full`
          }
        >
          <span className={secondButtonTextClass}>AFN/IRR</span>
        </button>
      </div>
    </div>
  );
}
