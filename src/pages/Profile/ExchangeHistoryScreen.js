import React, { useState } from "react";
import { useThemeState } from "../../Providers/ThemeProvider";
import { useDirectionState } from "../../Providers/DirectionProvider";
import Filters from "../../components/pages/layout/Reports/pages/ExchangeHistoryScreen/Filters";
import Cards from "../../components/pages/layout/Reports/pages/ExchangeHistoryScreen/Cards";

export default function ExchangeHistoryScreen() {
  const theme = useThemeState();
  const { one: oneDirection } = useDirectionState();

  const [selectionRange, setSelectionRange] = useState();

  return (
    <div className="w-full h-full grid grid-cols-5 gap-10">
      <div className={`col-span-1 bg-${theme} rounded-3xl py-5 px-7`}>
        <Filters
          selectionRange={selectionRange}
          setSelectionRange={setSelectionRange}
        />
      </div>
      <div
        className={`col-span-4 bg-${theme} rounded-${oneDirection}-3xl py-5 px-7 overflow-y-scroll`}
      >
        <Cards />
      </div>
    </div>
  );
}
