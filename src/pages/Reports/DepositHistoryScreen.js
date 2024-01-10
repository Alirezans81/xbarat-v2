import React, { useState } from "react";
import { useThemeState } from "../../Providers/ThemeProvider";
import { useDirectionState } from "../../Providers/DirectionProvider";
import Filters from "../../components/pages/layout/Reports/pages/DepositHistoryScreen/Filters";
import Cards from "../../components/pages/layout/Reports/pages/DepositHistoryScreen/Cards";

export default function DepositHistoryScreen() {
  const theme = useThemeState();
  const { one: oneDirection } = useDirectionState();

  const [selectionRange, setSelectionRange] = useState();

  return (
    <div className="w-full h-full grid grid-cols-5 grid-rows-1 gap-10">
      <div
        className={`col-span-1 row-span-1 bg-${theme} rounded-3xl py-5 px-7`}
      >
        <Filters
          selectionRange={selectionRange}
          setSelectionRange={setSelectionRange}
        />
      </div>

      <div
        className={`col-span-4 row-span-1 bg-${theme} rounded-${oneDirection}-3xl py-5 pl-7 pr-4 `}
      >
        <div className="overflow-y-auto h-full pr-3">
          <Cards />
        </div>
      </div>
    </div>
  );
}
