import React from "react";
import { useThemeState } from "../Providers/ThemeProvider";
import { useDirectionState } from "../Providers/DirectionProvider";
import ExchangeHistory from "../components/pages/layout/Reports/ExchangeHistory";
import DepositHistory from "../components/pages/layout/Reports/DepositHistory";
import WithdrawalHistory from "../components/pages/layout/Reports/WithdrawalHistory";
import TransferHistory from "../components/pages/layout/Reports/TransferHistory";

export default function Reports() {
  const theme = useThemeState();
  const { one: oneDirection } = useDirectionState();

  return (
    <div className="absolute w-full h-full overflow-y-auto pl-8 pr-8 md:pl-0 md:pr-6">
      <div className="md:mt-0 grid grid-cols-12 grid-rows-2 md:gap-x-10 gap-y-7 pb-36 md:pb-16">
        <div
          className={`col-span-12 xl:col-span-4 row-span-1 bg-${theme} rounded-3xl md:rounded-r-none xl:rounded-3xl py-5 px-7`}
        >
          <ExchangeHistory />
        </div>
        <div
          className={`col-span-12 xl:col-span-8 row-span-1 bg-${theme} rounded-3xl md:rounded-r-none py-5 px-7`}
        >
          <DepositHistory />
        </div>
        <div
          className={`col-span-12 xl:col-span-8 row-span-1 bg-${theme} rounded-3xl md:rounded-r-none xl:rounded-3xl py-5 px-7`}
        >
          <WithdrawalHistory />
        </div>
        <div
          className={`col-span-12 xl:col-span-4 row-span-1 bg-${theme} rounded-3xl md:rounded-r-none py-5 px-7`}
        >
          <TransferHistory />
        </div>
      </div>
    </div>
  );
}
