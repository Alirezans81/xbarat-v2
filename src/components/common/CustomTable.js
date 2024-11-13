import React from "react";
import { useThemeState } from "../../Providers/ThemeProvider";
import { useFontState } from "../../Providers/FontProvider";

export default function CustomTable({
  rows,
  heads,
  selectRow,
  haverable,
  maxheight,
}) {
  const theme = useThemeState();
  const font = useFontState();
  const oppositeTheme = theme === "dark" ? "light" : "dark";

  const colsQuantity = heads.length;

  return (
    <div className="flex-1 w-full flex flex-col overflow-hidden">
      <div
        className={`grid grid-cols-${colsQuantity} gap-x-4 w-full items-center px-4 md:px-0`}
      >
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
        className={`w-full h-full overflow-scroll flex flex-col max-h-[${maxheight}dvh]`}
      >
        {selectRow
          ? rows.map((row, trIndex) => (
              <button
                key={trIndex}
                className={
                  haverable
                    ? `grid grid-cols-${colsQuantity} gap-x-4 w-full bg-${theme}-back items-center hover:bg-blue my-1 py-1 rounded-full hover-text-blue px-4 md:px-0`
                    : `grid grid-cols-${colsQuantity} gap-x-4 w-full bg-${theme}-back items-center my-1 py-1 rounded-full hover-text-blue px-4 md:px-0`
                }
                onClick={() => selectRow(row, trIndex)}
              >
                {Object.values(row).map((value, tdIndex) => (
                  <span
                    key={tdIndex}
                    className={`flex whitespace-nowrap text-sm md:text-base justify-center col-span-1 text-center-important font-${font}-regular text-${oppositeTheme} mt-0.5 -mb-0.5 `}
                  >
                    {value}
                  </span>
                ))}
              </button>
            ))
          : rows.map((row, trIndex) => (
              <div
                key={trIndex}
                className={`grid grid-cols-${colsQuantity} gap-x-4 w-full bg-${theme}-back items-center my-1 py-1 rounded-full px-4 md:px-0`}
              >
                {row &&
                  Object.values(row).map((value, tdIndex) => (
                    <span
                      key={tdIndex}
                      className={`flex whitespace-nowrap justify-center col-span-1 text-center-important font-${font}-regular text-${oppositeTheme} mt-0.5 -mb-0.5`}
                    >
                      {value}
                    </span>
                  ))}
              </div>
            ))}
      </div>
    </div>
  );
}
