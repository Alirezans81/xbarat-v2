import React from "react";
import { useThemeState } from "../Providers/ThemeProvider";
import { useDirectionState } from "../Providers/DirectionProvider";
import QuickDeposit from "../components/pages/layout/Wallet/QuickDeposit";
import LastDeposit from "../components/pages/layout/Wallet/LastDeposit";
import Balance from "../components/pages/layout/Wallet/Balance";
import PendingRequests from "../components/pages/layout/Wallet/PendingRequests";

export default function Wallet() {
  const theme = useThemeState();
  const { one: oneDirection } = useDirectionState();

  return (
    <div className="h-full w-full grid grid-cols-12 grid-rows-6 gap-x-10 gap-y-7">
      <div
        className={`col-span-3 row-span-3 flex flex-col gap-y-4 bg-${theme} p-5 rounded-3xl`}
      >
        <div className={`flex-1`}>
          <QuickDeposit />
        </div>
        <div className={`flex-1`}>
          <LastDeposit />
        </div>
      </div>
      <div
        className={`col-span-9 row-span-3 bg-${theme} p-5 rounded-${oneDirection}-3xl`}
      >
        <Balance />
      </div>
      <div
        className={`col-span-12 row-span-3 bg-${theme} p-5 rounded-${oneDirection}-3xl`}
      >
        <PendingRequests />
      </div>
    </div>
  );
}
