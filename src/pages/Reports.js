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
    <div className="w-full h-full grid grid-cols-12 grid-rows-2 gap-x-10 gap-y-7">
      <div
        className={`col-span-4 row-span-1 bg-${theme} rounded-3xl py-5 px-7`}
      >
        <ExchangeHistory />
      </div>
      <div
        className={`col-span-8 row-span-1 bg-${theme} rounded-${oneDirection}-3xl py-5 px-7`}
      >
        <DepositHistory />
      </div>
      <div
        className={`col-span-8 row-span-1 bg-${theme} rounded-3xl py-5 px-7`}
      >
        <WithdrawalHistory />
      </div>
      <div
        className={`col-span-4 row-span-1 bg-${theme} rounded-${oneDirection}-3xl py-5 px-7`}
      >
        <TransferHistory />
      </div>
    </div>
  );
}
