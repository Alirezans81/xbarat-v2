import React from "react";
import { useThemeState } from "../../Providers/ThemeProvider";
import { useAddComma } from "../../hooks/useNumberFunctions";

export default function CustomTable({
  rows,
  heads,
  setFormDefaultRate,
  haverable,
}) {
  const theme = useThemeState();
  const oppositeTheme = theme === "dark" ? "light" : "dark";

  const addComma = useAddComma();

  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex w-full flex-1">
        {heads.map((head, index) => (
          <span
            key={index}
            className="flex-1 text-center font-mine-regular text-gray"
          >
            {head}
          </span>
        ))}
      </div>
      {setFormDefaultRate
        ? rows.map((row, trIndex) => (
            <button
              key={trIndex}
              className={
                haverable
                  ? `flex w-full flex-1 bg-${theme}-back hover:bg-blue my-1 py-1 rounded-full hover-text-blue`
                  : `flex w-full flex-1 bg-${theme}-back my-1 py-1 rounded-full hover-text-blue`
              }
              onClick={() => setFormDefaultRate(+row.rate)}
            >
              {Object.values(row).map((value, tdIndex) => (
                <span
                  key={tdIndex}
                  className={`flex-1 text-center font-mine-regular text-${oppositeTheme} mt-0.5 -mb-0.5`}
                >
                  {addComma(value)}
                </span>
              ))}
            </button>
          ))
        : rows.map((row, trIndex) => (
            <div
              key={trIndex}
              className={`flex w-full flex-1 bg-${theme}-back my-1 py-1 rounded-full`}
            >
              {Object.values(row).map((value, tdIndex) => (
                <span
                  key={tdIndex}
                  className={`flex-1 text-center font-mine-regular text-${oppositeTheme} mt-0.5 -mb-0.5`}
                >
                  {addComma(value)}
                </span>
              ))}
            </div>
          ))}
    </div>
  );
}
