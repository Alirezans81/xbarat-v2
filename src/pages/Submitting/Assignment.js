import React from "react";
import { useThemeState } from "../../Providers/ThemeProvider";
import { useDirectionState } from "../../Providers/DirectionProvider";
import Filters from "../../components/pages/layout/Submitting/Accounting/Filters";
import Tables from "../../components/pages/layout/Submitting/Accounting/Tables";

export default function Assignment() {
  const theme = useThemeState();
  const oppostieTheme = theme === "dark" ? "light" : "dark";
  const { one: oneDirection } = useDirectionState();

  return (
    <div className="w-full h-full grid grid-rows-5 grid-cols-12 gap-x-10 gap-y-7">
      <div
        className={`row-span-2 col-span-12 bg-${theme} rounded-${oneDirection}-3xl p-5`}
      >
        <Filters />
      </div>
      <div
        className={`row-span-3 col-span-12 bg-${theme} rounded-${oneDirection}-3xl p-5`}
      >
        <Tables />
      </div>
    </div>
  );
}
