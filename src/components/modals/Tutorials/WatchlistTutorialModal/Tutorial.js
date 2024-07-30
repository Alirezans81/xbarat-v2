import React from "react";
import { useState } from "react";
import { useFontState } from "../../../../Providers/FontProvider";
import { useThemeState } from "../../../../Providers/ThemeProvider";
const Tutorial = () => {
  const theme = useThemeState();
  const oppositeTheme = theme === "dark" ? "light" : "dark";
  const font = useFontState();
  const row = {
    title: "IRR/AFN",
    rate: 1.6,
    max_rate: 1.8,
    min_rate: 1.3,
  };
  const heads = ["Currency Pair", "Rate", "Low", "High"];
  const [hovered, setHovered] = useState(-1);
  return (
    <div className="w-fit h-fit flex flex-col justify-center items-center gap-y-3 py-3 px-5">
      <ul
        className={`w-full h-fit flex justify-start items-start gap-y-1 flex-col text-${oppositeTheme} pl-1 py-1 transition-all duration-500`}
      >
        <li
          className={`${
            hovered === 0
              ? "bg-blue rounded-2xl transition-all duration-500 w-fit p-2"
              : "bg-none p-2"
          }`}
          onMouseEnter={() => setHovered(0)}
          onMouseLeave={() => setHovered(-1)}
          onClick={() => setHovered(0)}
        >
          Currency Pair: The Pair Of Two Currencies Described In the Row in The
          List
        </li>
        <li
          className={`${
            hovered === 1
              ? "bg-blue rounded-2xl transition-all duration-500 p-2"
              : "bg-none p-2"
          }`}
          onMouseEnter={() => setHovered(1)}
          onClick={() => setHovered(1)}
          onMouseLeave={() => setHovered(-1)}
        >
          Rate: The Standard Rate That Is Being Matched With This Currency Pair
        </li>
        <li
          className={`${
            hovered === 2
              ? "bg-blue rounded-2xl transition-all duration-500 p-2"
              : "bg-none p-2"
          }`}
          onMouseEnter={() => setHovered(2)}
          onMouseLeave={() => setHovered(-1)}
          onClick={() => setHovered(2)}
        >
          Low: The Lowest Matched Price With This Currency Pair
        </li>
        <li
          className={`${
            hovered === 3
              ? "bg-blue rounded-2xl transition-all duration-500 p-2"
              : "bg-none p-2"
          }`}
          onMouseEnter={() => setHovered(3)}
          onClick={() => setHovered(3)}
          onMouseLeave={() => setHovered(-1)}
        >
          High: The Highest Matched Price With This Currency Pair
        </li>
      </ul>
      <div className={`grid grid-cols-4 gap-x-4 w-full items-center pb-1 pt-5`}>
        {heads.map((head, index) => (
          <span
            key={index}
            className={`col-span-1 text-center-important text-sm md:text-base font-${font}-regular text-gray`}
          >
            {head}
          </span>
        ))}
      </div>
      <div
        className={`grid grid-cols-4 gap-x-4 w-full bg-${theme}-back items-center rounded-full hover-text-blue px-5 py-2 `}
      >
        {Object.values(row).map((value, tdIndex) => (
          <span
            key={tdIndex}
            className={`flex whitespace-nowrap ${
              hovered === tdIndex
                ? "px-2 text-2xl"
                : "text-sm md:text-base lg:text-xl px-2"
            } justify-center col-span-1 text-center-important font-${font}-regular text-${oppositeTheme}`}
          >
            {value}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Tutorial;
